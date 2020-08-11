export default (searchValue, list) => {
  let finalData = [];
  if (Array.isArray(list) && list.length > 0) {
    finalData = searchValue
      ? list.filter(item =>
          item.name
            .toLowerCase()
            .includes(searchValue && searchValue.toLowerCase())
        )
      : list;
  }
  return finalData;
};
