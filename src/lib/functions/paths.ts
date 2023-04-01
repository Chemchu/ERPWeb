export const GenerarGrupo = (path: string | null): string => {
  if (path == null) {
    return "Inicio";
  }

  switch (path) {
    case "/dashboard/employees":
      return "Terceros";
    case "/dashboard/clients":
      return "Terceros";
    case "/dashboard/suppliers":
      return "Terceros";
    case "/dashboard/products":
      return "Dia a dia";
    case "/dashboard/tpv":
      return "Dia a dia";
    case "/dashboard/sales":
      return "Dia a dia";
    case "/dashboard/closures":
      return "Dia a dia";
    case "/dashboard/statistics":
      return "Analisis";

    default:
      return "Inicio";
  }
};
