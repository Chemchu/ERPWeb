type Props = {
    placeholder: string
    inputValue?: string
    OnChangeCallback?: React.ChangeEventHandler<HTMLInputElement>
}

export const Input = ({placeholder, OnChangeCallback, inputValue}: Props) => {
    return(
        <input className="rounded-lg border-transparent flex-1 
                                        appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 
                                        shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                                        name="Input" type="text" placeholder={placeholder} value={inputValue} onChange={OnChangeCallback}/>
    );
        
}