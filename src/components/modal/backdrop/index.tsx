import { MouseEventHandler, PropsWithChildren, ReactElement } from "react";

type BackdropProps = {
  children: PropsWithChildren<ReactElement>;
  onClick?: MouseEventHandler<HTMLElement>;
};

export const Backdrop = ({ children, onClick }: BackdropProps) => {
  return (
    <div
      className={"absolute top-0 left-0 h-full w-full bg-black/30 flex items-center justify-center z-20"}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
