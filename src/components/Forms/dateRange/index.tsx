import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRange = () => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    const locale = {
        localize: {
            day: (n: number) => days[n],
            month: (n: number) => months[n]
        },
        formatLong: {
            date: () => "dd/MM/yyyy"
        }
    } as Locale

    return (
        <div className="flex gap-2">
            <span className="self-center">
                Fecha
            </span>
            <DatePicker
                className="rounded-lg border shadow-lg py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                locale={locale}
                selectsRange={true}
                dateFormat="dd/MM/yyyy"
                startDate={startDate}
                endDate={endDate}
                onChange={(update: any) => {
                    setDateRange(update);
                }}
            />
        </div>
    );
};

export default DateRange;