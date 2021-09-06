const SORT_VALUES = {
  None: '',
  'Longest Rush': 'Lng',
  'Total Rushing Yards': 'Yds',
  'Total Rushing Touchdowns': 'TD',
};

const DIRECTION_VALUES = ['asc', 'desc'];

const Search = props => {
  const {
    searchTerm,
    setSearchTerm,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
  } = props;
  return (
    <div className="w-full flex mb-3">
      <input
        type="text"
        placeholder="Player Search"
        className="input input-neutral input-bordered w-full mr-2"
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <select
        value={sortField}
        onChange={e => setSortField(e.target.value)}
        className="select select-bordered w-50 mr-2"
      >
        {Object.keys(SORT_VALUES).map(key => (
          <option key={`sort-${key}`} value={SORT_VALUES[key]}>
            {key}
          </option>
        ))}
      </select>
      <select
        value={sortDirection}
        onChange={e => setSortDirection(e.target.value)}
        className="select select-bordered w-28"
      >
        {DIRECTION_VALUES.map(dir => (
          <option key={`dir-${dir}`} value={dir}>
            {dir.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Search;
