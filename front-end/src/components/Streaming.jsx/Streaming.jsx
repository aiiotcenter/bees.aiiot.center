import React, { useState } from 'react';
import { HeadingWrapper } from '../../Style/Dashboard/Style';
import { Container, PageWrapper } from '../../Style/GlobalStyle';
import Typography from '../../Style/Typography';
import { Wrapper, TabsContainer, Tab, TabContent } from '../../Style/Streaming/Style';
import { SearchBarWrapper } from '../../Style/Header/Style';
import { Search } from 'lucide-react';
import Live from './Live';

export default function Streaming() {
  const [activeTab, setActiveTab] = useState('Live');

  // Tab Content Mapping
  const tabContent = {
    Live: <Typography variant="p"><Live/></Typography>,
    Recorded: <Typography variant="p">Recorded Streaming Content Here...</Typography>,
    Upcoming: <Typography variant="p">Upcoming Streaming Events Here...</Typography>,
  };

  return (
    <>
      <PageWrapper>
        <Container>
          <HeadingWrapper>
            <Typography variant="h1">Streaming</Typography>
            <Typography variant="p">Explore different streaming options</Typography>
          </HeadingWrapper>

          <Wrapper>
            <Typography variant="h3">Streaming</Typography>
            <SearchBarWrapper>
              <Search size={20} style={{ position: "absolute", right: 65, top: 14, color: "#666" }} />
              <input type="text" placeholder="Search for streaming here ..." />
            </SearchBarWrapper>
                     {/* Tabs Navigation */}
          <TabsContainer>
            {['Live', 'Recorded', 'Upcoming'].map((tab) => (
              <Tab key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
                {tab}
              </Tab>
            ))}
          </TabsContainer>

          {/* Active Tab Content */}
          <TabContent>{tabContent[activeTab]}</TabContent>
          </Wrapper>

 
        </Container>
      </PageWrapper>
    </>
  );
}
