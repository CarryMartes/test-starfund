import axiosClient from "../lib/axios";
import {AxiosRequestConfig} from "axios";
import {IProduct, IProductCard, IProductsResponse} from "../model";
import localStorage from "../lib/storage";

const enum SLUGS {
    products = '/products'
}

const STORAGE_KEY = 'products';

export const enum SORT_ORIENTATION {
    ASC= 'asc',
    DESC = 'desc'
}

class Posts {
    getProducts( config?: AxiosRequestConfig): Promise<IProductsResponse[]> {
        return axiosClient.get<IProductsResponse[]>(SLUGS.products, config).then(res => {
            // setting from disabled from localstorage
            const response = res.data;
            return response.map(res => {
                return {
                    ...res,
                    data: res.data.map(product => ({...product, disabled: ProductStorage.getValueById(product)}))
                }
            });
        });
    }

    static filterByTitle(value: string, response: IProductsResponse[]) {
        value = value.trim().toLowerCase();

        let filteredProducts: IProduct[] = [];
        response.forEach(res => {
            filteredProducts = [
                ...filteredProducts,
                ...res.data.filter(val =>
                    val.title.trim().toLowerCase().includes(value)
                )
            ];
        });
        return filteredProducts;
    }

    static sortBy(response: IProductsResponse[],orientation: SORT_ORIENTATION, key: keyof IProduct) {
        let mergeArrays: IProduct[] = [];
        response.forEach(res => {
            res.data.forEach(product => {
                mergeArrays.push(product);
            })
        })
        if (orientation === SORT_ORIENTATION.DESC) {
            return mergeArrays.sort((a, b) => (a[key] as number) - (b[key] as number));
        } else {
            return mergeArrays.sort((a, b) => (b[key] as number) - (a[key] as number));
        }
    }
}

class ProductStorage {
    static add(product: IProduct, value: boolean) {
        const currentItem = localStorage.get(STORAGE_KEY);
        if (currentItem) {
            const parsedItem: any = JSON.parse(currentItem) as any;
            localStorage.set(
                STORAGE_KEY,
                JSON.stringify({
                    ...parsedItem,
                    [product.id]: {
                        value,
                        price: product.price
                    }
                }
            ));
        } else {
            localStorage.set(STORAGE_KEY, JSON.stringify({
                [product.id]: {
                    value,
                    price: product.price
                }
            }))
        }
    }

    static getValueById(product: IProduct) {
        const currentItem = localStorage.get(STORAGE_KEY);
        if (!currentItem) {
            return false;
        }

        return (JSON.parse(currentItem) as any)[product.id]?.value;
    }

    static getAll(): {count: number, price: number} {
        const currentItems = localStorage.get(STORAGE_KEY);
        if (!currentItems) {
            return {count: 0, price: 0};
        }
        const idWithValue = JSON.parse(currentItems);
        let newObj: Record<any, any> = {};
        let price: number = 0;
        for (let key of Object.keys(idWithValue)) {
            if (idWithValue[key].value) {
                newObj[key] = idWithValue[key];
                price += idWithValue[key].price;
            }
        }
        const count = Object.keys(newObj).length;

        return {count, price};
    }
}


const postsApi = new Posts();

export {
    postsApi,
    Posts,
    ProductStorage
};
