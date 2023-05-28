import { RouteNestedLevels } from "$lib/enums/nestedLevels";

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
  if (path.includes("/dashboard/settings")) {
    return "Ajustes";
  }

  return "Inicio";
};

export const GetNestedLevel = (path: string | null): RouteNestedLevels => {
  if (path == null) {
    throw "Path is null";
  }

  const level = path.split("/").length - 2;

  if (level >= 2) {
    return RouteNestedLevels.Page;
  }
  if (level == 1) {
    return RouteNestedLevels.Group;
  }

  return RouteNestedLevels.Root;
};

export const checkPathsSameGroup = (
  previousPath: string,
  currentPath: string
): boolean => {
  if (previousPath == null) {
    return false;
  }
  if (currentPath == null) {
    return false;
  }

  console.log("previousPath:" + previousPath);
  console.log("currentPath:" + currentPath);

  if (
    previousPath.includes(currentPath) ||
    currentPath.includes(previousPath)
  ) {
    return true;
  }

  return false;
};
