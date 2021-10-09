function ReportCard(props) {
    const flechaArriba = "M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z";
    const flechaAbajo = "M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" ;

    return(
        <div className="flex items-center p-4 bg-white rounded">
            <div className={`flex flex-shrink-0 items-center justify-center ${props.porcentaje > 0 ? "text-green-200" : "text-red-200"} h-16 w-16 rounded`}>
                <svg className={`w-6 h-6 fill-current ${props.porcentaje > 0 ? "text-green-700" : "text-red-700"}`}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d={props.porcentaje > 0 ? flechaArriba : flechaAbajo}
                    clip-rule="evenodd" />
                </svg>
            </div>
            <div className="flex-grow flex flex-col ml-4">
                <span className="text-xl font-bold">{props.valor}</span>
                <div className="flex items-center justify-between">
                    <span className="text-gray-500">{props.descripcionReport}</span>
                    <span className={`${props.porcentaje > 0 ? "text-green-500" : "text-red-500"} text-sm font-semibold ml-2`}>{props.porcentaje}</span>
                </div>
            </div>
        </div>
    );
}

export default ReportCard;