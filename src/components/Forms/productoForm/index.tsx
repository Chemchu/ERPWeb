import { useEffect, useState } from "react";
import { Producto } from "../../../tipos/Producto";
import { IsValidProduct, ValidatePositiveFloatingNumber, ValidatePositiveIntegerNumber } from "../../../utils/validator";

const ProductoForm = (props: { setProducto: Function, producto?: Producto, setHayCambios?: Function }) => {
    const [Nombre, setNombre] = useState<string>(props.producto?.nombre || "");
    const [Familia, setFamilia] = useState<string>(props.producto?.familia || "");
    const [Proveedor, setProveedor] = useState<string>(props.producto?.proveedor || "");
    const [Ean, setEan] = useState<string>(props.producto?.ean || "");
    const [PrecioCompra, setPrecioCompra] = useState<string>(props.producto?.precioCompra ? props.producto?.precioCompra.toFixed(2) : "");
    const [PrecioVenta, setPrecioVenta] = useState<string>(props.producto?.precioVenta ? props.producto?.precioVenta.toFixed(2) : "");
    const [Iva, setIva] = useState<string>(props.producto?.iva ? props.producto?.iva.toFixed(2) : "");
    const [Margen, setMargen] = useState<string>(props.producto?.margen ? props.producto?.margen.toFixed(2) : "");
    const [Cantidad, setCantidad] = useState<string>(props.producto?.cantidad ? String(props.producto?.cantidad) : "");
    const [CantidadReestock, setCantidadReestock] = useState<string>(props.producto?.cantidadRestock ? String(props.producto?.cantidadRestock) : "");

    useEffect(() => {
        const p: Producto = {
            _id: "Creando",
            alta: true,
            nombre: Nombre,
            familia: Familia,
            cantidad: Number(Cantidad),
            cantidadRestock: Number(CantidadReestock),
            ean: Ean,
            precioCompra: Number(PrecioCompra),
            precioVenta: Number(PrecioVenta),
            iva: Number(Iva),
            margen: Number(Margen),
            proveedor: Proveedor
        }
        props.setProducto(p);

    }, [Nombre, Familia, Proveedor, Ean, Cantidad, CantidadReestock, PrecioVenta]);

    useEffect(() => {
        if (!PrecioCompra || isNaN(Number(PrecioCompra))) { setPrecioVenta(""); return; }
        if (!Iva || isNaN(Number(Iva))) { setPrecioVenta(""); return; }
        if (!Margen || isNaN(Number(Margen))) { setPrecioVenta(""); return; }

        const precioCompra = Number(PrecioCompra);
        const iva = precioCompra * (Number(Iva) / 100);
        const margen = (precioCompra + iva) * (Number(Margen) / 100);
        const precioVenta = (precioCompra + iva + margen).toFixed(2);

        setPrecioVenta(precioVenta);
    }, [PrecioCompra, Iva, Margen]);

    return (
        <form className="flex gap-10 w-full pt-10">
            <div className="flex flex-col gap-4 w-1/2 h-full ">
                <div className="w-full">
                    {
                        props.producto ?
                            <>
                                <label className="block tracking-wide text-gray-700 font-bold">
                                    ID
                                </label>
                                <input disabled className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Por ejemplo `Bocadillo chorizo`"
                                    value={props.producto._id} />
                            </>
                            :
                            <>
                                <label className="block tracking-wide text-gray-700 font-bold">
                                    Nombre del producto
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ring-blue-500" type="text" placeholder="Por ejemplo `Bocadillo chorizo`"
                                    value={Nombre} onChange={(e) => { setNombre(e.target.value); props.setHayCambios && props.setHayCambios(true); }} />
                            </>
                    }

                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Familia
                    </label>
                    <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Por ejemplo `Bolleria salada`"
                        value={Familia} onChange={(e) => { setFamilia(e.target.value); props.setHayCambios && props.setHayCambios(true); }} />
                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Proveedor
                    </label>
                    <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Nombre del proveedor del producto"
                        value={Proveedor} onChange={(e) => { setProveedor(e.target.value); props.setHayCambios && props.setHayCambios(true); }} />
                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Código EAN
                    </label>
                    <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="ID numérico de trece dígitos"
                        value={Ean} onChange={(e) => { setEan(e.target.value); props.setHayCambios && props.setHayCambios(true); }} />
                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Cantidad
                    </label>
                    <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="ID numérico de trece dígitos"
                        value={Cantidad} onChange={(e) => { setCantidad(ValidatePositiveIntegerNumber(e.target.value)); props.setHayCambios && props.setHayCambios(true); }} />
                </div>
            </div>
            <div className="flex flex-col gap-4 w-1/2">
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Precio de compra
                    </label>
                    <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Precio de compra por unidad"
                        value={PrecioCompra} onChange={(e) => { setPrecioCompra(ValidatePositiveFloatingNumber(e.target.value)); props.setHayCambios && props.setHayCambios(true); }} />
                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold" >
                        IVA
                    </label>
                    <div className="flex gap-2 items-center">
                        <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="IVA del producto"
                            value={Iva} onChange={(e) => { setIva(ValidatePositiveFloatingNumber(e.target.value)); props.setHayCambios && props.setHayCambios(true); }} />
                        <span>%</span>
                    </div>
                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Margen
                    </label>
                    <div className="flex gap-2 items-center">
                        <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="Margen de beneficio"
                            value={Margen} onChange={(e) => { setMargen(ValidatePositiveFloatingNumber(e.target.value)); props.setHayCambios && props.setHayCambios(true); }} />
                        <span>%</span>
                    </div>
                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Precio de venta
                    </label>
                    <input disabled className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text"
                        value={PrecioVenta} />
                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Cantidad de reestock
                    </label>
                    <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="ID numérico de trece dígitos"
                        value={CantidadReestock} onChange={(e) => { setCantidadReestock(ValidatePositiveIntegerNumber(e.target.value)); props.setHayCambios && props.setHayCambios(true); }} />
                </div>
            </div>
        </form>

    )
}

export default ProductoForm;