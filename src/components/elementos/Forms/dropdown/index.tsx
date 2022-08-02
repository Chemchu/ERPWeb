import { Combobox, Transition } from "@headlessui/react";
import { useState } from "react";

const Dropdown = (props: { titulo?: string, elementos: string[], selectedElemento: string, setElemento: Function }) => {
    const [query, setQuery] = useState('');

    const filteredOptions =
        query === ''
            ? props.elementos
            : props.elementos.filter((elem) => {
                return elem.toLowerCase().includes(query.toLowerCase())
            });

    return (
        <Combobox as="div" className="relative" value={props.selectedElemento} onChange={(e) => { props.setElemento(e) }}>
            <Combobox.Label>{props.titulo}</Combobox.Label>
            <Combobox.Input className="rounded-lg flex-1 border w-full py-2 px-4 bg-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent" onChange={(event: any) => setQuery(event.target.value)} />
            <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Combobox.Options className="absolute flex flex-col py-1 mt-1 bg-white w-full border rounded-lg z-10">
                    {filteredOptions.map((elem) => (
                        <Combobox.Option className="hover:bg-blue-400 hover:text-white cursor-pointer" key={elem} value={elem}>
                            {elem}
                            <hr />
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Transition>
        </Combobox>
    );
}

export default Dropdown;