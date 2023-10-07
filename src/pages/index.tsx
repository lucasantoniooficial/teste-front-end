'use client'
import {Fragment, useEffect, useState} from "react";
import ProductItem from "@/components/product-item";
import Header from "@/components/header";
import httpClient from "@/utils/httpClient";
import {ProductDataProps} from "@/types/data-product-props";
import {getFromCache} from "small-cache";

export default function Home() {
    const [data, setData] = useState<ProductDataProps>({
        data: [],
        count: 0
    });

    const [limit, setLimit] = useState<number>(10);
    const [search, setSearch] = useState<string>('');
    const [categoryId, setCategoryId] = useState<string>('0');
    const getProducts = async () => {
        return getFromCache(
            `products?search=${search}&categoryId=${categoryId}&limit=${limit}`,
            async function () {
                const {data} = await httpClient.get(`products?search=${search}&categoryId=${categoryId}&limit=${limit}`);

                return data;
            },
            { // options parameter
                TTL_InSeconds: 60 * 60, // cache TTL (time to expire in seconds)
                enabled: true // enable or disable the caching
            }
        );
    }

    useEffect(() => {
        getProducts().then(setData);
    }, [limit, search, categoryId]);
    return (
        <Fragment>
            <div className="px-14 py-10">
                <Header
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                    search={search}
                    setSearch={setSearch}
                />
                <div className="py-10 px-4 bg-slate-100 w-full">
                    <h2 className="text-md font-normal">{categoryId != '0' && categoryId != '' ? data.data[0].category.name : "Todos"}</h2>
                </div>
                <div className="px-8 pt-5">
                    <p className="border-b-2 text-sm w-max border-yellow-500">{data.count} produtos encontrados</p>
                    {data.data.map((product, index) => (
                        <ProductItem
                            key={product.id}
                            index={index}
                            item={product}
                            isLast={index == data.data.length - 1}
                            newLimit={() => setLimit(limit + 5)}
                        />
                    ))}
                </div>
            </div>
        </Fragment>
    )
}
