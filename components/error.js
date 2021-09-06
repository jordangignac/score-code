const Error = ({error}) => {
  return (
    <div className="alert alert-error mb-3">
      <div className="flex-1">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mx-2 stroke-current"
        >
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          ></path>
        </svg>
        <label>An error occurred: {error}</label>
      </div>
    </div>
  );
};

export default Error;
