import React, {useCallback, useEffect, useState} from 'react';
import './styles/App.scss'
import Product from "./ui/Product";
import useInfiniteScroll from "./hooks/infinite-scroll";
import SearchBar from "./ui/SearchBar";
import {useDebounce} from "./hooks/use-debounce";
import {Posts, postsApi, ProductStorage, SORT_ORIENTATION} from "./services";
import FiltersBar from "./ui/FiltersBar";
import {IProduct, IProductCard, IProductsResponse} from "./model";
import BasketInfo from "./ui/BasketInfo";

function App() {
    const [products, setProducts] = useState([]);
    const [response, setResponse] = useState<IProductsResponse[]>([]);
    const [params, setParams] = useState({page: 1, hasNext: true});
    // callback to memoize function only render dependency update
    const fetchProducts = useCallback(() => {
        if (params.hasNext && response[params.page - 1]) {
            const {data, page, hasNext} = response[params.page - 1];
            setProducts([...products, ...data]);
            setParams({page: page + 1, hasNext});
        }
        setIsFetching(false);
    }, [response, params]);

    const [_, setIsFetching] = useInfiniteScroll(fetchProducts);
    const [searchValue, setSearchValue] = useState('');

    const debouncedValue = useDebounce(searchValue, 400);

    useEffect(() => {
        postsApi.getProducts().then(res => {
            const {data, page, hasNext} = res[params.page - 1];
            setProducts(data);
            setParams({page: page + 1, hasNext});

            setIsFetching(false);
            setResponse(res);
        });
    }, []);

    useEffect(() => {
        setProducts(Posts.filterByTitle(debouncedValue, response));
        // after applied filter turning off scroll pagination
        setParams({...params, hasNext: false});
    }, [debouncedValue]);

    function onSortApply(sortBy: keyof IProduct, orientation: SORT_ORIENTATION) {
        setProducts(Posts.sortBy(response, orientation, sortBy));
    }

    function onClickToAction(product: IProductCard) {
        ProductStorage.add(product, !product.disabled);
        product.disabled = !product.disabled;

        // re-render products
        setProducts([...products]);
    }

      return (
        <div className="wrapper">
            <SearchBar onChange={(value) => setSearchValue(value)} />
            <FiltersBar onCallback={onSortApply} />
            <BasketInfo products={products} />
            <div className="wrapper_products">
                {
                    products && products.map((res, key) => (
                        <Product key={key} product={res} onAction={onClickToAction} />
                    ))
                }
            </div>
        </div>
      );
}

export default App;
