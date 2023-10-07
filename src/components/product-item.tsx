'use client'
import {ProductProps} from "@/types/data-product-props";
import {Fragment, useEffect, useRef} from "react";
import formatPrice from "@/utils/format-price";


type ProductItemProps = {
    item: ProductProps,
    index: number,
    newLimit: () => void,
    isLast: boolean
}
export default function ProductItem({item, index, isLast, newLimit}: ProductItemProps) {
    const productItemRef = useRef<any>();

    useEffect(() => {
        if(!productItemRef?.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if(isLast && entry.isIntersecting) {
                newLimit();
                observer.unobserve(entry.target)
            }
        });

        observer.observe(productItemRef.current);

    }, [isLast]);

    return (
        <div ref={productItemRef} key={item.id} className={`flex ${index == 0 ? `mt-2 ` : ''}items-center justify-between ${index == 0 ? `border` : 'border-x border-b'}`}>
            <div className="flex gap-2 items-center">
                <div className="inline-flex gap-2 p-2">
                    {
                        item.images.map((image) => (
                            <img key={image.id} src={`http://192.168.0.58/${image.path}`} width={100} height={100} alt="produto 1" />
                        ))
                    }
                </div>
                <div>
                    <p className="text-md">
                        {item.name}
                    </p>
                    <span className="text-xs text-slate-500">
                        {item.description}
                    </span>
                </div>
            </div>
            <div className="flex gap-2 pr-4">
                {
                    item.promotional_price ? (
                        <Fragment>
                            <span className="line-through text-xs text-slate-400">{formatPrice(item.price)}</span>
                            <p>por {formatPrice(item.promotional_price)}</p>
                        </Fragment>
                    ) : (
                        <p>{formatPrice(item.price)}</p>
                    )
                }
            </div>
        </div>
    );
}