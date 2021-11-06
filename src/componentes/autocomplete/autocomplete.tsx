import React, { useState } from "react";
import { className } from "../../tipos/className";

type AutoCompleteProps = {
    sugerencias: string[],
    nombreInput: string
    placeholder: string    
}

const AutoComplete = (props: AutoCompleteProps & className) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;

        // Filter our suggestions that don't contain the user's input
        const unLinked = props.sugerencias.filter(
            (sugerencia) =>
            sugerencia.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setInput(e.target.value);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    };


    const Clicked = (event: any) => {
        const input = event.target as HTMLElement;

        setFilteredSuggestions([]);
        setInput(input.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    };

    const SuggestionsListComponent = (suggestionProps: className) => {
        return filteredSuggestions.length ? (
          <ul className={`${suggestionProps.className}`}>
            {filteredSuggestions.map((sugerencia) => {
              return (
                <li className={`cursor-pointer border-2 border-separate hover:bg-gray-200`} key={sugerencia} onClick={Clicked}>
                  {sugerencia}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={`${suggestionProps.className}`}>
            <em className="truncate">Ninguno encontrado</em>
          </div>
        );
    };

    return (
        <div className={`${props.className}`}>
            <InputText NombreInput={props.nombreInput} InputValue={input} Placeholder={props.placeholder} OnChangeCallback={onChange}/>
            {showSuggestions && input && <SuggestionsListComponent className={props.className}/>}
        </div>
      );
    };

    type InputProps = {
        NombreInput: string
        OnChangeCallback: React.ChangeEventHandler<HTMLInputElement>
        InputValue: string
        Placeholder: string
    }

    const InputText = (props: InputProps) => {
        return(
            
            <div className=" relative ">
                <label className="text-gray-700">
                    {props.NombreInput}
                </label>
                <input className=" rounded-lg border-transparent flex-1 
                                    appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 
                                    shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                                    name="Input" placeholder={props.Placeholder} value={props.InputValue} onChange={props.OnChangeCallback} />
            </div>

        );
    }

    export default AutoComplete;