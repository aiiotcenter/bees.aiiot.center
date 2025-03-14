import React from "react";
import { PaginationWrapper, PaginationButton, PageNumber } from "../Style/Table/Style";
import styled from "styled-components";

// New styled components for the pagination
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
  margin-bottom: 25px !important;
`;

const PageNumberButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  border: 0px solid;
  background-color: ${props => props.active ? "#78091e" : props.hover ? "#F1FCFA" : "transparent"};
  color: ${props => props.active ? "#FFFFFF" : "#222222"};
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? "#78091e" : "#F1FCFA"};
    transform: scale(1.1); /* Slightly increase size on hover */
  }

  &:focus{
    outline: 0px auto -webkit-focus-ring-color;
  }
`;

const NavigationButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  margin-right: 40px;
  margin-left: 40px;
  justify-content: center;
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  border: 1px solid ${props => props.disabled ? "#E9E9E9" : "#222222"};
  background-color: transparent;
  transition: border-color 0.2s ease, transform 0.2s ease;

  svg path {
    fill: ${props => props.disabled ? "#E9E9E9" : "#222222"};
    transition: fill 0.2s ease;
  }

  &:focus-visible{
    color: #fff;
    border: none;
    outline: 0px auto -webkit-focus-ring-color;
  }
  &:focus{
    color: #fff;
    border: none;
    outline: 0px auto -webkit-focus-ring-color;
  }

  &:hover {
    border-color: #222222;
    transform: scale(1.1); /* Slightly increase size on hover */
  }
`;

const Ellipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222222;
  font-size: 16px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1); /* Slightly increase size on hover */
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Function to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // Current page and surrounding pages
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after page 1 if necessary
    if (startPage > 3) {
      pageNumbers.push('...');
    }
    
    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // Add ellipsis before last page if necessary
    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }
    
    // Always show last page if it's not page 1
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <PaginationContainer>
      <NavigationButton 
        onClick={() => onPageChange(-1)}
        disabled={currentPage === 1}
      >
        <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.818603 8.00232L7.17839 14.3445C7.38676 14.5522 7.72411 14.5518 7.93214 14.3434C8.14 14.1351 8.13946 13.7975 7.93106 13.5897L1.94983 7.62498L7.93128 1.6603C8.13965 1.45244 8.14019 1.11511 7.93235 0.906712C7.82807 0.802244 7.69146 0.75001 7.55485 0.75001C7.41858 0.75001 7.2825 0.801895 7.17841 0.905638L0.818603 7.24766C0.718244 7.34751 0.661928 7.4834 0.661928 7.62498C0.661928 7.76656 0.718405 7.90229 0.818603 8.00232Z" fill="#222222"/>
        </svg>
      </NavigationButton>
      
      {getPageNumbers().map((pageNumber, index) => (
        pageNumber === '...' ? (
          <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>
        ) : (
          <PageNumberButton
            key={`page-${pageNumber}`}
            active={currentPage === pageNumber}
            onClick={() => pageNumber !== currentPage && onPageChange(pageNumber - currentPage)}
          >
            {pageNumber}
          </PageNumberButton>
        )
      ))}
      
      <NavigationButton 
        onClick={() => onPageChange(1)}
        disabled={currentPage === totalPages}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_445_244)">
            <path d="M11.1814 7.24768L4.82161 0.90549C4.61324 0.697817 4.27589 0.698166 4.06786 0.906564C3.86 1.11493 3.86054 1.45248 4.06894 1.66031L10.0502 7.62502L4.06872 13.5897C3.86035 13.7976 3.85982 14.1349 4.06765 14.3433C4.17193 14.4478 4.30854 14.5 4.44516 14.5C4.58142 14.5 4.7175 14.4481 4.82159 14.3444L11.1814 8.00234C11.2818 7.90249 11.3381 7.7666 11.3381 7.62502C11.3381 7.48344 11.2816 7.34771 11.1814 7.24768Z" fill="#222222"/>
          </g>
          <defs>
            <clipPath id="clip0_445_244">
              <rect width="13.75" height="13.75" fill="white" transform="translate(0.75 0.75)"/>
            </clipPath>
          </defs>
        </svg>
      </NavigationButton>
    </PaginationContainer>
  );
};

export default Pagination;
