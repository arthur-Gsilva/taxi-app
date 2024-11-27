import { RequestHandler } from "express";
import { getRide, rideConfirm, rideEstimate } from "../models/ride";
import { getCoordinates, getDrivers } from "../utils";
import { prisma } from "../libs/prisma";


export const rideEstimateController: RequestHandler = async (req, res): Promise<void> => {
    const {origin, destination, customer_id} = req.body
    const originCoordinates = await getCoordinates(origin)
    const destinationCoordinates = await getCoordinates(destination)

    if(origin === '' || destination === '' || customer_id === ''){
        res.status(400).json({error: "todos os campos devem ser preenchidos!!!"})
        return
    }
    if(origin === destination){
        res.status(400).json({error: "Seu endereço de origem e de destino são os mesmos, por favor confirme corretamente!"})
        return
    }
    try {
        const result = await rideEstimate(origin, destination, customer_id);
        const { distanceMeters, duration } = result.routes[0]
        const options = await getDrivers(distanceMeters)

        res.status(200).json({ 
            origin: originCoordinates, 
            destination: destinationCoordinates, 
            distance: distanceMeters, 
            duration, 
            options: options.map(option=> ({
                ...option,
                value: (option.value / 1000) * distanceMeters
            }))
        });
      } catch (error) {
        console.error("Erro ao calcular a rota:", error);
        res.status(500).json({ error: "Erro interno ao calcular a rota." });
      }
}


export const rideConfirmController: RequestHandler = async (req, res) => {
    const { customer_id, origin, destination, driver, distance } = req.body

    if(origin === '' || destination === '' || customer_id === ''){
        res.status(400).json({error: "todos os campos devem ser preenchidos!!!"})
        return
    }

    if(driver.id){
        const driverID = await prisma.driver.findUnique({
            where: {
                id: Number(driver.id)
            }
        })
        if(!driverID){
            res.status(404).json({msg: "Motorista não encontrado"})
        }
        if(driverID?.minKm as number > (distance / 1000) ){
            res.status(406).json({msg: "Distância inválida"})
        }
    } else { res.status(400).json({ msg: "ID do motorista deve ser enviado" }) }
    
    const result = await rideConfirm(req.body)

    res.status(200).json({ success: true })
}

export const getRideController: RequestHandler =  async (req, res) => {
    const { customer_id, driverId } = req.params

    if(!customer_id){
        res.status(404).json({erro: "Usuário inválido"})
        return
    }

    if(driverId){
        const driver = prisma.driver.findUnique({
            where: {
                id: Number(driverId)
            }
        })

        if(!driver){
            res.status(400).json({msg: "Motorista inválido"})
            return
        } else{
            const rides = await getRide(Number(customer_id), Number(driverId))
            if(!rides){
                res.status(404).json({msg: "Nenhum registro encontrado"})
            }
            res.status(200).json({ rides })
        }
    } else{
        const rides = await getRide(Number(customer_id))
        if(!rides){
            res.status(404).json({msg: "Nenhum registro encontrado"})
        }
        res.status(200).json({ rides })
    }
}