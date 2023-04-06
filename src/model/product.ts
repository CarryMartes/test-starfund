
export interface IProduct {
    "id": number,
    "title": string,
    "description": string,
    "price": number,
    "currency": string,
    "image": string,
    "rating": number
}

export interface IAvailability {
    disabled: boolean;
}

export interface IProductCard extends IAvailability, IProduct {}

interface IParams {
    page: number;
}


export interface IProductsResponse extends IParams {
    hasNext: boolean;
    data: IProductCard[]
}