import { fail } from "@sveltejs/kit";
import { z } from "zod";

const newProductSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, { message: "El tamanyo minimo es de 3 caracteres" }),
  familia: z
    .string()
    .trim()
    .min(3, { message: "El tamanyo minimo es de 3 caracteres" }),
  proveedorId: z
    .string()
    .trim()
    .uuid({ message: "El id del proveedor debe ser un uuid" }),
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
  codigosDeBarra: z.array(
    z
      .string()
      .trim()
      .min(1, { message: "Debe de haber al menos 1 codigo de barras" })
  ),
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

    const formData = Object.fromEntries(await request.formData());
    const productData = newProductSchema.safeParse(formData);

    if (!productData.success) {
      const errors = productData.error.errors.map((error) => {
        return {
          field: error.path[0],
          message: error.message,
        };
      });

      return fail(400, { error: true, errors });
    }

    const { error } = await locals.supabase.rpc("crear_producto", {
      nombre: productData.data.nombre,
      familia: productData.data.familia,
      proveedorid: productData.data.proveedorId,
      preciocompra: productData.data.precioCompra,
      precio: productData.data.precioVenta,
      iva: productData.data.iva,
      codigos_de_barra: productData.data.codigosDeBarra,
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
