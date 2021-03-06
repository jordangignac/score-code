import {ROW_VALUES} from '../tools/constants';

const Pagination = ({page, setPage, totalRows, rowCount, setRowCount}) => {
  // Generate to/from item numbers from page and row count
  const rowTo = Math.min((page - 1) * rowCount + rowCount, totalRows);
  const rowFrom = totalRows === 0 ? 0 : Math.max((page - 1) * rowCount + 1, 1);

  // Handler for row count change updating value and constraining page to new count
  const onRowCountChange = event => {
    const count = parseInt(event.target.value);
    setPage(Math.min(page, Math.ceil(totalRows / count)));
    setRowCount(count);
  };

  // Common page click update function that allows passing in update value
  const onSetPageClick = val => () => {
    setPage(val);
  };

  return (
    <div className="flex align-center justify-between mt-5 px-5">
      <h3 className="mr-5">{`${rowFrom} - ${rowTo} of ${totalRows}`}</h3>
      <div className="flex align-center justify-center">
        <select
          value={rowCount}
          onChange={onRowCountChange}
          className="select select-bordered w-36 mr-5 select-sm"
        >
          {ROW_VALUES.map(count => (
            <option
              value={count}
              key={`cnt-${count}`}
            >{`${count} per page`}</option>
          ))}
        </select>
        <div className="btn-group">
          <button
            disabled={rowFrom <= 1}
            onClick={onSetPageClick(page - 1)}
            className="btn btn-outline btn-sm"
          >
            Previous
          </button>
          <button
            disabled={rowTo === totalRows}
            onClick={onSetPageClick(page + 1)}
            className="btn btn-outline btn-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
