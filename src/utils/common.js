const customizeData = (data) => {
  if (data) {
    const { page } = data;
    const {
      title,
      ["content-items"]: content,
      ["total-content-items"]: totalItems,
      ["page-num-requested"]: pageNumber,
      ["page-size-requested"]: pageSize,
      ["page-size-returned"]: itemSize,
    } = page;
    return { ...content, itemSize, pageNumber, pageSize, title, totalItems };
  }
};

export { customizeData };
