import { RideContext } from "@/contexts/RideContext"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useContext, useRef } from "react"
import { ChatContext } from "@/contexts/ChatContext"
import { MessageItem } from "./MessageItem"
import axios from "axios"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export const ChatDialog = () => {

    const ride = useContext(RideContext)
    const inputRef = useRef<HTMLInputElement>(null)
    const chat = useContext(ChatContext)
    const driver = ride?.driverId as number

    const handleAddMessage = async () => {
        if(inputRef?.current?.value !== '' && inputRef.current){
            chat?.addMessage(parseInt(ride?.userId as string), inputRef?.current?.value as string, true)

            const response = await axios.post("http://localhost:8080/chat", {
                driverId: driver,
                mensagem: inputRef.current.value
            })

            console.log(response.data.resposta)
            chat?.addMessage(1, response.data.resposta, false)

            inputRef.current.value = ""
        }
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    onClick={() => console.log(ride)}
                    className="absolute bottom-5 right-4"
                >
                    Abrir Chat com motorista</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader className="flex flex-row gap-4 items-center">
                    <Avatar>
                        <AvatarImage src={ride?.rideData?.options[driver - 1]?.image} />
                        <AvatarFallback>Motorista</AvatarFallback>
                    </Avatar>
                    
                    <DialogTitle>
                        {ride?.rideData?.options[driver - 1]?.name || "Nome não disponível"}
                    </DialogTitle>
                </DialogHeader>

                <div className="h-[500px] bg-gray-100 p-5 flex flex-col gap-2 overflow-y-auto">
                    {chat?.chat.map((item) => (
                        <MessageItem key={item.id} data={item}/>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <input 
                        type="text" 
                        placeholder="Digite aqui sua mensagem"
                        ref={inputRef}
                        className="p-2 border border-black rounded-full flex-1"
                    />

                    <Button onClick={handleAddMessage}>Enviar</Button>
                </div>
            </DialogContent>
        </Dialog>
            
    )
}