import { MouseEventHandler, PropsWithChildren, ReactElement } from "react";

type BackdropProps = {
    children: PropsWithChildren<ReactElement>,
    onClick: MouseEventHandler<HTMLElement>
}

export const Backdrop = ({children, onClick} : BackdropProps) => {
    return(
        <div
            className="absolute top-0 left-0 h-full w-full bg-opacity-80 bg-black flex items-center justify-center"
            onClick={onClick}>
            {children}
        </div>
    );

}