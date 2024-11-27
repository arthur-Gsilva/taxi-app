import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { useContext, useRef, useState } from "react"
import axios from "axios"
import { RideDone } from "@/types/rideDone"
import { Step } from "@/types/step"
import { formatDate, formatPrices, getMinutes } from "@/services"
import { ChatDialog } from "./ChatDialog"
import { RideContext } from "@/contexts/RideContext"

type Props = {
    setStep: (a: Step) => void
}

export const Finish = ({ setStep }: Props) => {

    const ride = useContext(RideContext)

    const [rides, setRides] = useState<RideDone[]>()
    const idRef = useRef<HTMLInputElement>(null);
    const driverRef = useRef<string | null>('all');

    const getRides = async (id: string, driverId: string) => {
        const response = await axios.get(`http://localhost:8080/ride/${id}/${driverId !== 'all' ? driverId : ''}`)
        setRides(response.data.rides)
        console.log(response.data)
    }


    const searchRides = async () => {
        const idValue = idRef.current?.value || ""
        const driverValue = driverRef.current
        await getRides(idValue, driverValue as string)
    }

    return(
        <Card className="w-4/5 px-0 mx-auto">
            <CardHeader className="flex flex-row items-center justify-between gap-4 mb-2">
                <div className="flex gap-2 items-center">
                    <input 
                        type="text" 
                        placeholder="Digite um ID" 
                        className="border border-black rounded-xl px-3 py-1"
                        ref={idRef}
                    />
                    <Select onValueChange={(value) => (driverRef.current = value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Motorista"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="1">Homer Simpson</SelectItem>
                            <SelectItem value="2">Dominic Toretto</SelectItem>
                            <SelectItem value="3">James Bond</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button onClick={searchRides}>Buscar</Button>
            </CardHeader>

            <CardContent>
                {rides?.length !== 0 && rides  &&
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Motorista</TableHead>
                                <TableHead>Origem</TableHead>
                                <TableHead>Destino</TableHead>
                                <TableHead>Distância</TableHead>
                                <TableHead className="w-[100px]">Tempo</TableHead>
                                <TableHead className="w-[100px]">Valor</TableHead>
                                <TableHead>Data</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {rides?.map((ride) => (
                                <TableRow key={ride.id}>
                                    <TableCell>{ride.driver.name}</TableCell>
                                    <TableCell>{ride.origin}</TableCell>
                                    <TableCell>{ride.destination}</TableCell>
                                    <TableCell>{(ride.distance / 1000).toFixed(2)}km</TableCell>
                                    <TableCell>{getMinutes(ride.duration).toFixed(2)} Min</TableCell>
                                    <TableCell>{formatPrices(ride.value)}</TableCell>
                                    <TableCell>{formatDate(ride.createdAt)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
                {!rides &&
                    <div className="text-center">Selecione no filtro para aparecer suas viagens</div>
                }
                {rides?.length === 0 &&
                    <div className="text-center">Viagens do usuário não encontrado</div>
                }

                <div className="flex justify-center items-center w-full mt-8">
                    <Button onClick={() => setStep('START')}>Realizar Nova Viagem</Button>
                </div>
            </CardContent>

            {ride?.rideData.options.length !== 0 &&
                <ChatDialog />
            }
            
        </Card>
    )
}