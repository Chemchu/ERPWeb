import { Popover, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { Roles } from "../../../tipos/Enums/Roles";
import { SidebarOption } from "../../../tipos/Enums/SidebarOption";
import AuthorizationWrapper from "../../authorizationWrapper";

const PopOver = (props: {
  children: React.ReactNode;
  rutas: { nombre: string; ruta: string; callback: Function; roles?: Roles[] }[];
  className?: string;
  CurrentIndex: SidebarOption;
  ButtonIndex: SidebarOption;
}) => {
  const router = useRouter();

  return (
    <Popover className="relative">
      {({ open }) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
          <Popover.Button
            className={`${props.CurrentIndex === props.ButtonIndex && "bg-blue-700 text-blue-500 p-2"}
            ${open && "bg-blue-800 p-2"} hover:bg-blue-800 hover:p-2 cursor-pointer duration-75 rounded-lg flex`}
          >
            {props.children}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className={props.className}>
              {({ close }) => {
                return (
                  <>
                    {props.rutas.map((r, i) => (
                      <div key={`${i} - ${r.nombre}`}>
                        {AuthorizationWrapper(r.roles ? r.roles : [Roles.Administrador, Roles.Cajero, Roles.Gerente])(
                          () => {
                            return (
                              <span
                                key={`${r.nombre}-${i}`}
                                onClick={async (e) => {
                                  router.push(r.ruta);
                                  await r.callback(e);
                                  close();
                                }}
                              >
                                {r.nombre}
                              </span>
                            );
                          }
                        )({})}
                      </div>
                    ))}
                  </>
                );
              }}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
//flex flex-col absolute bottom-7 right-0 border rounded-lg bg-blue-600 text-white p-2 w-32
export default PopOver;
