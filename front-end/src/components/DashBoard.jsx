import React, { useState, useEffect } from 'react';
import { Container, PageWrapper, Button } from '../Style/GlobalStyle';
import Typography from '../Style/Typography';
import { CardsWrapper, ChartsWrapper, HeadingWrapper } from '../Style/Dashboard/Style';
import Card from './Card';
import Tempracture from './Charts/Tempracture';
import Humidity from './Charts/Humidity';
import Modal from './Modal/Modal';
import DataModel from './DataModel';

export default function DashBoard() {
    const [modalOpen, setModalOpen] = useState(false);

    // Use effect to handle modal visibility on first page load
    useEffect(() => {
        // Check if it's the first time the user is visiting the page
        const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
        
        // If not visited before, show modal and set localStorage flag
        if (!hasVisitedBefore) {
            setModalOpen(true);
            localStorage.setItem('hasVisitedBefore', 'true');
        }
    }, []);

    return (
        <>
            <PageWrapper>
                <Container>
                    <HeadingWrapper>
                        <Typography variant="h1">Dashboard</Typography>
                        <Typography variant="p">
                            Our AI-powered Bee Monitoring Dashboard provides real-time insights into hive conditions and bee activity. 
                            It collects and visualizes key data points such as bee status, hive health, temperature, humidity, and distance detection 
                            to ensure optimal hive management. With interactive charts and analytics, beekeepers can track environmental changes, 
                            detect anomalies, and make data-driven decisions to enhance bee productivity and well-being.
                        </Typography>
                    </HeadingWrapper>

                    <CardsWrapper>
                        <Card />
                        {/* <Button onClick={() => setModalOpen(true)}>Open Modal</Button> */}
                        <ChartsWrapper>
                            <Tempracture />
                            <Humidity />
                        </ChartsWrapper>
                    </CardsWrapper>
                </Container>
            </PageWrapper>

            {/* Modal is displayed when modalOpen is true */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title=" "
                content={<DataModel />}
            />
        </>
    );
}
