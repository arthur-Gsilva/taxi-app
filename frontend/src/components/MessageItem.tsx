import { Message } from "@/types/Message"

type Props = {
    data: Message
}

export const MessageItem = ({ data }: Props) => {
    return(
        <div 
            className="bg-white rounded-xl p-2 max-w-[200px]"
            style={{ alignSelf: data.isyou ? 'flex-end' : 'flex-start'}}
        >
            {data.isyou &&
                <p>[Você]: {data.text}</p>
            }
            {!data.isyou &&
                <p>{data.text}</p>
            }
            
        </div>
    )
}