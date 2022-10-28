import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { In } from "../../../utils/animations";
import { Backdrop } from "../backdrop";
import { IsPositiveIntegerNumber } from "../../../utils/validator";

const ContarCaja = (props: {
  showItself: Function;
  setTotal: Function;
  desglose: Map<number, number>;
  setDesglose: Function;
}) => {
  const ContarDinero = () => {
    let t = 0;
    props.desglose.forEach((cantidad, moneda) => {
      t += cantidad * moneda;
    });

    props.setTotal(t.toFixed(2));
  };

  const LimpiarDesglose = () => {
    props.setDesglose(new Map());
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Backdrop
        onClick={(e) => {
          e.stopPropagation();
          props.showItself(false);
        }}
      >
        <motion.div
          variants={In}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col h-5/6 w-5/6 bg-white rounded-xl items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-left text-2xl w-full p-4">Contador de dinero</span>
          <div id="contadorDinero" className="flex gap-4 w-full h-full p-4 justify-around items-center">
            <div className="flex flex-col gap-2">
              <ContarMoneda valorMoneda={500} desglose={props.desglose} setDesglose={props.setDesglose} />
              <ContarMoneda valorMoneda={200} desglose={props.desglose} setDesglose={props.setDesglose} />
              <ContarMoneda valorMoneda={100} desglose={props.desglose} setDesglose={props.setDesglose} />
              <ContarMoneda valorMoneda={50} desglose={props.desglose} setDesglose={props.setDesglose} />
              <ContarMoneda valorMoneda={20} desglose={props.desglose} setDesglose={props.setDesglose} />
              <ContarMoneda valorMoneda={10} desglose={props.desglose} setDesglose={props.setDesglose} />
              <ContarMoneda valorMoneda={5} desglose={props.desglose} setDesglose={props.setDesglose} />
            </div>
            <div className="flex flex-col gap-2">
              <ContarMoneda valorMoneda={2} desglose={props.desglose} setDesglose={props.setDesglose} />
              <ContarMoneda valorMoneda={1} desglose={props.desglose} setDesglose={props.setDesglose} />
              <ContarMoneda valorMoneda={0.5} desglose={props.desglose} setDesglose={props.setDesglose} />
              <ContarMoneda valorMoneda={0.2} desglose={props.desglose} setDesglose={props.setDesglose} />
              <ContarMoneda valorMoneda={0.1} desglose={props.desglose} setDesglose={props.setDesglose} />
              <ContarMoneda valorMoneda={0.05} desglose={props.desglose} setDesglose={props.setDesglose} />
              <ContarMoneda valorMoneda={0.02} desglose={props.desglose} setDesglose={props.setDesglose} />
              <ContarMoneda valorMoneda={0.01} desglose={props.desglose} setDesglose={props.setDesglose} />
            </div>
          </div>
          <div className="flex p-4 w-full text-white gap-2 ">
            <div
              className="flex h-10 w-full m-auto bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer items-center justify-center shadow-lg"
              onClick={() => {
                props.showItself(false);
              }}
            >
              <div>Cancelar</div>
            </div>
            <div
              className="flex h-10 w-full m-auto bg-orange-500 hover:bg-orange-600 rounded-lg cursor-pointer items-center justify-center shadow-lg"
              onClick={() => {
                LimpiarDesglose();
              }}
            >
              <div>Limpiar contenido</div>
            </div>
            <div
              className="flex h-10 w-full m-auto bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer items-center justify-center shadow-lg"
              onClick={() => {
                ContarDinero();
                props.showItself(false);
              }}
            >
              <div>Aceptar</div>
            </div>
          </div>
        </motion.div>
      </Backdrop>
    </motion.div>
  );
};

const ContarMoneda = (props: { valorMoneda: number; desglose: Map<number, number>; setDesglose: Function }) => {
  const [cantidad, setCantidad] = useState<string>("");

  useEffect(() => {
    const cantidadMonedas = props.desglose.get(props.valorMoneda);

    if (cantidadMonedas) {
      setCantidad(String(cantidadMonedas));
      return;
    }

    setCantidad("");
  }, [props.desglose]);

  useEffect(() => {
    if (!cantidad) {
      const updatedMap = props.desglose;
      updatedMap.set(props.valorMoneda, 0);
      props.setDesglose(updatedMap);
      return;
    }

    const c = Number(cantidad);

    if (isNaN(c)) {
      const updatedMap = props.desglose;
      updatedMap.set(props.valorMoneda, 0);
      props.setDesglose(updatedMap);
      return;
    }

    const updatedMap = props.desglose;
    updatedMap.set(props.valorMoneda, c);
    props.setDesglose(updatedMap);
  }, [cantidad]);

  const ValueInput = (e: string) => {
    if (!IsPositiveIntegerNumber(e)) {
      return;
    }
    if (e === "") {
      setCantidad("");
      return;
    }
    if (Number(e) <= 0) {
      setCantidad("0");
      return;
    }

    setCantidad(e);
  };

  return (
    <div className="flex gap-10 items-center text-lg">
      <input
        type="text"
        className="p-1 outline-blue-500 rounded-md border border-blue-400 w-20 text-center bg-slate-100"
        value={cantidad}
        onChange={(e) => ValueInput(e.target.value)}
      />
      {props.valorMoneda}€
    </div>
  );
};

export default ContarCaja;
