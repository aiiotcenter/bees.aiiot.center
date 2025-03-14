import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageWrapper, Container } from "../Style/GlobalStyle";
import { HeadingWrapper } from "../../src/Style/Dashboard/Style";
import Typography from "../Style/Typography";
import {
  MainWrapper,
  StyledTableWrapper,
  StyledTable,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  Spinner,
  StatusCell,
} from "../Style/Table/Style";
import Pagination from "../components/Pagination";

// Helper to handle dummy data
const getDummyData = (value, fallback) => value || fallback;

// Helper for dynamic card descriptions
const getCardDescription = (cardTitle) => {
  switch (cardTitle) {
    case "Bee Status":
      return "Bee status refers to the sound activity of the bees. Active bees are working, while inactive ones may indicate issues.";
    case "Hive Status":
      return "Hive status refers to the environmental conditions within the hive, like humidity, which affects bee health and productivity.";
    case "Distance Detection":
      return "Distance detection measures the proximity of the bees to specific objects, important for monitoring bee movement.";
    case "Hive Weight":
      return "Hive weight indicates the total weight of the hive, which can reflect the bees' activity, health, and honey production.";
    default:
      return "Data is currently unavailable.";
  }
};

export default function TableComponent() {
  const location = useLocation();
  const { selectedData, title } = location.state || {};  // Retrieve title and selected data from location.state
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Simulate loading data
    }, 2000);
  }, []);

  const totalPages = Math.max(1, Math.ceil(selectedData.length / itemsPerPage));

  const currentData = selectedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  // Calculate the count of the selected data
  const totalCount = selectedData.length;

  return (
    <PageWrapper>
      <Container>
        <HeadingWrapper>
          {/* Dynamic Heading */}
          <Typography variant="h1">
            {title || "Details"} {/* Use the title from the selected card */}
          </Typography>
          
          {/* Dynamic description with total count */}
          <Typography variant="p">
            Below is the data related to the selected card. There are a total of {totalCount} records available.
          </Typography>
          
          {/* Dynamic description based on the card's title */}
          <Typography variant="p">
            {title ? getCardDescription(title) : "Please select a card to view data."}
          </Typography>
        </HeadingWrapper>

        <MainWrapper>
          {/* Loading Spinner */}
          {loading ? (
            <Spinner />
          ) : (
            <>
              {/* Table */}
              <StyledTableWrapper>
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell style={{ width: "10%" }}>ID</TableHeaderCell>
                      <TableHeaderCell style={{ width: "35%" }}>Value</TableHeaderCell>
                      <TableHeaderCell style={{ width: "30%" }}>Date/Time</TableHeaderCell>
                      <TableHeaderCell style={{ width: "25%" }}>Status</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentData.length > 0 ? (
                      currentData.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell style={{ width: "10%" }}>
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </TableCell>
                          <TableCell style={{ width: "31%" }}>
                            {getDummyData(item.value, "Dummy Value")}
                          </TableCell>
                          <TableCell style={{ width: "30%" }}>
                            {getDummyData(item.dateTime, "No Date")}
                          </TableCell>
                          <TableCell style={{ width: "23%" }}>
                            <StatusCell status={item.status?.toLowerCase() || "unknown"}>
                              {getDummyData(item.status, "Unknown")}
                            </StatusCell>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="4">No data available</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </StyledTable>
              </StyledTableWrapper>

              {/* Reusable Pagination Component */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </MainWrapper>
      </Container>
    </PageWrapper>
  );
}
