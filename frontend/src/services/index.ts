import { Coordinates } from "@/types/ride"
import axios from "axios"


export const getAddress = async (geoCode: Coordinates) => {
    const geoCodeString = `${geoCode.latitude},${geoCode.longitude}`
    const address = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${geoCodeString}&key=${process.env.API_KEY}`)
    return address.data.results[0].formatted_address
}

export const getMinutes = (seconds: string) => {
    const secondsNumber = parseInt(seconds.slice(0, -1))
    const minutes = secondsNumber / 60
    return minutes
}

export const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
        throw new Error("Data inválida fornecida");
    }

    return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'medium',
    }).format(date);
}

export const formatPrices = (price: number | undefined) => {
    return price?.toLocaleString('pt-br', {
        minimumFractionDigits: 2,
        style: 'currency',
        currency:'BRL'
    })
}