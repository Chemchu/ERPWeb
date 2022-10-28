import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);
setDefaultLocale("es");

const DateRange = (props: {
  titulo?: string;
  disabled?: boolean;
  startDate: Date | null;
  endDate: Date | null;
  dateRange: Date[] | null[];
  setDateRange: Function;
  isClearable?: boolean;
}) => {
  const updateDate = (fechas: Date[]): Date[] => {
    if (fechas[1] !== null) {
      const f = fechas[1];
      f.setHours(f.getHours() + 24);

      return [fechas[0], f];
    }

    return fechas;
  };

  return (
    <div className="flex gap-2">
      {props.titulo && <span className="self-center">{props.titulo || "Fecha"}</span>}
      <DatePicker
        disabled={props.disabled}
        className="w-44 sm:w-52 xl:w-60 rounded-lg border shadow-lg py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        selectsRange={true}
        dateFormat="dd/MM/yyyy"
        startDate={props.startDate}
        endDate={props.endDate}
        onChange={(update: any) => {
          props.setDateRange(updateDate(update));
        }}
        isClearable={props.isClearable || true}
      />
    </div>
  );
};

export default DateRange;
