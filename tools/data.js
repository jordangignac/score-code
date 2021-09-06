import headers from '../data/headers.json';

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
    const collator = new Intl.Collator(undefined, {
      sensitivity: 'base',
      numeric: true,
    });

    return data.sort((a, b) => {
      const first = isAsc ? a[field] : b[field];
      const second = isAsc ? b[field] : a[field];
      return (
        first - second ||
        collator.compare(
          first.toString().replace(/,/g, ''),
          second.toString().replace(/,/g, '')
        )
      );
    });
  };

/**
 * Manually generate csv string from headers and row data
 */
export const generateCsvString = rows => {
  let csvString = `${headers.join(',')}\n`;
  rows.forEach(row => (csvString += `${Object.values(row).join(',')}\r\n`));
  return csvString;
};
