"use client"

import { chatReducer } from "@/reducers/chatReducer";
import { createContext, ReactNode, useReducer } from "react";
import { Message } from "@/types/Message"

type ChatContext = {
    chat: Message[],
    addMessage: (id: number, text: string, isyou: boolean) => void
}

export const ChatContext = createContext<ChatContext | null>(null)

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [chat, dispatch] = useReducer(chatReducer, [])

    const addMessage = (idUser: number, text: string, isyou: boolean) => {
        dispatch({
            type: 'add',
            payload: { user: idUser, text, isyou }
        })
    }

    return(
        <ChatContext.Provider value={{ chat, addMessage }}>
            {children}
        </ChatContext.Provider>
    )
}