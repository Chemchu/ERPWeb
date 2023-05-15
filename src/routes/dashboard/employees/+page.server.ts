import { redis } from "$lib/server/redis.js";
import type { Empleado } from "$lib/types/types.js";
import { fail } from "@sveltejs/kit";

export const load = async ({ url, locals, setHeaders }) => {
  const session = await locals.supabase.auth.getSession();
  if (!session.data.session) {
    return fail(401, {
      error: true,
      message: "Unauthorized",
    });
  }

  let page = url.searchParams.get("page");
  let size = url.searchParams.get("size");

  page = page ? page : "1";
  size = size ? size : "10";

  const getEmpleados = async (
    page: string,
    size: string
  ): Promise<Empleado[]> => {
    const pagina = Number(page);
    const tamanyo = Number(size);
    const redisKey = `empleados-page${pagina}-size${tamanyo}`;

    const cached = await redis.get(redisKey);
    if (cached) {
      const ttl = await redis.ttl(redisKey);
      setHeaders({ "cache-control": `max-age=${ttl}` });
      return JSON.parse(cached);
    }

    const { data, error } = await locals.supabase
      .from("empleados")
      .select("*")
      .range(pagina * tamanyo - tamanyo, pagina * tamanyo);

    if (error) {
      console.log(error);
    }
    return data as Empleado[];
  };

  const getIconos = async (
    page: string,
    size: string
  ): Promise<(string | null)[]> => {
    const pagina = Number(page);
    const tamanyo = Number(size);
    const redisKey = `empleados-icons-page${pagina}-size${tamanyo}`;

    const cached = await redis.get(redisKey);
    if (cached) {
      const ttl = await redis.ttl(redisKey);
      setHeaders({ "cache-control": `max-age=${ttl}` });
      return JSON.parse(cached);
    }

    const empleados = await getEmpleados(page, size);

    const iconos: (string | null)[] = [];
    for await (const emp of empleados) {
      try {
        const { data } = await locals.supabase.storage
          .from("avatars")
          .download(emp.id + "/profile");

        if (!data) {
          iconos.push(null);
          continue;
        }
        const buf = await data.arrayBuffer();
        const uint8Array = new Uint8Array(buf);
        const serialized = Array.from(uint8Array);

        iconos.push(data ? JSON.stringify(serialized) : null);
      } catch (err) {
        console.log(err);
        iconos.push(null);
      }
    }

    redis.set(redisKey, JSON.stringify(iconos), "EX", 60 * 10);
    return iconos;
  };

  return {
    status: 200,
    body: {
      empleados: getEmpleados(page, size),
      iconos: getIconos(page, size),
    },
  };
};
