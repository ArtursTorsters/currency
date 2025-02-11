const PageButton = ({ page, isCurrentPage, onClick }) => {
    return (
      <button
        className={`px-4 py-2 rounded ${
          isCurrentPage ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => onClick(page)}
      >
        {page}
      </button>
    );
  };

  export default PageButton;
