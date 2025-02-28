import React from 'react';
import { useLocation } from 'react-router-dom';
import { PageWrapper, Table, Container } from '../Style/GlobalStyle';
import { HeadingWrapper } from '../../src/Style/Dashboard/Style';
import Typography from '../Style/Typography';
import { MainWrapper } from '../Style/Table/Style';

export default function TableComponent() {
  const location = useLocation();
  const { selectedData } = location.state || { selectedData: [] };

  return (
<>
<PageWrapper>
      <Container>
        <HeadingWrapper>
          <Typography variant="h1">Details</Typography>
          <Typography variant="p">Below is the data related to the selected card.</Typography>
        </HeadingWrapper>
        <MainWrapper>
          <Table>
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Index</th>
                <th style={{ width: '75%' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.length > 0 ? (
                selectedData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{Object.values(item)[0]}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="100%" style={{ textAlign: 'center', display:'table-cell' }}>No data available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </MainWrapper>
      </Container>
    </PageWrapper>
</>
  );
}
