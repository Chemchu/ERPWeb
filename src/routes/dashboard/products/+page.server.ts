import {
  getFamilias,
  getProveedores,
} from "$lib/functions/backendFunctions.js";
import { fail } from "@sveltejs/kit";
import { z } from "zod";

const codigosDeBarraSchema = z.array(
  z.string().min(1, { message: "Debe de haber al menos 1 codigo de barras" })
);

const productSchema = z.object({
  nombreProducto: z
    .string()
    .trim()
    .min(3, { message: "El tamanyo minimo es de 3 caracteres" }),
  familiaProducto: z
    .string()
    .trim()
    .min(3, { message: "El tamanyo minimo es de 3 caracteres" }),
  proveedorId: z
    .string()
    .trim()
    .uuid({ message: "El id del proveedor debe ser un uuid" })
    .optional(),
  precioCompra: z.preprocess(
    Number,
    z
      .number()
      .refine((precioCompra) => !Number.isNaN(precioCompra), {
        message: "El precio de compra debe ser un numero",
      })
      .refine((precioCompra) => Number(precioCompra) > 0, {
        message: "El precio de compra debe ser superior a 0",
      })
  ),
  precioVenta: z.preprocess(
    Number,
    z
      .number()
      .refine((precioVenta) => !Number.isNaN(precioVenta), {
        message: "El precio de venta debe ser un numero",
      })
      .refine((precioVenta) => Number(precioVenta) > 0, {
        message: "El precio de venta debe ser superior a 0",
      })
  ),
  iva: z.preprocess(
    Number,
    z
      .number()
      .min(0, { message: "El IVA no puede ser inferior al 0%" })
      .max(100, { message: "El IVA no puede ser superior al 100%" })
  ),
  cantidad: z.preprocess(
    Number,
    z.number().min(0, { message: "La cantidad no puede ser inferior a 0" })
  ),
});

const margen = (
  precioCompra: number,
  precioVenta: number,
  iva: number
): number => {
  const precioCompraConIva =
    Number(precioCompra) + Number(precioCompra) * (Number(iva) / 100);

  return (
    ((Number(precioVenta) - precioCompraConIva) / precioCompraConIva) * 100 || 0
  );
};

export const actions = {
  createProduct: async ({ request, locals }) => {
    const session = await locals.supabase.auth.getSession();
    if (!session.data.session) {
      return {
        status: 401,
        body: {
          message: "Unauthorized",
        },
      };
    }

    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const entries = [...formData.entries()];
    const codigosDeBarra: string[] = [];
    for (const [key, value] of entries) {
      if (key.startsWith("codigosDeBarras[")) {
        try {
          const index = Number(key.match(/\[(\d+)\]/)![1]);
          if (index == 0) {
            codigosDeBarra[0] = (value as string) || "";
          } else {
            codigosDeBarra[index] = (value as string) || "";
          }
        } catch (e) {
          continue;
        }
      }
    }

    let productData = productSchema.safeParse(data);
    let codigosDeBarraData = codigosDeBarraSchema.safeParse(
      codigosDeBarra.filter((codigo) => codigo !== "")
    );

    if (!productData.success) {
      const errors = productData.error.errors.map((error) => {
        return {
          field: error.path[0],
          message: error.message,
        };
      });

      return fail(400, { error: true, errors });
    }

    if (!codigosDeBarraData.success) {
      const errors = codigosDeBarraData.error.errors.map((error) => {
        return {
          field: error.path[0],
          message: error.message,
        };
      });

      return fail(400, { error: true, errors });
    }

    const { error } = await locals.supabase.rpc("crear_producto", {
      nombre: productData.data.nombreProducto,
      familia: productData.data.familiaProducto,
      proveedorid: productData.data.proveedorId,
      preciocompra: productData.data.precioCompra,
      precio: productData.data.precioVenta,
      iva: productData.data.iva,
      codigos_de_barra: codigosDeBarraData.data,
      cantidad: productData.data.cantidad,
      margen: margen(
        productData.data.precioCompra,
        productData.data.precioVenta,
        productData.data.iva
      ),
    });

    if (error) {
      console.log(error);
      return fail(400, { error: true, message: error.message });
    }

    return {
      status: 200,
      error: false,
      message: "Producto creado correctamente",
    };
  },
};

export const load = async ({ locals }) => {
  const session = await locals.supabase.auth.getSession();
  if (!session.data.session) {
    return fail(401, {
      error: true,
      message: "Unauthorized",
    });
  }

  const proveedores = await getProveedores(locals.supabase);
  const familias = await getFamilias(locals.supabase);

  return {
    status: 200,
    body: {
      proveedores,
      familias,
    },
  };
};
