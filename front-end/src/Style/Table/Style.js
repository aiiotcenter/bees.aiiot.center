import styled, { keyframes } from 'styled-components';


export const MainWrapper = styled.div`
  /* display: flex;
  align-items: flex-start;
  width: 100%;   */
  display: flex;
    align-items: center;
    width: 100%;
    flex-direction: column;
    background-color: #fff;
`;

// Spinner Animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Spinner Component
export const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #78091e;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto; /* Horizontally center */
  position: absolute; /* Centering absolutely within the container */
  top: 50%; /* Position it in the vertical center */
  left: 50%; /* Position it in the horizontal center */
  transform: translate(-50%, -50%); /* Offset by 50% of its own width and height */
`;


// Styled Components for Table
export const StyledTableWrapper = styled.div`
  overflow: hidden;
  border: 0px solid #ddd;
  border-radius: 4px;
  background: #FFFFFF;
  padding: 30px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  border-radius: 4px;
`;

export const TableHead = styled.thead`
  background: #F1FCFA;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const TableBody = styled.tbody`
  display: block;
  /* max-height: 500px; */
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  border-radius: 4px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TableRow = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed;
  border-bottom: 1px solid #E9E9E9;

  &:last-child {
    border: none;
  }
`;

export const TableHeaderCell = styled.th`
  padding: 12px;
  border: 0px solid #ddd;
  text-align: center;
  width: 10%; /* Same as TableCell width */
  background: #F1FCFA; /* Optional: To maintain background color for header */
  font-weight: bold;
`;

export const TableCell = styled.td`
  padding: 12px;
  text-align: center;
  width: 10%; /* Same as TableHeaderCell width */
`;

// Pagination Controls
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

export const PaginationButton = styled.button`
  background-color: none;
  border: 1px solid #222222;
  color: #222222;
  cursor: pointer;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    border-color: #E9E9E9;
    cursor: not-allowed;
  }
`;

export const PageNumber = styled.span`
  margin: 0 10px;
  color: #222222;
  background: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:active{
    background: #5BBB7B;
    border: 1px solid #5BBB7B;
    color: #fff;
  }
  &:hover{
    background: #F1FCFA;
  }
 
`;


// Status colors for each status
const statusColors = {
  active: "#28a745",   // Green (Active)
  inactive: "#6c757d", // Gray (Inactive)
  danger: "#dc3545",   // Red
  good: "#007bff",     // Blue
  normal: "#ffc107",   // Yellow
  unknown: "#6c757d",  // Gray (Unknown)
};

// Styled Status Cell
export const StatusCell = styled.td`
  padding: 4px 8px; /* Smaller padding for less height and width */
  background: ${({ status }) => statusColors[status]?.background || "#F1FAFF"}; /* Default Light Blue */
  border-radius: 6px;
  color: ${({ status }) => statusColors[status]?.color || "#00A3FF"}; /* Default Blue */
  font-weight: 500;
  font-size: 12px; /* Slightly smaller text */
  line-height: 18px; /* Adjust line height for better compactness */
  text-align: center;
  display: inline-block; /* Ensure the cell is not full-width */
  width: auto; /* Allow the cell to shrink or expand based on content */
`;
