import React, { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchRecords();
  }, [search, sortBy, page]);

  const fetchRecords = async () => {
    try {
      const response = await axios.get("http://localhost:2000/records", {
        params: {
          searchData: search,
          sortData: sortBy,
          pageData: page,
        },
      });
      setData(response.data.results);
    } catch (error) {
      console.error("Error fetching records: ", error);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const sortByDateTime = () => {
    setSortBy("created_at");
  };

  const sortByDate = () => {
    setSortBy("date");
  };

  const sortByTime = () => {
    setSortBy("time");
  };

  const formatDate = (dateTimeString, type) => {
    const dateTime = new Date(dateTimeString);
    if (type === "date") {
      return dateTime.toLocaleDateString(); // Date component
    } else if (type === "time") {
      return dateTime.toLocaleTimeString(); // Time component
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Calculate the starting index for the current page
  const startIndex = (page - 1) * 20 + 1;

  return (
    <div>
      <h1>CUSTOMER LIST</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search by Name or Location"
      />

      <div>
        <button onClick={sortByDate}>Sort by Date</button>
        <button onClick={sortByTime}>Sort by Time</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>sno</th>
            <th>customer_name</th>
            <th>age</th>
            <th>phone</th>
            <th>location</th>
            <th colspan="2">Created At</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {data.map((record, index) => (
            <tr key={record.id}>
              <td>{startIndex + index}</td> {/* Calculate continuous number */}
              <td>{record.customer_name}</td>
              <td>{record.age}</td>
              <td>{record.phone}</td>
              <td>{record.location}</td>
              <td>{formatDate(record.created_at, "date")}</td>
              <td>{formatDate(record.created_at, "time")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}

export default App;
