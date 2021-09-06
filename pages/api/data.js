import {fetchData, paginateData, validateRequestParams} from '../../tools/data';

/**
 * GET /api/data: Return filtered/sorted rushing json data
 */
export default function handler(req, res) {
  // Pull relevant parameters from request query
  const {page, size, search, field, direction} = req.query;

  // Validate params for invalid values
  const err = validateRequestParams(size, field, direction);
  if (err) return res.status(400).json({error: {message: err}});

  // Fetch rushing data and pipe through filtering and sort funtions
  const data = fetchData(search, field, direction);

  // Get total results from data and paginate for client
  const total = data.length;
  const results = paginateData(page, parseInt(size) || 25)(data);

  // Return total and results to client
  res.status(200).json({total, results});
}
