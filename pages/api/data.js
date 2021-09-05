import rushingJson from '../../data/rushing.json';

import {sortData, filterData, paginateData} from '../../tools/data';
import {pipeData} from '../../tools/utils';

export default function handler(req, res) {
  const {page, size, search, field, direction} = req.query;

  const data = pipeData(
    filterData(search),
    sortData(field, direction),
    paginateData(page, size)
  )(rushingJson);

  res.status(200).json(data);
}