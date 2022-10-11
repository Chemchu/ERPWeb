import { Combobox, Transition } from "@headlessui/react";
import { useEffect, useState, useTransition } from "react";
import { IsEAN } from "../../../../utils/validator";

const Dropdown = (props: { titulo?: string, elementos: string[], selectedElemento: string, setElemento: Function, autoSelect?: boolean }) => {
    const [query, setQuery] = useState('');
    const [_, startTransition] = useTransition();

    useEffect(() => {
        if (!props.autoSelect) { return; }

        const elementos = props.elementos.filter((elem) => {
            return elem.toLowerCase().includes(query.toLowerCase())
        });
        if (elementos.length === 1 && IsEAN(query)) {
            props.setElemento(elementos[0]);
            setQuery("")
        }
    }, [query])

    const Filtrar = (event: any) => {
        startTransition(() => {
            setQuery(event.target.value);
        })
    }

    const filteredOptions =
        query === ''
            ? props.elementos
            : props.elementos.filter((elem) => {
                return elem.toLowerCase().includes(query.toLowerCase())
            });

    return (
        <Combobox as="div" className="relative w-full" value={props.selectedElemento} onChange={(e: any) => props.setElemento(e)}>
            <Combobox.Label>{props.titulo}</Combobox.Label>
            <Combobox.Input
                className="rounded-lg flex-1 border w-full py-2 px-4 bg-white placeholder-gray-400 shadow-sm text-base focus:outline-none 
                focus:ring-1 focus:ring-blue-600 focus:border-transparent"
                onChange={Filtrar} />
            <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Combobox.Options className="absolute flex flex-col py-1 mt-1 bg-white w-full border rounded-lg z-10 border-blue-500">
                    {
                        filteredOptions.slice(0, 10).map((elem, index) => (
                            <Combobox.Option className="flex h-8 hover:bg-blue-400 hover:text-white cursor-pointer items-center border-b border-blue-500" key={`${elem}-${index}`} value={elem}>
                                <span className="p-4">
                                    {elem}
                                </span>
                            </Combobox.Option>
                        ))
                    }
                </Combobox.Options>
            </Transition>
        </Combobox >
    );
}

export default Dropdown;