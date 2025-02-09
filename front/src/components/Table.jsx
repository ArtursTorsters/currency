import { useEffect, useState } from "react";

function Table() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/rates");
      const result = await response.json();
      console.log("Data:", result);
      setData(result);
    } catch (error) {
      console.error("Error", error);
      setError(error.message);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>From Currency</th>
            <th>To Currency</th>
            <th>Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.from_currency}</td>
              <td>{row.to_currency}</td>
              <td>{row.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
