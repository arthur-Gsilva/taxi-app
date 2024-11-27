"use client"
import { RideData } from "@/types/ride";
import { createContext, ReactNode, useState } from "react";


const initialRideData: RideData = {
    origin: { latitude: 0, longitude: 0 },
    destination: { latitude: 0, longitude: 0 },
    distance: 0,
    duration: "",
    options: [],
};

type RideContextType = {
    rideData: RideData;
    setRideData: (data: RideData) => void;
    userId: string | null; 
    setUserId: (id: string) => void;
    driverId: number | null; 
    setDriverId: (id: number) => void;
}

export const RideContext = createContext<RideContextType | undefined>(undefined);

export const RideProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [rideData, setRideData] = useState<RideData>(initialRideData);
    const [userId, setUserId] = useState<string | null>(null)
    const [driverId, setDriverId] = useState<number | null>(null)

    return (
        <RideContext.Provider value={{ rideData, setRideData, userId, setUserId, driverId, setDriverId }}>
            {children}
        </RideContext.Provider>
    );
};