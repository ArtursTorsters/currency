import { useState } from 'react';
import Select from './inputs/Select';

const Table = ({ data }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const filteredData = data?.filter(row => row.to_currency === selectedCurrency);

  return (
    <div className="w-full mx-auto p-4">
      <div className="mb-4 flex flex-col items-center">
        <h3 className="text-2xl font-bold w-full mb-2">
          1 EUR to {selectedCurrency} Exchange Rate
        </h3>
        <h5 className='mb-2'>Last updated: new Date:</h5>
        <Select
          selectedCurrency={selectedCurrency}
          onCurrencyChange={setSelectedCurrency}
        />
      </div>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-6 border-b border-r">Date</th>
              <th className="p-6 border-b">Rate</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((row, index) => (
              <tr key={index} className='py-4 w-full'>
                <td className="border-b p-2 w-1/2">{new Date(row.date).toDateString()}</td>
                <td className="border-b border-l p-2 w-1/2">{row.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
