import rushingJson from '../../data/rushing.json';

import {sortData, filterData, paginateData} from '../../tools/data';
import {pipeData} from '../../tools/utils';

/**
 * GET /api/data: Return filtered/sorted rushing json data
 */
export default function handler(req, res) {
  // Pull relevant parameters from request query
  const {page, size, search, field, direction} = req.query;

  // Pipe rushing data through filtering and sort funtions
  const data = pipeData(
    filterData(search),
    sortData(field || 'Player', direction)
  )(rushingJson);

  // Get total results from data and paginate for client
  const total = data.length;
  const results = paginateData(page, parseInt(size))(data);

  // Return total and results to client
  res.status(200).json({total, results});
}
