
import { useState, useEffect } from 'react';
import Table from "../../components/Table";
const ApiFetch = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/rates");
        console.log('Response:', response);
        const result = await response.json();
        setData(result);
      } catch (error) {
        (error.message);
      }
    };
    fetchData();
  }, []);
  return <Table data={data} />;
};

export default ApiFetch;
