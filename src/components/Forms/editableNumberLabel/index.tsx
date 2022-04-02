import React, { useState } from "react";

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
const EditableNumberLabel = (props: {
    text: number,
    setText: React.Dispatch<React.SetStateAction<number>>,
    type: string,
    placeholder: string,
    cambiosHandler: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    // Manage the state whether to show the label or the input box. By default, label will be shown.
    // Exercise: It can be made dynamic by accepting initial state as props outside the component 
    const [isEditing, setEditing] = useState(false);

    // Event handler while pressing any key while editing
    const handleKeyDown = (event: any, type: string) => {
        const { key } = event;
        const keys = ["Escape", "Tab"];
        const enterKey = "Enter";
        const allKeys = [...keys, enterKey]; // All keys array

        /* 
          - For textarea, check only Escape and Tab key and set the state to false
          - For everything else, all three keys will set the state to false
        */
        if (
            (type === "textarea" && keys.indexOf(key) > -1) ||
            (type !== "textarea" && allKeys.indexOf(key) > -1)
        ) {
            setEditing(false);
        }
    };

    /*
    - It will display a label is `isEditing` is false
    - It will display the children (input or textarea) if `isEditing` is true
    - when input `onBlur`, we will set the default non edit mode
    Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
    */
    return (
        <section className="cursor-text">
            {isEditing
                ?
                <div
                    onBlur={() => setEditing(false)}
                    onKeyDown={e => handleKeyDown(e, props.type)}
                >
                    <input
                        className="placeholder:text-gray-400 placeholder:italic p-2 border rounded-lg w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                        type="text"
                        name="task"
                        placeholder={props.placeholder}
                        value={props.text}
                        onChange={e => { props.setText(Number(e.target.value)); props.cambiosHandler(true); }}
                    />
                </div>
                :
                <div
                    onClick={() => setEditing(true)}
                >
                    <span className={`${!isNaN(props.text) ? 'text-black' : 'text-gray-400 italic'}`}>
                        {
                            !isNaN(props.text) ? props.text : props.placeholder
                        }
                    </span>
                </div>
            }
        </section>
    );
};

export default EditableNumberLabel;