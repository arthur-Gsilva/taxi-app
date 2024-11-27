import { Message } from "@/types/Message";

type AddAction = {
    type: 'add',
    payload: {
        user: number,
        text: string,
        isyou: boolean
    }
}

type ChatActions = AddAction

export const chatReducer = (state: Message[], action: ChatActions): Message[] => {
    switch(action.type){
        case 'add':
            return [...state, {
                id: state.length,
                userId: action.payload.user,
                text: action.payload.text,
                isyou: action.payload.isyou
            }]
        default:
            return state
    }
}  