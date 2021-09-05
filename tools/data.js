/**
 * Return paginated subset of provided data
 */
export const paginateData =
  (page = 1, size = 50) =>
  data => {
    const start = (page - 1) * size;
    return data.slice(start, start + size);
  };

/**
 * Filter provided data based on specific field and search term
 */
export const filterData =
  (search = '', field = 'Player') =>
  data => {
    if (!search) return data;
    return data.filter(item => {
      return item[field].toLowerCase().includes(search.toLowerCase());
    });
  };

/**
 * Sort provided data (num/string) based on provided field and direction
 */
export const sortData =
  (field = '', direction = 'asc') =>
  data => {
    if (!field) return data;
    const isAsc = direction === 'asc';
    return data.sort((a, b) => {
      const first = isAsc ? a[field] : b[field];
      const second = isAsc ? b[field] : a[field];
      if (typeof a[field] === 'number') return first - second;
      else return first.localeCompare(second);
    });
  };
