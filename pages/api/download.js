import rushingJson from '../../data/rushing.json';

import {sortData, filterData, generateCsvString} from '../../tools/data';
import {pipeData} from '../../tools/utils';

/**
 * GET /api/download: Return csv download response for
 * filtered/sorted rushing data
 */
export default function handler(req, res) {
  // Pull relevant parameters from request query
  const {search, field, direction} = req.query;

  // Pipe rushing data through filtering and sort funtions
  const data = pipeData(
    filterData(search),
    sortData(field || 'Player', direction)
  )(rushingJson);

  // Set content headers required for csv download response
  res.setHeader('Content-Disposition', 'attachment; filename=output.csv');
  res.setHeader('Content-Type', 'text/csv');

  // Generate csv string from filtered/sorted rushing data
  const result = generateCsvString(data);

  // Return processed data to client
  res.status(200).send(result);
}
