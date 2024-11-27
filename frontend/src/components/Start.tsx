import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Step } from "@/types/step"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useContext, useState } from "react"
import { RideContext } from "@/contexts/RideContext"

type Props = {
    setStep: (a: Step) => void
}

const formSchema = z.object({
    id: z.string().min(1, 'Digite um número válido'),
    origin: z.string().min(2, 'Digite um endereço válido'),
    destination: z.string().min(2, 'Digite um endereço válido')
})

export const Start = ({ setStep }: Props) => {

    const ride = useContext(RideContext)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          id: "",
          origin: '',
          destination: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        if (values.origin === values.destination) {
            form.setError("destination", { message: "Origem e destino não podem ser iguais." })
            return
        }

        setLoading(true)
        try{
            const response = await axios.post('http://localhost:8080/ride/estimate', {
                origin: values.origin,
                destination: values.destination,
                customer_id: values.id
            })
            ride?.setUserId(values.id)
            ride?.setRideData(response.data)
            setStep("CONFIRM")
        } catch{
            setError("Endereço(s) inválido(s)")
        }
        setLoading(false)
        
    }

    return(
        <Card className=" mx-auto px-0 max-w-[450px]">
            <CardHeader>
                <CardTitle className="text-center font-bold text-2xl">Realize agora sua viagem!</CardTitle>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col w-full">
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Código de usuário</FormLabel>
                                <FormControl>
                                    <Input placeholder="digite seu código" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="origin"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Endereço de origem</FormLabel>
                                <FormControl>
                                    <Input placeholder="origem"  {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="destination"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Endereço de destino</FormLabel>
                                <FormControl>
                                    <Input placeholder="Destino" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <Button type="submit" disabled={loading}>Solicitar viagem</Button>
                    </form>
                </Form>

                <p 
                    className="text-center underline cursor-pointer mt-4"
                    onClick={() => setStep('FINISH')}
                >Ir para histórico</p>
            </CardContent>
        </Card>
    )
}