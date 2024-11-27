import axios from "axios";
import dotenv from 'dotenv'
import { drivers } from "../data/drivers";
import { prisma } from "../libs/prisma";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

type locations = {
    latitude: number,
    longitude: number
}

export const getCoordinates = async (address: string): Promise<locations | null> => {
    const formattedAddress = address.split(' ').join('+')

    try{
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${process.env.GOOGLE_API_KEY}`, {
            params: {
              address,
              key: process.env.GOOGLE_API_KEY
            },
          });

        
        const data = response.data
        const location = data.results[0].geometry.location
        return { latitude: location.lat, longitude: location.lng}
    } catch(error){
        console.error('erro ao consultar API: ', error)
        return null
    }
}

export const getDrivers = async (distance: number) => {
    const availableDrivers = await prisma.driver.findMany({
        where: {
            minKm: {
                lte: distance / 1000
            }
        },
        include: {
            review: {
                select: {
                    comment: true,
                    rating: true
                }
            }
        }
    })

    return availableDrivers
}

