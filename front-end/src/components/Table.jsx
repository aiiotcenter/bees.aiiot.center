import React from 'react';
import { useLocation } from 'react-router-dom';
import { PageWrapper, Container } from '../Style/GlobalStyle';
import { HeadingWrapper } from '../../src/Style/Dashboard/Style';
import Typography from '../Style/Typography';
import { MainWrapper } from '../Style/Table/Style';
import styled from 'styled-components';

// Styled Components
const StyledTableWrapper = styled.div`
  max-height: 500px;
  overflow: hidden; /* Hide scroll */
  border: 1px solid #ddd;
`;

// Table styles
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* Keeps columns uniform */
`;

// Table Head - Fixed at top
const TableHead = styled.thead`
  background: #f4f4f4;
  position: sticky;
  top: 0;
  z-index: 10;
`;

// Table Body - Scrollable but hides scrollbar
const TableBody = styled.tbody`
  display: block;
  max-height: 500px;
  overflow-y: scroll;
  scrollbar-width: none; /* Hide scrollbar (Firefox) */
  -ms-overflow-style: none; /* Hide scrollbar (IE/Edge) */

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar (Chrome/Safari) */
  }
`;

// Table Row - Maintain structure
const TableRow = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed; /* Uniform column sizing */
`;

// Header & Cell Styling - Centered and same size
const TableHeaderCell = styled.th`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
  width: 50%;
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
  width: 50%;
`;

export default function TableComponent() {
  const location = useLocation();
  const { selectedData } = location.state || { selectedData: [] };

  return (
    <PageWrapper>
      <Container>
        <HeadingWrapper>
          <Typography variant="h1">Details</Typography>
          <Typography variant="p">Below is the data related to the selected card.</Typography>
        </HeadingWrapper>
        <MainWrapper>
          <StyledTableWrapper>
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Index</TableHeaderCell>
                  <TableHeaderCell>Value</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedData.length > 0 ? (
                  selectedData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{Object.values(item)[0]}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="2">No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </StyledTable>
          </StyledTableWrapper>
        </MainWrapper>
      </Container>
    </PageWrapper>
  );
}
