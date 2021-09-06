import {
  fetchData,
  generateCsvString,
  validateRequestParams,
} from '../../tools/data';

/**
 * GET /api/download: Return csv download response for
 * filtered/sorted rushing data
 */
export default function handler(req, res) {
  // Pull relevant parameters from request query
  const {search, field, direction} = req.query;

  // Validate params for invalid values
  const err = validateRequestParams(null, field, direction);
  if (err) return res.status(400).json({error: {message: err}});

  // Fetch rushing data and pipe through filtering and sort funtions
  const data = fetchData(search, field, direction);

  // Generate csv string from filtered/sorted rushing data
  const result = generateCsvString(data);

  // Set content headers required for csv download response
  res.setHeader('Content-Disposition', 'attachment; filename=output.csv');
  res.setHeader('Content-Type', 'text/csv');

  // Return processed data to client
  res.status(200).send(result);
}
