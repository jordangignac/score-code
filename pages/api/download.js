import rushingJson from '../../data/rushing.json';

import {sortData, filterData, generateCsvString} from '../../tools/data';
import {pipeData} from '../../tools/utils';

export default function handler(req, res) {
  const {search, field, direction} = req.query;

  const data = pipeData(
    filterData(search),
    sortData(field || 'Player', direction)
  )(rushingJson);

  res.setHeader('Content-Disposition', 'attachment; filename=output.csv');
  res.setHeader('Content-Type', 'text/csv');

  res.status(200).send(generateCsvString(data));
}
