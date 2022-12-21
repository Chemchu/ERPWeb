import { endOfDay, startOfDay } from "date-fns";
import { Venta } from "../../tipos/Venta";
import { GetDaysBetweenDateRange } from "../date_functions";
import { notifyError } from "../toastify";
import { FetchVentasByDateRange } from "./ventasFetches";

export const FetchChunkedSalesBetweenDates = async (
  initDate: Date,
  finalDate: Date,
  setProgress?: React.Dispatch<React.SetStateAction<number>>
): Promise<Venta[]> => {
  try {
    const diasEntreFechas = GetDaysBetweenDateRange(initDate, finalDate);
    let ventas: Venta[] = [];
    for (let index = 0; index < diasEntreFechas.length; index++) {
      const dia = diasEntreFechas[index];
      const ventasDelDia: Venta[] = await FetchVentasByDateRange(
        startOfDay(dia),
        endOfDay(dia)
      );
      ventas = [...ventas, ...ventasDelDia];

      if (setProgress) {
        setProgress(() => {
          const num = 100 * ((index + 1) / diasEntreFechas.length);
          return Math.round(num * 100) / 100;
        });
      }
    }
    return ventas;
  } catch (err) {
    notifyError(`${err}`);
    return [];
  }
};
