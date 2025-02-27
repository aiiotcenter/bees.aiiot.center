import React from 'react';
import { PageWrapper, Table, Container } from '../Style/GlobalStyle'; // ✅ Renamed import
import { HeadingWrapper } from '../../src/Style/Dashboard/Style';
import Typography from '../Style/Typography';
import { MainWrapper } from '../Style/Table/Style';

export default function TableComponent() { // ✅ Renamed function to avoid conflicts
  return (
    <PageWrapper>
      <Container>
        <HeadingWrapper>
          <Typography variant="h1">Details</Typography>
          <Typography variant="p">Lorem ipsum dolor sit amet, consectetur.</Typography>
        </HeadingWrapper>
        <MainWrapper>
      
          <Table>
              <thead>
                <tr>
                  <th style={{width:'25%'}}>ID</th>
                  <th style={{width:'25%'}}>Name</th>
                  <th style={{width:'25%'}}>Email</th>
                  <th style={{width:'25%'}}>Status</th>
                  <th style={{width:'90%'}}>Role</th>
                </tr>
              </thead>
              <tbody>
                
                  <tr>
                    <td>Test</td>
                    <td>Test</td>
                    <td>Test</td>
                    <td><span className='status-active'> Test</span></td>
                    <td><span className='role-badge'>Test</span></td>
                  </tr>
             
              </tbody>
            </Table>
          
        </MainWrapper>
      </Container>
    </PageWrapper>
  );
}
