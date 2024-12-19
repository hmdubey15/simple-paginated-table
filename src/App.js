import { useEffect, useState, useMemo } from "react";
import "./App.css";
import { NO_OF_PAGINATION_BTNS, ROWS_PER_PAGE, tableDataReader } from "./app.constants";

function App() {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json")
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
      })
      .catch((error) => {
        setTableData([]);
        console.error(error);
      });
  }, []);

  const indexOfLastRow = currentPage * ROWS_PER_PAGE;
  const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
  
  const currentRows = useMemo(() => tableData.slice(indexOfFirstRow, indexOfLastRow), [indexOfFirstRow, indexOfLastRow, tableData]);

  const totalPages = useMemo(() => Math.ceil(tableData.length / ROWS_PER_PAGE), [tableData]);

  const visiblePages = useMemo(() => {
    const pages = [];
    let start = Math.max(1, currentPage - Math.floor(NO_OF_PAGINATION_BTNS / 2));
    let end = Math.min(start + NO_OF_PAGINATION_BTNS - 1, totalPages);

    if (end - start + 1 < NO_OF_PAGINATION_BTNS) start = Math.max(1, end - NO_OF_PAGINATION_BTNS + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="App">
      <h2>Simple Paginated Table</h2>

      <table className="paginated-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage funded</th>
            <th>Amount pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((data) => (
            <tr key={tableDataReader.serialNo(data)}>
              <td>{tableDataReader.serialNo(data)}</td>
              <td>{tableDataReader.percentageFunded(data)}</td>
              <td>{tableDataReader.amountPledged(data)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="pagination-btn">
          &laquo; Previous
        </button>

        {visiblePages.map((page) => (
          <button key={page} onClick={() => setCurrentPage(page)} className={`pagination-btn ${currentPage === page ? "active" : ""}`}>
            {page}
          </button>
        ))}

        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="pagination-btn">
          Next &raquo;
        </button>
      </div>
    </div>
  );
}

export default App;
