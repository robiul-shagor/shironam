import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin h-8 w-8 text-theme"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042.546 5.978 1.537 8.708l4.242-4.242zM12 20c-3.042 0-5.978-.546-8.708-1.537l4.242-4.242A7.962 7.962 0 0112 16h4c0-3.042-.546-5.978-1.537-8.708l-4.242 4.242A7.962 7.962 0 0112 20z"
        ></path>
      </svg>
    </div>
  );
};

export default Spinner;