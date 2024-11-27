import { Card } from "@/components/ui/card"
import { RideContext } from "@/contexts/RideContext"
import { useContext } from "react"
import { DriverItem } from "./DriverItem"
import { Step } from "@/types/step"

type Props = {
    setStep: (a: Step) => void
}

export const Confirm = ({ setStep }: Props) => {

    const ride = useContext(RideContext)
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&markers=color:red|label:A|${ride?.rideData.origin.latitude},${ride?.rideData.origin.longitude}&markers=color:blue|label:B|${ride?.rideData.destination.latitude},${ride?.rideData.destination.longitude}&path=color:0x0000ff|weight:5|${ride?.rideData.origin.latitude},${ride?.rideData.origin.longitude}|${ride?.rideData.destination.latitude},${ride?.rideData.destination.longitude}&key=${process.env.API_KEY}`;

    return(
        <Card className="w-4/5 mx-auto px-5">
            <h2 className="text-center text-xl font-bold mb-8 mt-4">Confirme aqui sua viagem!</h2>
            <div className="flex flex-col items-center gap-6 pb-5 md:flex-row">
                <div className="max-h-[520px] overflow-y-scroll">
                    <div className="flex justify-between flex-col h-full gap-4">
                        {ride?.rideData.options.map((driver) => (
                            <DriverItem key={driver.id} data={driver} setStep={setStep}/>
                        ))}
                    </div>
                </div>

                <div className="w-full flex justify-center flex-col">
                    <h3 className="text-center mb-3">Mapa de viagem</h3>
                    <img src={mapUrl}  alt="mapa da image" />
                </div>
            </div>
        </Card>
    )
}