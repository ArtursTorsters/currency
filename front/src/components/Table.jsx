import { useEffect, useState } from 'react';

function Table() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/rates'); // Note the leading slash
console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

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
