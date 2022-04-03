import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es);
setDefaultLocale('es');

const DateRange = (props: { startDate: Date | null, endDate: Date | null, dateRange: Date[] | null[], setDateRange: Function, isClearable?: boolean }) => {
    return (
        <div className="flex gap-2">
            <span className="self-center">
                Fecha
            </span>
            <DatePicker
                className="w-40 xl:w-60 rounded-lg border shadow-lg py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                selectsRange={true}
                dateFormat="dd/MM/yyyy"
                startDate={props.startDate}
                endDate={props.endDate}
                onChange={(update: any) => { props.setDateRange(update); }}
                isClearable={props.isClearable || true}
            />
        </div>
    );
};

export default DateRange;