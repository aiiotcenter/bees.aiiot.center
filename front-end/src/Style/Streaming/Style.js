import styled from 'styled-components';


export const Wrapper = styled.div`
    max-width: 96%;
    width: 100%;
    background: #fff;
    padding: 30px;
    border-radius: 4px;
    margin-bottom: 60px;
    
    h3{
        padding-bottom: 20px;
    }
`;


// Tabs Container
export const TabsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

// Individual Tab
export const Tab = styled.button`
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  color: ${(props) => (props.active ? '#1F4B3F' : '#666')};
  border: ${(props) => (props.active ? '1px solid #1F4B3F' : 'none')};
  transition: all 0.3s ease;
  border-radius: 20px;
  &:focus{
    outline: unset;
    padding: 10px 30px;
  }
  &:hover {
    color: #1F4B3F;
  
  }
  &:active{
    padding: 10px 30px;
    border: 0;
  }
`;

// Tab Content
export const TabContent = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  min-height: 150px;
`;

