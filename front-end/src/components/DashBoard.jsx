import React from 'react'
import { Container, PageWrapper } from '../Style/GlobalStyle';
import Typography from '../Style/Typography';
import { CardsWrapper, ChartsWrapper, HeadingWrapper } from '../Style/Dashboard/Style';
import Card from './Card';
import CardFetcher from './CardFetcher';
import Tempracture from './Charts/Tempracture';
import Humidity from './Charts/Humidity';
import Notifications from '../Sections/Notifications';

export default function DashBoard() {
    return (
        <>
            <PageWrapper>
                <Container>
                    <HeadingWrapper>
                        <Typography variant="h1">Dashboard</Typography>
                        <Typography variant="p">Our AI-powered Bee Monitoring Dashboard provides real-time insights into hive conditions and bee activity. It collects and visualizes key data points such as bee status, hive health, temperature, humidity, and distance detection to ensure optimal hive management. With interactive charts and analytics, beekeepers can track environmental changes, detect anomalies, and make data-driven decisions to enhance bee productivity and well-being.</Typography>
                    </HeadingWrapper>
                    <CardsWrapper>
                       <Card/>
                       <ChartsWrapper>
                            <Tempracture />
                            <Humidity/>
                        </ChartsWrapper>
                    </CardsWrapper>
                </Container>
            </PageWrapper>
            {/* <Notifications/> */}
        </>
    )
}
