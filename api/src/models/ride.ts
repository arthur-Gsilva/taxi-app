import axios from 'axios'
import dotenv from 'dotenv'
import { ride } from '../types/Ride'
import { prisma } from '../libs/prisma'
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

export const rideEstimate = async (origin: string, destination: string, customer_id: string) => {
    try{
        const response = await axios.post('https://routes.googleapis.com/directions/v2:computeRoutes', {
            origin: {address: origin},
            destination: {address: destination},
            travelMode: "DRIVE"
        }, {
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
                "X-Goog-FieldMask": "routes.duration,routes.distanceMeters"
            }
        })
    
        return response.data
    }catch(error){
        console.log('erro ao pegar api do google')
    }
}

export const rideConfirm = async (data: ride) => {

    const driverExists = await prisma.driver.findUnique({
        where: { id: Number(data.driver.id) },
    });

    if (!driverExists) {
        throw new Error("Motorista não encontrado.");
    }

    try{
        const ride = await prisma.ride.create({
            data:{
                customer_id: data.customer_id,
                origin: data.origin,
                destination: data.destination,
                distance: Number(data.distance),
                duration: data.duration,
                value: Number(data.value),
                driver: {
                    connect: {
                        id: Number(data.driver.id)
                    }
                }
            }
        })
        return ride
    } catch(error){
        console.log('erro na requisição', error)
    }
}

export const getRide = async (id: number, driverID?: number) => {
    const ride = await prisma.ride.findMany({
        where: {
            customer_id: id,
            driverId: driverID
        },
        include: {
            driver: {
              select: {
                id: true,
                name: true,
              },
            },
          },
    })

    
    return ride
}