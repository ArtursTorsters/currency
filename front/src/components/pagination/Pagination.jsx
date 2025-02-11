import PageButton from "./buttons/PageButton";
import NavigationButton from "./buttons/NavigationButton";
const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <NavigationButton
        onClick={handlePrevious}
        disabled={currentPage === 1}
        isActive={currentPage !== 1}
      >
        Previous
      </NavigationButton>

      {pages.map((page) => (
        <PageButton
          key={page}
          page={page}
          isCurrentPage={currentPage === page}
          onClick={setCurrentPage}
        />
      ))}

      <NavigationButton
        onClick={handleNext}
        disabled={currentPage === totalPages}
        isActive={currentPage !== totalPages}
      >
        Next
      </NavigationButton>
    </div>
  );
};

export default Pagination;
