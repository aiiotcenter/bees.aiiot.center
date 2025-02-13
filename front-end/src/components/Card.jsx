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
                    console.log("API Response:", data); 
                    setApiData(data || []);
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
        if (!apiData.length) return 0; 
        const sum = apiData.reduce((acc, item) => acc + (item[field] || 0), 0);
        return (sum / apiData.length).toFixed(2);
    };

    // Define Bee Status based on sound activity
    const calculateBeeStatus = () => {
        if (!apiData.length) return "Unknown";
        const activeBees = apiData.filter(item => item.sound_status === 1).length;
        const percentage = ((activeBees / apiData.length) * 100).toFixed(2);
        return `${percentage}%`;
    };

    // Updated card data
    const cardInfo = [
        { title: "Bee Status", field: "sound_status", icon: "service.svg", customValue: calculateBeeStatus() },
        { title: "Hive Status", field: "humidity", icon: "success 2.svg" },
        { title: "Distance Detection", field: "weight", icon: "sandclock 1.svg" },
        { title: "Hive Weight", field: "distance", icon: "review.svg" }

        
    ];

    return (
        <Wrapper>
            {cardInfo.map((card, index) => (
                <Box key={index}>
                    <DetailWrapper>
                        <Left>
                            <Typography variant="p">{card.title}</Typography>
                            <Typography variant="h2">
                                {card.customValue ? card.customValue : calculateAverage(card.field)}
                            </Typography>
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
                                <img src={`../../src/assets/icons/${card.icon}`} width="40" height="40" alt={card.title} />
                                <PlaceHolder></PlaceHolder>
                            </Icon>
                        </Right>
                    </DetailWrapper>
                </Box>
            ))}
        </Wrapper>
    );
}
