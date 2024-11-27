export type Review = {
    rating: number,
    comment: string,
};
  
export type Driver = {
    id: number,
    name: string,
    description: string, 
    vehicle: string,
    review: Review,
    value: number,
    minKm: number
};