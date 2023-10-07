
export type ProductProps = {
    id: number,
    categoryId: number,
    name: string,
    description: string,
    promotional_price: number,
    price: number,
    active: boolean,
    images: {
        id: number,
        productId: number,
        path: string
    }[],
    category: CategoryProp
}

export type ProductDataProps = {
    data: ProductProps[],
    count: number
}
