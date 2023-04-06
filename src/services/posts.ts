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
        return axiosClient.get(SLUGS.products, config);
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
            localStorage.set(STORAGE_KEY, JSON.stringify({ ...parsedItem, [product.id]: value}));
        } else {
            localStorage.set(STORAGE_KEY, JSON.stringify({[product.id]: value}))
        }
    }

    static getValueById(product: IProduct) {
        const currentItem = localStorage.get(STORAGE_KEY);
        if (!currentItem) {
            return false;
        }

        return (JSON.parse(currentItem) as any)[product.id];
    }
}


const postsApi = new Posts();

export {
    postsApi,
    Posts,
    ProductStorage
};
