<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="min-h-full">
  <main>
    <!-- Page header -->
    <div
      class="mx-auto max-w-3xl md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl"
    >
      <div class="flex items-center space-x-5">
        <div class="flex-shrink-0">
          <div class="relative">
            <img
              class="h-16 w-16 rounded-full"
              src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
              alt=""
            />
            <span
              class="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            />
          </div>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">
            {data.props.empleado.nombre}
          </h1>
          <p class="text-sm font-medium text-gray-500">
            Trabajando como {data.props.empleado.rol.toLocaleLowerCase()} desde
            <time datetime="2020-08-25"
              >{new Date(data.props.empleado.created_at).toLocaleDateString()}
            </time>
          </p>
        </div>
      </div>
    </div>

    <div
      class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3"
    >
      <div class="space-y-6 lg:col-span-2 lg:col-start-1">
        <!-- Description list-->
        <section aria-labelledby="applicant-information-title">
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h2
                id="applicant-information-title"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Información Personal
              </h2>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Datos personales del empleado.
              </p>
            </div>
            <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">
                    Nombre completo
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {`${data.props.empleado.nombre} ${data.props.empleado.apellidos}`}
                  </dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">
                    Correo electrónico
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {data.props.empleado.email}
                  </dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">
                    Documento de identidad
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {data.props.empleado.dni || "No registrado"}
                  </dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">Rol</dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {data.props.empleado.rol}
                  </dd>
                </div>
                <div class="sm:col-span-2">
                  <dt class="text-sm font-medium text-gray-500">
                    Sobre el empleado
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                    incididunt cillum culpa consequat. Excepteur qui ipsum
                    aliquip consequat sint. Sit id mollit nulla mollit nostrud
                    in ea officia proident. Irure nostrud pariatur mollit ad
                    adipisicing reprehenderit deserunt qui eu.
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <a
                href="#"
                class="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg"
                >Read full application</a
              >
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</div>
