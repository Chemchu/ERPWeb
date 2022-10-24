import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useEmpleadoContext from "../../../context/empleadoContext";
import { MotivoMerma } from "../../../tipos/Enums/MotivoMerma";
import { NuevaMerma } from "../../../tipos/Merma";
import { Producto } from "../../../tipos/Producto";
import { NuevoProductoMermado } from "../../../tipos/ProductoMermado";
import { In } from "../../../utils/animations";
import { AddNuevaMerma, FetchMermas } from "../../../utils/fetches/mermasFetches";
import { FetchProductos } from "../../../utils/fetches/productosFetches";
import { notifyError, notifyLoading } from "../../../utils/toastify";
import { ValidatePositiveIntegerNumber } from "../../../utils/validator";
import Dropdown from "../../elementos/Forms/dropdown";
import SimpleListBox from "../../elementos/Forms/simpleListBox";
import { Backdrop } from "../backdrop";

const AddMerma = (props: { showModal: Function; updateCallback: Function }) => {
  const { Empleado } = useEmpleadoContext();
  const [NuevaMerma, setNuevaMerma] = useState<NuevaMerma>({
    empleadoId: Empleado._id,
    productos: [],
  });
  const [isCreandoMerma, setIsCreandoMerma] = useState<boolean>(false);

  const CrearMerma = async (Merm: NuevaMerma | undefined) => {
    if (!Merm) {
      notifyError("Error con la merma");
      return;
    }

    setIsCreandoMerma(true);
    notifyLoading(AddNuevaMerma(Merm), "Añadiendo merma...", () => {
      setIsCreandoMerma(false);
      props.updateCallback();
      props.showModal(false);
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Backdrop
        onClick={(e) => {
          e.stopPropagation();
          props.showModal(false);
        }}
      >
        <motion.div
          className="h-5/6 w-5/6 flex flex-col gap-10 items-center bg-white rounded-2xl p-4"
          onClick={(e) => e.stopPropagation()}
          variants={In}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex flex-col w-full h-full text-left ">
            <div className="h-5/6">
              <span className="h-auto text-xl xl:text-3xl cursor-default">Añadir nueva merma</span>
              <NuevaMermaForm setMerma={setNuevaMerma} />
            </div>

            <div className="flex w-full h-1/6 items-end justify-around text-white gap-10">
              <button
                className="h-10 w-full rounded-xl bg-red-500 hover:bg-red-600 shadow-lg"
                onClick={() => props.showModal(false)}
              >
                Cancelar
              </button>
              {isCreandoMerma ? (
                <button disabled={true} className={`bg-blue-400 h-10 w-full rounded-xl shadow-lg`}>
                  Creando merma...
                </button>
              ) : (
                <button
                  disabled={!(NuevaMerma.productos.length > 0)}
                  className={`${
                    NuevaMerma.productos.length > 0 ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-400"
                  } h-10 w-full rounded-xl shadow-lg`}
                  onClick={async () => {
                    await CrearMerma(NuevaMerma);
                  }}
                >
                  Crear merma
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </Backdrop>
    </motion.div>
  );
};

const NuevaMermaForm = (props: { setMerma: Function }) => {
  const [isMounted, setMounted] = useState<boolean>(false);
  const [Productos, setProductos] = useState<Producto[]>([]);
  const [ProductosSeleccionados, setProductosSeleccionados] = useState<Producto[]>([]);
  const [ProductosMermados, setProductosMermados] = useState<NuevoProductoMermado[] & { index?: number }>([]);
  const [ProductoSeleccionado, setProductoSeleccionado] = useState<string>("");

  useEffect(() => {
    try {
      const GetData = async () => {
        setProductos(await FetchProductos());
        setMounted(true);
      };
      GetData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    setProductosMermados((prev: NuevoProductoMermado[]) => {
      return ProductosSeleccionados.map((p) => {
        const productoMermado = prev.find((pMermado) => p._id === pMermado._id);
        if (productoMermado) {
          return {
            _id: p._id,
            cantidad: Number(productoMermado.cantidad),
            motivo: productoMermado.motivo,
          } as NuevoProductoMermado;
        }

        return {
          _id: p._id,
          cantidad: 1,
          motivo: MotivoMerma.Rotura.toString(),
        } as NuevoProductoMermado;
      });
    });
  }, [ProductosSeleccionados]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }
    if (!ProductoSeleccionado) {
      return;
    }

    const prodMermado = Productos.find((p) => ProductoSeleccionado === p.nombre || ProductoSeleccionado === p.ean);

    if (prodMermado) {
      setProductosSeleccionados((prev) => [...prev, prodMermado]);
      setProductoSeleccionado("");
    }
  }, [ProductoSeleccionado]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    props.setMerma((prev: NuevaMerma) => {
      return {
        empleadoId: prev.empleadoId,
        productos: ProductosMermados,
      } as NuevaMerma;
    });
  }, [ProductosMermados]);

  const HandleDelete = (id: number) => {
    setProductosSeleccionados((productosMermados) =>
      productosMermados.filter((p, i) => {
        return id !== i;
      })
    );
  };

  const HandleProductosMermados = (index: number, cantidad: number, motivo: string) => {
    setProductosMermados((prev) => {
      let p = prev[index];
      if (!p) {
        return prev;
      }

      p.cantidad = Number(cantidad);
      p.motivo = motivo;
      prev[index] = p;
      return [...prev];
    });
  };

  return (
    <main className="w-full h-full">
      <section className="flex flex-col gap-2 w-full h-full">
        <span>Buscar producto</span>
        <div className="flex items-center gap-2 justify-center">
          <Dropdown
            elementos={Productos.map((p) => p.nombre).concat(Productos.map((p) => p.ean))}
            selectedElemento={ProductoSeleccionado || ""}
            setElemento={setProductoSeleccionado}
            autoSelect
          />
        </div>
        <div className="w-full h-full border-gray-300 rounded-lg border overflow-hidden">
          {ProductosSeleccionados.length > 0 ? (
            <ol className="h-full overflow-y-scroll">
              {ProductosSeleccionados.map((p, index) => {
                return (
                  <FilaMerma
                    key={index}
                    index={index}
                    productoMermado={p}
                    handleProductosMermados={HandleProductosMermados}
                    handleDelete={HandleDelete}
                  />
                );
              })}
            </ol>
          ) : (
            <span className="flex items-center justify-center w-full h-full text-2xl font-thin">
              No hay productos en la lista de mermas
            </span>
          )}
        </div>
      </section>
    </main>
  );
};

const FilaMerma = (props: {
  index: number;
  productoMermado: Producto;
  handleProductosMermados: Function;
  handleDelete: Function;
}) => {
  const [cantidad, setCantidad] = useState<string>("1");
  const [motivo, setMotivo] = useState<String>(MotivoMerma.Rotura.toString());

  useEffect(() => {
    props.handleProductosMermados(props.index, cantidad, motivo);
  }, [cantidad, motivo]);

  const CambiarCantidad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cantidad = ValidatePositiveIntegerNumber(event.target.value);

    if (cantidad !== "" && Number(cantidad) <= 0) {
      props.handleDelete(props.index);
    }
    setCantidad(cantidad);
  };

  return (
    <li className="flex gap-1 w-full h-auto items-center hover:bg-gray-300 p-2 border-b">
      <span className="w-2/6">{props.productoMermado.nombre}</span>
      <span className="w-1/6">{props.productoMermado.familia}</span>
      <div className="w-1/6 flex justify-center">
        <input
          type="text"
          onChange={CambiarCantidad}
          value={cantidad}
          className="rounded-lg border border-gray-300 focus:outline-blue-500 px-2 py-1 w-12 text-center"
        />
      </div>

      <div className="flex items-center justify-around w-2/6 gap-2">
        <SimpleListBox
          elementos={[
            MotivoMerma.Rotura.toString(),
            MotivoMerma.Caducidad.toString(),
            MotivoMerma.Robo.toString(),
            MotivoMerma.Otro.toString(),
          ]}
          setElemento={setMotivo}
          defaultValue={motivo.toString()}
        />
        <div className="flex h-full justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:stroke-red-500 cursor-pointer"
            onClick={() => props.handleDelete(props.index)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </li>
  );
};

export default AddMerma;
