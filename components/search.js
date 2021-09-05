const Search = props => {
  const {searchTerm, setSearchTerm} = props;
  return (
    <div className="w-full mb-3">
      <div class="form-control">
        <input
          type="text"
          placeholder="Player Search"
          class="input input-primary input-bordered"
          onChange={event => setSearchTerm(event.target.value)}
          value={searchTerm}
        />
      </div>
    </div>
  );
};

export default Search;
