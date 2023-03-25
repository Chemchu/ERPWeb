<script lang="ts">
  let user = {
    nombre: "Gustavo Lee",
    rol: "Admin",
  };

  let path = "Inicio";
  let active = true;
</script>

<body class="bg-gray-100 dark:bg-gray-900">
  <aside
    class="fixed top-0 z-10 ml-[-100%] flex h-screen w-full flex-col justify-between border-r bg-white px-6 pb-3 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[20%] xl:w-[15%] 2xl:w-[10%] dark:bg-gray-800 dark:border-gray-700"
  >
    <div>
      <div class="-mx-6 px-6 py-4">
        <a href="/dashboard" title="home">
          <img src="images/logo.svg" class="w-32" alt="ERPWeb logo" />
        </a>
      </div>

      <div class="mt-8 text-center">
        <img
          src="https://www.pexels.com/photo/man-smiling-behind-wall-220453"
          alt="Profile photo"
          class="m-auto h-10 w-10 rounded-full object-cover lg:h-28 lg:w-28"
        />
        <h5
          class="mt-4 hidden text-xl font-semibold text-gray-600 lg:block dark:text-gray-300"
        >
          {user.nombre}
        </h5>
        <span class="hidden text-gray-400 lg:block">{user.rol}</span>
      </div>

      <ul class="mt-8 space-y-2 tracking-wide">
        <li>
          <a
            href="/dashboard"
            aria-label="dashboard"
            class="relative flex items-center space-x-4 rounded-xl px-4 py-3 text-white"
            class:bg-sky-500={active}
            class:bg-gray-500={!active}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>

            <span class="-mr-1 font-medium">Inicio</span>
          </a>
        </li>
        <li>
          <a
            href="/dashboard/tpv"
            class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <span
              class="group-hover:text-gray-700 dark:group-hover:text-gray-50"
              >TPV</span
            >
          </a>
        </li>
        <li>
          <a
            href="/dashboard/products"
            class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span
              class="group-hover:text-gray-700 dark:group-hover:text-gray-50"
              >Productos</span
            >
          </a>
        </li>
        <li>
          <a
            href="/dashboard/sales"
            class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
            <span
              class="group-hover:text-gray-700 dark:group-hover:text-gray-50"
              >Ventas</span
            >
          </a>
        </li>
        <li>
          <a
            href="/dashboard/closures"
            class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
              />
            </svg>
            <span class="group-hover:text-gray-700 dark:group-hover:text-white"
              >Cierres</span
            >
          </a>
        </li>
      </ul>
    </div>

    <div
      class="-mx-6 flex items-center justify-between border-t px-6 pt-4 dark:border-gray-700"
    >
      <button
        class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
        <span class="group-hover:text-gray-700 dark:group-hover:text-white"
          >Cerrar sesion (tilde)</span
        >
      </button>
    </div>
  </aside>
  <div class="ml-auto mb-6 lg:w-[80%] xl:w-[85%] 2xl:w-[90%]">
    <div
      class="sticky top-0 h-16 border-b bg-white dark:bg-gray-800 dark:border-gray-700 lg:py-2.5"
    >
      <div
        class="flex items-center justify-between space-x-4 px-6 2xl:container"
      >
        <h5
          hidden
          class="text-2xl font-medium text-gray-600 lg:block dark:text-white"
        >
          {path}
        </h5>
        <button
          class="-mr-2 h-16 w-12 border-r lg:hidden dark:border-gray-700 dark:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="my-auto h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div class="flex space-x-4">
          <!--search bar -->
          <div hidden class="md:block">
            <div
              class="relative flex items-center text-gray-400 focus-within:text-cyan-400"
            >
              <span
                class="absolute left-4 flex h-6 items-center border-r border-gray-300 pr-3 dark:border-gray-700"
              >
                <svg
                  xmlns="http://ww50w3.org/2000/svg"
                  class="w-4 fill-current"
                  viewBox="0 0 35.997 36.004"
                >
                  <path
                    id="Icon_awesome-search"
                    data-name="search"
                    d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                  />
                </svg>
              </span>
              <input
                type="search"
                name="leadingIcon"
                id="leadingIcon"
                placeholder="Search here"
                class="outline-none w-full rounded-xl border border-gray-300 py-2.5 pl-14 pr-4 text-sm text-gray-600 transition focus:border-cyan-300 dark:bg-gray-900 dark:border-gray-700"
              />
            </div>
          </div>
          <!--/search bar -->
          <button
            aria-label="search"
            class="h-10 w-10 rounded-xl border bg-gray-100 active:bg-gray-200 md:hidden dark:bg-gray-700 dark:border-gray-600 dark:active:bg-gray-800"
          >
            <svg
              xmlns="http://ww50w3.org/2000/svg"
              class="mx-auto w-4 fill-current text-gray-600 dark:text-gray-300"
              viewBox="0 0 35.997 36.004"
            >
              <path
                id="Icon_awesome-search"
                data-name="search"
                d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
              />
            </svg>
          </button>
          <button
            aria-label="chat"
            class="h-10 w-10 rounded-xl border bg-gray-100 active:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:active:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="m-auto h-5 w-5 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </button>
          <button
            aria-label="notification"
            class="h-10 w-10 rounded-xl border bg-gray-100 active:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:active:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="m-auto h-5 w-5 text-gray-600 dark:text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="px-6 pt-6 2xl:container">
      <div
        class="flex h-[80vh] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600"
      >
        <slot />
      </div>
    </div>
  </div>
</body>
