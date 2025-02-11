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

  useEffect(() => {
    //init
    fetchData();

    const midnight = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      //milliseconds
      const timeUntilMidnight = tomorrow - now;

      return setTimeout(() => {
        fetchData();
        const dailyInterval = setInterval(fetchData, 24 * 60 * 60 * 1000);
        return () => clearInterval(dailyInterval);
      }, timeUntilMidnight);
    };

    const timerId = midnight();
    return () => clearTimeout(timerId);
  }, []);

  return <Table data={data} />;
};

export default ApiFetch;
