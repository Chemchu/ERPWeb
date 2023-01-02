import React from "react";
import { CustomerPaymentInformation } from "../../../tipos/CustomerPayment";
import { ProductoVendido } from "../../../tipos/ProductoVendido";
import Image from "next/image";
import { Venta } from "../../../tipos/Venta";
import useDatosTiendaContext from "../../../context/datosTienda";
import { CalcularBaseImponiblePorIva } from "../../../utils/typeCreator";

const Ticket = React.forwardRef(
  (
    props: {
      pagoCliente: CustomerPaymentInformation;
      productosVendidos: ProductoVendido[];
      qrImage: string | undefined;
      venta: Venta;
    },
    ref: React.LegacyRef<HTMLDivElement>
  ) => {
    const { NombreTienda, DireccionTienda, CIF } = useDatosTiendaContext();
    return (
      <div
        className="flex flex-col gap-2 items-center bg-white rounded-2xl w-full h-auto text-xs"
        ref={ref}
      >
        <div className="w-full h-5/6 rounded-3xl bg-white z-10">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-center ">
              {NombreTienda || "ERPWeb"}
            </h2>
            {DireccionTienda && (
              <div className="text-xs text-center">{DireccionTienda}</div>
            )}
            {CIF && <div className="text-xs text-center">CIF: {CIF}</div>}
            {props.venta.numFactura && (
              <div className="text-center">
                Num. factura: {props.venta.numFactura}
              </div>
            )}
            <div className="text-center">
              Fecha: {new Date(Number(props.venta.createdAt)).toLocaleString()}
            </div>
          </div>
          <div id="receipt-content" className="text-left w-full h-5/6 p-2">
            <hr />
            <div className="w-full h-full">
              <div className="flex w-full justify-around">
                <p className="w-2/4 text-left font-semibold">Producto</p>
                <p className="w-1/4 text-center font-semibold">Und.</p>
                <p className="w-1/4 text-center font-semibold">Total</p>
              </div>
              <div className="flex flex-col gap-2 w-full h-full overflow-y-auto overflow-x-hidden pt-2">
                {props.productosVendidos.map((prod, index) => {
                  if (prod.dto) {
                    return (
                      <GenerarFilaProducto
                        key={"modalRes" + prod._id}
                        numFila={index + 1}
                        nombreProducto={prod.nombre}
                        cantidad={Number(prod.cantidadVendida)}
                        precio={Number(
                          Number(prod.precioVenta) *
                            (1 - Number(prod.dto) / 100)
                        )}
                      />
                    );
                  } else {
                    return (
                      <GenerarFilaProducto
                        key={"modalRes" + prod._id}
                        numFila={index + 1}
                        nombreProducto={prod.nombre}
                        cantidad={Number(prod.cantidadVendida)}
                        precio={Number(prod.precioVenta)}
                      />
                    );
                  }
                })}
              </div>
              <hr />
            </div>
          </div>
        </div>
        <div className="w-full">
          <hr />
          <GetBaseImponible productosVendidos={props.productosVendidos} />
          <hr />
        </div>
        <div className="flex flex-col justify-evenly w-full h-auto items-center">
          <div className="font-semibold">{props.pagoCliente.tipo}</div>
          <div>Precio total: {props.pagoCliente.precioTotal.toFixed(2)}€</div>
          {props.pagoCliente.pagoEnEfectivo > 0 && (
            <div>
              Pagado con efectivo: {props.pagoCliente.pagoEnEfectivo.toFixed(2)}
              €
            </div>
          )}
          {props.pagoCliente.pagoEnTarjeta > 0 && (
            <div>
              Pagado con tarjeta: {props.pagoCliente.pagoEnTarjeta.toFixed(2)}€
            </div>
          )}
          <div>Cambio: {props.pagoCliente.cambio.toFixed(2)}€</div>
        </div>
        {props.qrImage ? (
          <div className="flex flex-col gap-1 justify-center items-center">
            <Image src={props.qrImage} layout="fixed" width={50} height={50} />
            <span className="italic">
              Este código QR es para uso interno de la empresa
            </span>
          </div>
        ) : (
          <span className="italic">No se ha podido generar el código QR</span>
        )}
        <div className="text-xs text-center">ID: {props.venta._id}</div>
        {props.pagoCliente.cliente.nif !== "General" && (
          <div className="flex flex-col text-center">
            <div>{props.pagoCliente.cliente.nombre} </div>
            {props.pagoCliente.cliente.nif &&
              props.pagoCliente.cliente.nif !== "General" && (
                <div>CIF: {props.pagoCliente.cliente.nif} </div>
              )}
            {props.pagoCliente.cliente.calle &&
              props.pagoCliente.cliente.calle !== "General" && (
                <div>{props.pagoCliente.cliente.calle} </div>
              )}
            {props.pagoCliente.cliente.cp &&
              props.pagoCliente.cliente.cp !== "General" && (
                <div>CP: {props.pagoCliente.cliente.cp} </div>
              )}
          </div>
        )}
        <div className="flex flex-col pb-2">
          <span className="text-center">
            Le ha atendido {props.venta.vendidoPor.nombre}
          </span>
          <span>¡Gracias por su compra! Vuelva siempre</span>
          <hr />
        </div>
      </div>
    );
  }
);

Ticket.displayName = "Ticket";

export default Ticket;

const GenerarFilaProducto = (props: {
  numFila: number;
  nombreProducto: string;
  cantidad: number;
  precio: number;
}) => {
  return (
    <div className="flex w-full">
      <div className="w-3/5 text-left">{props.nombreProducto}</div>
      <div className="w-1/5 text-center">{props.cantidad}</div>
      <div className="w-1/5 text-center">
        {(props.precio * props.cantidad).toFixed(2)}€
      </div>
    </div>
  );
};

const GetBaseImponible = (props: { productosVendidos: ProductoVendido[] }) => {
  const ivas = new Map<number, boolean>();
  for (let index = 0; index < props.productosVendidos.length; index++) {
    const prodVendido = props.productosVendidos[index];

    if (ivas.has(prodVendido.iva)) {
      continue;
    }
    ivas.set(prodVendido.iva, true);
  }

  const tiposIva = Array.from(ivas.keys());

  return (
    <div className="flex flex-col gap-1 w-full items-center justify-center">
      {tiposIva.map((iva, index) => {
        const [BImponible, valorIVA] = CalcularBaseImponiblePorIva(
          props.productosVendidos,
          iva
        );
        if (BImponible <= 0) {
          return null;
        }
        return (
          <div
            key={`BImponible-${index}`}
            className="flex justify-around w-full"
          >
            <div className="flex flex-col">
              <span>Base imp.</span>
              <span>{BImponible.toFixed(2)}€</span>
            </div>
            <div className="flex flex-col">
              <span>%IVA</span>
              <span>{iva}%</span>
            </div>
            <div className="flex flex-col">
              <span>IVA</span>
              <span>{valorIVA.toFixed(2)}€</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
