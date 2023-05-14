import { redis } from "$lib/server/redis.js";
import type { Empleado } from "$lib/types/types.js";
import { fail } from "@sveltejs/kit";
import fs from "fs";

const blobToBase64 = async (blob: Blob | null): Promise<ArrayBuffer | null> => {
  if (blob == null) {
    return null;
  }

  return blob.arrayBuffer();
};

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
  ): Promise<{ empleado: Empleado; icono: string | null }[]> => {
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
    const empleados = data as Empleado[];

    const res: {
      empleado: Empleado;
      icono: string | null;
    }[] = [];
    for await (const emp of empleados) {
      try {
        const { data } = await locals.supabase.storage
          .from("avatars")
          .download(emp.id + "/profile");

        if (!data) {
          res.push({ empleado: emp, icono: null });
          continue;
        }
        const buf = await data.arrayBuffer();
        const uint8Array = new Uint8Array(buf);
        const serialized = Array.from(uint8Array);

        res.push({
          empleado: emp,
          icono: data ? JSON.stringify(serialized) : null,
        });
      } catch (err) {
        console.log(err);
        res.push({ empleado: emp, icono: null });
      }
    }

    redis.set(redisKey, JSON.stringify(res), "EX", 60 * 10);
    return res;
  };

  return {
    status: 200,
    body: {
      empleados: getEmpleados(page, size),
    },
  };
};
