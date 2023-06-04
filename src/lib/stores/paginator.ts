import { writable } from "svelte/store";

export interface PaginatorFilter {
  range: { start: number; length: number; elementsPerPage: number };
  currentPage: number;
  numberOfPages: number;
}

function createPaginator() {
  const { subscribe, update } = writable<PaginatorFilter>({
    range: { start: 1, length: 5, elementsPerPage: 10 },
    currentPage: 1,
    numberOfPages: 20,
  });

  return {
    subscribe,
    updateCurrentPage: (pageNumber: number) =>
      update((page) => {
        if (pageNumber > page.numberOfPages) {
          page.currentPage = page.numberOfPages;
          return page;
        }
        if (pageNumber < 1) {
          page.currentPage = 1;
          return page;
        }

        const centerIndex = Math.ceil((page.range.length - 1) / 2);
        const diff = Math.abs(pageNumber - (centerIndex + page.range.start));
        if (pageNumber > centerIndex + page.range.start) {
          page.range.start = page.range.start + diff;
        }
        if (
          pageNumber < centerIndex + page.range.start &&
          pageNumber > centerIndex
        ) {
          page.range.start = page.range.start - diff;
        }

        if (page.range.start + page.range.length > page.numberOfPages) {
          page.range.start = page.numberOfPages - page.range.length + 1;
        }

        page.currentPage = pageNumber;
        return page;
      }),
    setTableSize: (numberOfElements: number) =>
      update((page) => {
        const numberOfPages = Math.ceil(
          numberOfElements / page.range.elementsPerPage
        );

        page.numberOfPages = numberOfPages;
        if (page.range.length > numberOfPages) {
          page.range.length = numberOfPages;
        }
        if (page.currentPage > numberOfPages) {
          page.currentPage = numberOfPages;
        }

        return page;
      }),
  };
}

export const paginatorStore = createPaginator();
