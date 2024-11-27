import { RideContext } from "@/contexts/RideContext"
import { StarReview } from "./StarReview"
import { useContext } from "react"
import { Button } from "./ui/button"
import { Step } from "@/types/step"
import axios from "axios"
import { formatPrices, getAddress } from "@/services"
import { Coordinates, Driver } from "@/types/ride"
import { useToast } from "@/hooks/use-toast"

type Props = {
    data: Driver,
    setStep: (a: Step) => void
}

export const DriverItem = ({ data, setStep }: Props) => {

    const { toast } = useToast()

    const ride = useContext(RideContext)

    const handleConfirm = async () => {
        
        ride?.setDriverId(data.id)

        await axios.patch('http://localhost:8080/ride/confirm', {
            customer_id: parseInt(ride?.userId as string),
            origin: await getAddress(ride?.rideData.origin as Coordinates) ,
            destination: await getAddress(ride?.rideData.destination as Coordinates) ,
            distance: ride?.rideData.distance,
            duration: ride?.rideData.duration,
            driver: {
                id: data.id
            },
            value: data.value
        })

        toast({
            title: "Corrida iniciada!",
            description: `${data.name} está a caminho`
        })

       setStep('FINISH')
    }

    return(
        <div className="flex flex-col gap-4 border border-gray-300 p-2 rounded-xl ">
            <div className="flex flex-col items-center gap-4 md:flex-row">
                <img src={data.image} alt={data.name} className="h-[100px] w-auto"/>
                <div>
                    <h4 className="font-bold">{data.name}</h4>
                    <p className="text-sm">{data.description}</p>
                    <p>Veículo: <span className="font-bold text-sm">{data.vehicle}</span></p>
                </div>
            </div>
            <div>
                <StarReview rating={data?.review.rating}/>
                <p className="text-sm mt-2">{data.review.comment}</p>
            </div>
            <div className="flex flex-col items-center justify-between mt-4 md:flex-row">
                <div>
                    Valor da corrida: <span>{formatPrices(data.value)}</span>
                </div>

                <Button onClick={handleConfirm}>Escolher</Button>
            </div>
        </div>
    )
}