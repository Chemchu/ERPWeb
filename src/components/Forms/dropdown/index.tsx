import { useState } from "react";

const Dropdown = (props: { titulo?: string, elementos: string[] | undefined, selectedElemento: string, setElemento: Function }) => {
    const [open, setOpen] = useState<boolean>(false);



    return (
        <div className="w-64">
            <div className="mt-1 relative">
                {props.titulo}
                <button type="button" className="relative w-full bg-white rounded-md shadow-lg pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onClick={() => { setOpen(!open) }}>
                    <span className="flex items-center">
                        <span className="ml-3 block truncate">
                            {
                                props.selectedElemento ?
                                    props.selectedElemento
                                    :
                                    props.elementos ?
                                        props.elementos[0]
                                        :
                                        undefined
                            }
                        </span>
                    </span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd">
                            </path>
                        </svg>
                    </span>
                </button>
                {
                    open &&
                    <div className="absolute mt-1 w-full z-10 rounded-md bg-white shadow-lg">
                        <ul role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {
                                props.elementos
                                    ?
                                    props.elementos.map((elem) => {
                                        return (
                                            <li key={`listbox-item-${elem}`} role="option" className="text-gray-900 cursor-default select-none hover:bg-blue-500 hover:text-white relative py-2 pl-3 pr-9"
                                                onClick={() => { props.setElemento(elem); setOpen(false); }}>
                                                <div className="flex items-center">
                                                    <span className="ml-3 block font-normal truncate">
                                                        {elem}
                                                    </span>
                                                </div>
                                                {
                                                    props.selectedElemento === elem &&
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd">
                                                            </path>
                                                        </svg>
                                                    </span>
                                                }
                                            </li>
                                        );
                                    })
                                    :
                                    null
                            }
                        </ul>
                    </div>
                }
            </div>
        </div>

    );
}

export default Dropdown;