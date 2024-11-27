export type Coordinates = {
    latitude: number;
    longitude: number;
}

export type Driver = {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
        rating: number,
        comment: string
    }
    value: number;
    image: string
}

export type RideData = {
    origin: Coordinates,
    destination: Coordinates,
    distance: number,
    duration: string,
    options: Driver[]
}
