type Driver = {
    id: number;
    name: string;
};

export type RideDone = {
    id: number;
    createdAt: string; 
    customer_id: number;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
    driverId: number;
    driver: Driver;
};