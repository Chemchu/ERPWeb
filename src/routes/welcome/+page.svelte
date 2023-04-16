<div
  class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
>
  <div class="w-full max-w-md space-y-8">
    <div>
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >
        Ya casi estamos!
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Por favor, crea tu contraseña para continuar.
      </p>
    </div>
    <form class="mt-8 space-y-6" action="?/createPassword" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="password" class="sr-only">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Contraseña"
          />
        </div>
        <div>
          <label for="repeat-password" class="sr-only">Repetir contraseña</label
          >
          <input
            id="repeat-password"
            name="repeat-password"
            type="password"
            autocomplete="current-password"
            required
            class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Repetir contraseña"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          Crear contraseña
        </button>
      </div>
    </form>
  </div>
</div>
