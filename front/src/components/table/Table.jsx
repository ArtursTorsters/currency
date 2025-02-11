import { useState, useEffect } from "react";
import Select from "../inputs/Select";
import Pagination from "../pagination/Pagination";

const Table = ({ data }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc")
  const itemsPerPage = 10;
  const filteredData = data
    ?.filter((row) => row.to_currency === selectedCurrency)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredData?.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCurrency]);

  const toggleSort = () => {
    setSortOrder((current) => (current === "desc" ? "asc" : "desc"));
  };

  return (
    <div className="w-full mx-auto p-4">
      <div className="mb-4 flex flex-col items-center">
        <h3 className="text-2xl font-bold w-full mb-2">
          1 EUR to {selectedCurrency} Exchange Rate
        </h3>
        <Select
          selectedCurrency={selectedCurrency}
          onCurrencyChange={setSelectedCurrency}
        />
      </div>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead>
            <tr>
              <th
                className="p-6 border-b border-r cursor-pointer"
                onClick={toggleSort}
              >
                Date {sortOrder === "desc" ? "↓" : "↑"}
              </th>
              <th className="p-6 border-b">Rate</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData?.map((row, index) => (
              <tr key={index} className="py-4 w-full">
                <td className="border-b p-2 w-1/2">
                  {new Date(row.date).toLocaleString()}
                </td>
                <td className="border-b border-l p-2 w-1/2">{row.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={filteredData?.length || 0}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Table;
