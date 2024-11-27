import { Driver } from "./Driver"

export type ride = {
    customer_id: number,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    value: number,
    driver: Driver
}