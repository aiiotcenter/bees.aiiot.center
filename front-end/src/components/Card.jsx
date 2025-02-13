import React, { useEffect, useState } from 'react';
import { Box, DetailWrapper, Icon, Left, PlaceHolder, Right, TextWrapper, Wrapper } from '../Style/Card/Style';
import Typography from '../Style/Typography';

export default function Card() {
    const [apiData, setApiData] = useState([]);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://bees-backend.aiiot.center/api/data');
                if (response.ok) {
                    const data = await response.json();
                    console.log("API Response:", data); // Log full response for debugging
                    setApiData(data || []); // Ensure valid state
                } else {
                    console.error('Failed to fetch data.');
                }
            } catch (error) {
                console.error('Error fetching data.', error);
            }
        };

        fetchData();
    }, []);

    // Function to calculate the average of a given field
    const calculateAverage = (field) => {
        if (!apiData.length) return 0; // Ensure there's data
        const sum = apiData.reduce((acc, item) => acc + (item[field] || 0), 0);
        return (sum / apiData.length).toFixed(2); // Return average with two decimal places
    };

    // Data mapping for card display
    const cardInfo = [
        { title: "Average Temperature", field: "temperature", icon: "temperature.svg" },
        { title: "Average Humidity", field: "humidity", icon: "humidity.svg" },
        { title: "Average Weight", field: "weight", icon: "weight.svg" },
        { title: "Average Distance", field: "distance", icon: "distance.svg" }
    ];

    return (
        <Wrapper>
            {cardInfo.map((card, index) => (
                <Box key={index}>
                    <DetailWrapper>
                        <Left>
                            <Typography variant="p">{card.title}</Typography>
                            {console.log('Data',card.title)}
                            <Typography variant="h2">{calculateAverage(card.field)}</Typography> {/* Display computed average */}
                            <TextWrapper>
                                <Typography variant="span" style={{ color: '#5aa75a' }}>
                                     {apiData.length}
                                </Typography>
                                <Typography variant="p" style={{ fontSize: '15px' }}>
                                    Updated Now
                                </Typography>
                            </TextWrapper>
                        </Left>
                        <Right>
                            <Icon>
                                <img src={`/assets/icons/${card.icon}`} width="40" height="40" alt={card.title} />
                                <PlaceHolder></PlaceHolder>
                            </Icon>
                        </Right>
                    </DetailWrapper>
                </Box>
            ))}
        </Wrapper>
    );
}
