import { fail } from "@sveltejs/kit";
import { z } from "zod";

const codigosDeBarraSchema = z.array(
  z
    .string()
    .array()
    .min(1, { message: "Debe de haber al menos 1 codigo de barras" })
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
  precioCompra: z
    .number()
    .min(0, { message: "El precio de compra no puede ser inferior a 0" }),
  precioVenta: z
    .number()
    .min(0, { message: "El precio de venta no puede ser inferior a 0" }),
  iva: z
    .number()
    .min(0, { message: "El IVA no puede ser inferior al 0%" })
    .max(100, { message: "El IVA no puede ser superior al 100%" }),
  cantidad: z
    .number()
    .min(0, { message: "La cantidad no puede ser inferior a 0" }),
  margen: z
    .number()
    .min(0, { message: "El margen no puede ser inferior al 0%" }),
});

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
        const index = Number(key.match(/\[(\d+)\]/)![1]);
        codigosDeBarra[index] = value as string;
      }
    }

    console.log(data);

    let productData = productSchema.safeParse(data);

    if (!productData.success) {
      const errors = productData.error.errors.map((error) => {
        return {
          field: error.path[0],
          message: error.message,
        };
      });

      console.log(errors);
      return fail(400, { error: true, errors });
    }

    console.log(productData.data);

    const { error } = await locals.supabase.rpc("crear_producto", {
      nombre: productData.data.nombreProducto,
      familia: productData.data.familiaProducto,
      proveedorid: productData.data.proveedorId || undefined,
      preciocompra: productData.data.precioCompra,
      precio: productData.data.precioVenta,
      iva: productData.data.iva,
      codigos_de_barra: codigosDeBarra,
      cantidad: productData.data.cantidad,
      margen: productData.data.margen,
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
    return {
      status: 401,
      body: {
        message: "Unauthorized",
      },
    };
  }

  const { data: proveedorData, error: proveedorError } = await locals.supabase
    .from("proveedores")
    .select("*");

  if (proveedorError) {
    console.log(proveedorError);
    return fail(400, {
      body: {
        error: true,
        message: proveedorError.message,
      },
    });
  }

  const { data: familiaData, error: familiaError } = await locals.supabase.rpc(
    "get_familia_enum_values"
  );

  if (familiaError) {
    console.log(familiaError);
    return fail(400, { body: { error: true, message: familiaError.message } });
  }

  return {
    status: 200,
    body: {
      data: {
        proveedores: proveedorData,
        familias: familiaData,
      },
    },
  };
};
