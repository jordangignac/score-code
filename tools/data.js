import {pipeData} from './utils';
import {ROW_VALUES, DIRECTION_VALUES} from '../tools/constants';

import rushingJson from '../data/rushing.json';
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

/**
 * Common function for fetching rushing data and piping through
 * filtering and sorting functions with defaults
 */
export const fetchData = (search, field, direction) => {
  return pipeData(
    filterData(search),
    sortData(field || 'Player', direction || 'asc')
  )(rushingJson);
};

/**
 * Validate param values returning error string on invalid or null on valid
 */
export const validateRequestParams = (size, field, direction) => {
  if (field && !headers.includes(field)) {
    return 'Invalid sort field param';
  } else if (direction && !DIRECTION_VALUES.includes(direction)) {
    return 'Invalid sort direction param';
  } else if (size && !ROW_VALUES.includes(parseInt(size))) {
    return 'Invalid row size param';
  } else return null;
};
