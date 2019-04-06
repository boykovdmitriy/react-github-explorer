export function hasMorePages(storeField) {
  const {
    params: {
      page = {page: 1}
    },
    totalPages,
  } = storeField;

  return page < totalPages;
}
