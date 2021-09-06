import {SORT_VALUES, DIRECTION_VALUES} from '../tools/constants';

const Search = ({
  setPage,
  searchTerm,
  setSearchTerm,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
}) => {
  // Common on change update that can be supplied custom update function
  const onChangeUpdate = (func, resetPage) => event => {
    if (resetPage) setPage(1);
    func(event.target.value);
  };

  return (
    <div className="w-full flex mb-3">
      <input
        type="text"
        placeholder="Player Search"
        className="input input-neutral input-bordered w-full mr-2"
        onChange={onChangeUpdate(setSearchTerm, true)}
        value={searchTerm}
      />
      <select
        value={sortField}
        onChange={onChangeUpdate(setSortField)}
        className="select select-bordered w-50 mr-2"
      >
        {Object.keys(SORT_VALUES).map(key => (
          <option key={`sort-${SORT_VALUES[key]}`} value={SORT_VALUES[key]}>
            {key}
          </option>
        ))}
      </select>
      <select
        value={sortDirection}
        onChange={onChangeUpdate(setSortDirection)}
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
