import React from 'react';
import { Container, PageWrapper, Table } from '../Style/GlobalStyle';
import HeaderWrapper from '../../src/Style/Dashboard/Style';
import Typography from '../Style/Typography';
import { MainWrapper } from '../Style/Table/Style';


export default function Table() {
  return (
   <>
   <PageWrapper>
    <Container>
        <HeaderWrapper>
            <Typography variant="h1">Details</Typography>
            <Typography variant="p">Lorem ipsum dolor sit amet, consectetur.</Typography>
        </HeaderWrapper>
        <MainWrapper>
            <Table></Table>
        </MainWrapper>
    </Container>
   </PageWrapper>
   </>
  )
}
