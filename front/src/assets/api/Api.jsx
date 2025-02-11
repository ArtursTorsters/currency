import { useState, useEffect } from "react";
import Table from "../../components/table/Table";

const ApiFetch = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/rates");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };
  // fetch every min
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return <Table data={data} />;
};

export default ApiFetch;
