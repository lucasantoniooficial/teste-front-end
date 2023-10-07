import {CiSearch} from "react-icons/ci";
import {ChangeEvent, useEffect, useState} from "react";
import httpClient from "@/utils/httpClient";

type HeaderProps = {
    categoryId: string,
    setCategoryId: (id: string) => void,
    search: string,
    setSearch: (search: string) => void
}

export default function Header({categoryId, setCategoryId, search, setSearch}: HeaderProps) {

    const [categories, setCategories] = useState<CategoryProp[]>([]);
    useEffect(() => {
        httpClient.get('categories').then(({data}) => {
            setCategories(data);
        })
    }, []);

    return (
        <div className="px-4 pb-2 flex justify-between">
            <h1 className="text-xs font-bold ">mmartan</h1>

            <div className="flex items-center gap-2">
                <select
                    onChange={(event: ChangeEvent<HTMLSelectElement>) => setCategoryId(event.target.value)}
                    className="border rounded-full text-xs bg-transparent focus:border-px focus:border-slate-400 px-3 py-px focus:outline-0">
                    <option value="">Selecione uma categoria</option>
                    {
                        categories.map(({id, name}: CategoryProp, index) => (
                            //@ts-ignore
                            <option key={id}  value={id}>{name}</option>
                        ))
                    }
                </select>
                <div className="relative">
                    <span className="absolute top-[5px] left-[5px]"><CiSearch/></span>
                    <input type="text"
                           value={search}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
                           className="border rounded-full focus:border-px focus:border-slate-400 pl-6 focus:outline-0"
                           placeholder="Search"/>
                </div>
            </div>
        </div>
    );
}