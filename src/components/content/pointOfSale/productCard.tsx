import { motion } from "framer-motion";
import React, { useState } from "react";
import { Producto } from "../../../tipos/Producto";
import { ProductoVendido } from "../../../tipos/ProductoVendido";
import { ValidatePositiveFloatingNumber } from "../../../utils/validator";

const ProductCard = React.memo((props: { Prod: Producto }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="flex flex-col shadow-lg h-24 w-full rounded-xl p-1 cursor-pointer border 
                bg-white hover:shadow-2xl hover:bg-blue-400 hover:border-blue-700 hover:text-white"
    >
      <div className="flex flex-col justify-between divide-y-2 divide-slate-200 p-2 h-full w-full">
        <span title={`${props.Prod.nombre}`} className="lg:text-base sm:text-base xs:text-sm text-left line-clamp-3">
          {props.Prod.nombre}
        </span>
        <div className="lg:text-base sm:text-base xs:text-sm font-semibold text-right ">
          {Number(props.Prod.precioVenta).toFixed(2)}€
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;

export const ProductSelectedCard = React.memo((props: { producto: ProductoVendido; setPropiedadProd: Function }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const DeleteSelectedProd = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    props.setPropiedadProd(props.producto._id, 0, props.producto.dto);
  };

  return (
    <div key={`${props.producto._id}`}>
      <div
        className="flex flex-col flex-grow h-full w-full cursor-pointer"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        <div
          className={`flex justify-start ${
            isOpen ? "bg-blue-300 " : "bg-gray-200 hover:bg-gray-300 "
          } rounded-lg h-full w-full gap-x-4 p-2`}
        >
          <input
            className="bg-white w-8 h-8 rounded-lg text-center self-center font-semibold shadow focus:outline-none focus:shadow-lg text-sm"
            type="text"
            inputMode="numeric"
            value={props.producto.cantidadVendida}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              props.setPropiedadProd(props.producto._id, e.target.value, props.producto.dto);
            }}
          />

          <div className="flex flex-row">
            <div className="flex self-center justify-start">
              <div className="grid grid-rows-2 text-left">
                <p className="text-sm truncate font-semibold">{props.producto.nombre}</p>
                {isNaN(Number(props.producto.dto)) || Number(props.producto.dto) === 0 ? (
                  <p className="text-xs block">
                    {(Number(props.producto.precioVenta) * Number(props.producto.cantidadVendida)).toFixed(2)}€
                  </p>
                ) : (
                  <div className="flex-grow-0">
                    <p className="text-xs inline-block line-through text-red-700">
                      {(Number(props.producto.precioVenta) * Number(props.producto.cantidadVendida)).toFixed(2)}€
                    </p>
                    <span className="pl-2 text-sm font-semibold inline-block">
                      {(
                        Number(props.producto.precioVenta) *
                        Number(props.producto.cantidadVendida) *
                        (1 - Number(props.producto.dto) / 100)
                      ).toFixed(2)}
                      €
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            id={props.producto._id}
            className="ml-auto self-center hover:text-red-700"
            onClick={DeleteSelectedProd}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div
            className="flex mt-1 p-2 gap-2 w-full h-full bg-blue-200 rounded-lg items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col w-full items-start">
              <div className="font-semibold text-sm">Cantidad</div>
              <div className="flex gap-2 w-full justify-start">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  id={props.producto._id}
                  className="flex justify-center items-center rounded-md w-6 h-6 bg-gray-500 hover:bg-gray-600 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.setPropiedadProd(
                      props.producto._id,
                      (Number(props.producto.cantidadVendida) - 1).toString(),
                      props.producto.dto
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="butt"
                    strokeLinejoin="bevel"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex justify-center items-center rounded-md w-6 h-6 bg-gray-500 hover:bg-gray-600 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.setPropiedadProd(
                      props.producto._id,
                      (Number(props.producto.cantidadVendida) + 1).toString(),
                      props.producto.dto
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </motion.button>
              </div>
            </div>
            <div className="flex flex-col font-semibold text-sm w-full items-center">
              <span>Precio</span>
              <input
                type="text"
                inputMode="numeric"
                className="text-xs text-center rounded-lg w-10 h-6 shadow"
                value={props.producto.precioVenta}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={(e) => {
                  e.stopPropagation();
                  props.setPropiedadProd(
                    props.producto._id,
                    props.producto.cantidadVendida,
                    props.producto.dto,
                    ValidatePositiveFloatingNumber(e.target.value)
                  );
                }}
              />
            </div>
            <div className="flex flex-col font-semibold text-sm w-full  items-end">
              <div>Descuento</div>
              <div className="inline-block align-middle grid-rows-1">
                <input
                  type="text"
                  inputMode="numeric"
                  className="text-xs text-center rounded-lg w-10 h-6 shadow"
                  value={props.producto.dto}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(e) => {
                    e.stopPropagation();
                    props.setPropiedadProd(
                      props.producto._id,
                      props.producto.cantidadVendida,
                      ValidatePositiveFloatingNumber(e.target.value)
                    );
                  }}
                />
                <> %</>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

ProductSelectedCard.displayName = "ProductSelectedCard";
