import React from 'react';
import SideBar from './SideBar';
import Header from './Header';
import { Container } from '../style/common/style';

const Layout = ({ children, isCollapsed}) => {
  return (
    <>
      <Container isCollapsed={isCollapsed}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
