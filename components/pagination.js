const ROW_VALUES = [25, 50, 100];

const Pagination = props => {
  const {page, setPage, totalRows, rowCount, setRowCount} = props;
  const rowTo = (page - 1) * rowCount + rowCount;
  const rowFrom = (page - 1) * rowCount + 1;
  return (
    <div className="flex align-center justify-between mt-5 px-5">
      <h3 className="mr-5">{`${rowFrom} - ${rowTo} of ${totalRows}`}</h3>
      <div className="flex align-center justify-center">
        <select
          value={rowCount}
          onChange={e => setRowCount(parseInt(e.target.value))}
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
            onClick={() => setPage(page - 1)}
            className="btn btn-outline btn-sm"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
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
