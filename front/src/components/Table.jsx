import { useState } from 'react';

const Table = ({ data }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const currencies = ['USD', 'AUD', 'GBP'];
  const filteredData = data?.filter(row => row.to_currency === selectedCurrency);

  console.log(data);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-2xl font-bold">1 EUR to {selectedCurrency} Exchange Rate</h3>
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="border rounded p-2"
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>EUR to {currency}</option>
          ))}
        </select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left border-b">Date</th>
              <th className="px-6 py-3 text-left border-b">Rate</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((row, index) => (
              <tr key={index} className='py-4'>
                <td className="border-b">{new Date().toDateString()}</td>
                <td className="border-b">{row.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
