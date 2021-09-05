import rushingJson from '../../data/rushing.json';

import {sortData, filterData} from '../../tools/data';
import {pipeData} from '../../tools/utils';

export default function handler(req, res) {
  const {search, field, direction} = req.query;

  const data = pipeData(
    filterData(search),
    sortData(field, direction)
  )(rushingJson);

  res.setHeader('Content-Disposition', 'attachment; filename=output.json');
  res.setHeader('Content-Type', 'application/json');

  res.status(200).send(data);
}
