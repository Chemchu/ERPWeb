import { useEffect, useState } from "react";
import { Producto } from "../../../../tipos/Producto";
import { ValidatePositiveFloatingNumber, ValidatePositiveIntegerNumber } from "../../../../utils/validator";
import Toggle from "../../botones/toggle";

const ProductoForm = (props: { setProducto: Function, producto?: Producto, setHayCambios?: Function }) => {
    const [Nombre, setNombre] = useState<string>(props.producto?.nombre || "");
    const [Familia, setFamilia] = useState<string>(props.producto?.familia || "");
    const [Proveedor, setProveedor] = useState<string>(props.producto?.proveedor || "");
    const [Ean, setEan] = useState<string>(props.producto?.ean || "");
    const [PrecioCompra, setPrecioCompra] = useState<string>(props.producto?.precioCompra ? props.producto?.precioCompra.toFixed(2) : "");
    const [PrecioVenta, setPrecioVenta] = useState<string>(props.producto?.precioVenta ? props.producto?.precioVenta.toFixed(2) : "");
    const [Iva, setIva] = useState<string>(props.producto?.iva ? props.producto?.iva.toFixed(2) : "");
    const [Alta, setAlta] = useState<boolean>(props.producto?.alta !== undefined ? props.producto?.alta : true);
    const [Margen, setMargen] = useState<string>(props.producto?.margen ? props.producto?.margen.toFixed(2) : "");
    const [Cantidad, setCantidad] = useState<string>(props.producto?.cantidad ? String(props.producto?.cantidad) : "0");
    const [CantidadReestock, setCantidadReestock] = useState<string>(props.producto?.cantidadRestock ? String(props.producto?.cantidadRestock) : "0");

    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        if (!isMounted) {
            props.setProducto(props.producto);
            setIsMounted(true)
        }
    }, [])

    useEffect(() => {
        if (!isMounted) { return; }

        let margen = Margen;
        if (Number(margen) === Infinity) {
            margen = "100"
        }

        const p: Producto = {
            _id: "Creando",
            alta: Alta,
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
        props.setHayCambios && props.setHayCambios(true)

    }, [Nombre, Familia, Proveedor, Ean, Cantidad, CantidadReestock, Margen, Alta]);

    useEffect(() => {
        if (!isMounted) { return; }

        if (!PrecioCompra || isNaN(Number(PrecioCompra))) { setPrecioCompra(""); return; }
        if (!Iva || isNaN(Number(Iva))) { setIva(""); return; }
        if (!PrecioVenta || isNaN(Number(PrecioVenta))) { setPrecioVenta(""); return; }

        const precioCompra = Number(PrecioCompra);
        const precioConIva = precioCompra + precioCompra * (Number(Iva) / 100)
        let margen = ((Number(PrecioVenta) - precioConIva) / precioConIva) * 100

        if (margen === Infinity) {
            margen = 100
        }

        setMargen(margen.toFixed(2));
    }, [PrecioCompra, Iva, PrecioVenta]);

    return (
        <form className="flex gap-10 w-full h-full text-sm xl:text-base">
            <div className="flex flex-col gap-2 w-1/2 h-full">
                <div className="w-full">
                    {
                        props.producto ?
                            <>
                                <label className="block tracking-wide text-gray-700 font-bold">
                                    ID
                                </label>
                                <input disabled className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-2 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Por ejemplo `Bocadillo chorizo`"
                                    value={props.producto._id} />
                            </>
                            :
                            <>
                                <label className="block tracking-wide text-gray-700 font-bold">
                                    Nombre del producto
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-2 leading-tight focus:outline-none focus:bg-white ring-blue-500" type="text" placeholder="Por ejemplo `Bocadillo chorizo`"
                                    value={Nombre} onChange={(e) => { setNombre(e.target.value); }} />
                            </>
                    }

                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Familia
                    </label>
                    <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Por ejemplo `Bolleria salada`"
                        value={Familia} onChange={(e) => { setFamilia(e.target.value); }} />
                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Proveedor
                    </label>
                    <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border rounded p-2 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Nombre del proveedor del producto"
                        value={Proveedor} onChange={(e) => { setProveedor(e.target.value); }} />
                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Código EAN
                    </label>
                    <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="ID numérico de trece dígitos"
                        value={Ean} onChange={(e) => { setEan(e.target.value); }} />
                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Cantidad
                    </label>
                    <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Cantidad en stock"
                        value={Cantidad} onChange={(e) => { setCantidad(ValidatePositiveIntegerNumber(e.target.value)); }} />
                </div>
                <div className="w-full py-2">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        De alta
                    </label>
                    <Toggle initialValue={Alta} setBooleanValue={setAlta} />
                </div>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Precio de compra
                    </label>
                    <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Precio de compra por unidad"
                        value={PrecioCompra} onChange={(e) => { setPrecioCompra(ValidatePositiveFloatingNumber(e.target.value)); }} />
                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold" >
                        IVA
                    </label>
                    <div className="flex gap-2 items-center">
                        <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="IVA del producto"
                            value={Iva} onChange={(e) => { setIva(ValidatePositiveFloatingNumber(e.target.value)); }} />
                        <span>%</span>
                    </div>
                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Precio de venta
                    </label>
                    <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="Precio de venta al público"
                        value={PrecioVenta} onChange={(e) => { setPrecioVenta(ValidatePositiveFloatingNumber(e.target.value)); }} />
                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Margen
                    </label>
                    <div className="flex gap-2 items-center">
                        <input disabled className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="Margen de beneficio"
                            value={Margen} />
                        <span>%</span>
                    </div>
                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Cantidad de reestock
                    </label>
                    <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Cantidad mínima recomendada en stock"
                        value={CantidadReestock} onChange={(e) => { setCantidadReestock(ValidatePositiveIntegerNumber(e.target.value)); }} />
                </div>
            </div>
        </form>

    )
}

export default ProductoForm;