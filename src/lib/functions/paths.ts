export const GenerarGrupo = (path: string | null): string => {
  if (path == null) {
    return "Inicio";
  }

  if (path.includes("/dashboard/employees")) {
    return "Terceros";
  }
  if (path.includes("/dashboard/clients")) {
    return "Terceros";
  }
  if (path.includes("/dashboard/suppliers")) {
    return "Terceros";
  }
  if (path.includes("/dashboard/products")) {
    return "Dia a dia";
  }
  if (path.includes("/dashboard/tpv")) {
    return "Dia a dia";
  }
  if (path.includes("/dashboard/sales")) {
    return "Dia a dia";
  }
  if (path.includes("/dashboard/clousures")) {
    return "Dia a dia";
  }
  if (path.includes("/dashboard/statistics")) {
    return "Analisis";
  }

  return "Inicio";
};
