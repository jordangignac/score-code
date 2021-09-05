const Pagination = props => {
  const {page, pages, setPage} = props;
  return (
    <div className="flex align-center justify-center mt-5">
      <div class="btn-group">
        <button
          onClick={() => setPage(page - 1)}
          class="btn btn-outline btn-wide btn-sm"
        >
          Previous Page
        </button>
        <button
          onClick={() => setPage(page + 1)}
          class="btn btn-outline btn-wide btn-sm"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Pagination;
