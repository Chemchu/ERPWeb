export const Input = ({ placeholder, OnChangeCallback, inputValue }: { placeholder: string, OnChangeCallback?: React.ChangeEventHandler<HTMLInputElement>, inputValue?: string }) => {
    return (
        <input className="rounded-lg flex-1 border w-full py-2 px-4 bg-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            name="Input" type="text" placeholder={placeholder} value={inputValue} onChange={OnChangeCallback} />
    );

}