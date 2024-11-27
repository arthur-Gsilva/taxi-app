'use client'

import { Confirm } from "@/components/Confirm"
import { Finish } from "@/components/Finish"
import { Start } from "@/components/Start"
import { Step } from "@/types/step"
import { useState } from "react"

const Page = () => {

    const [step, setStep] = useState<Step>("START")

    return(
        <>
            {step === 'START' && <Start setStep={setStep}/>}
            {step === 'CONFIRM' && <Confirm setStep={setStep}/>}
            {step === 'FINISH' && <Finish setStep={setStep}/>}
        </>
    )
}

export default Page