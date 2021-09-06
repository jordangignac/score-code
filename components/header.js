const Header = props => {
  const {initiateDownload} = props;
  return (
    <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg font-bold">theScore Coding Challenge</span>
      </div>
      <div className="flex flex-none px-2 mx-2">
        <div className="flex items-stretch">
          <button
            onClick={initiateDownload}
            className="btn btn-ghost btn-sm rounded-btn"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block w-5 mr-2 stroke-current"
            >
              <path
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              ></path>
            </svg>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
