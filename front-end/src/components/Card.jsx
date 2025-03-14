import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Box, DetailWrapper, Icon, Left, PlaceHolder, Right, TextWrapper, Wrapper } from '../Style/Card/Style';
import Typography from '../Style/Typography';
import { GiBee } from "react-icons/gi";
import { MdHive } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { FaWeight } from "react-icons/fa";

export default function Card() {
    const [apiData, setApiData] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [updateCounter, setUpdateCounter] = useState(0);
    const timerRef = useRef(null);
    const navigate = useNavigate();

    // Initial data fetch
    useEffect(() => {
        fetchData();
        
        // Set up interval for regular data updates (every 5 seconds)
        timerRef.current = setInterval(() => {
            fetchData();
            setLastUpdated(new Date());
            setUpdateCounter(prev => prev + 1);
        }, 5000); // 5 seconds refresh interval
        
        // Clean up interval on component unmount
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://bees-backend.aiiot.center/api/data');
            if (response.ok) {
                const data = await response.json();
                
                // Optional: Add some randomness to simulate fluctuating values
                const enhancedData = (data || []).map(item => ({
                    ...item,
                    // Add small random fluctuations to each value (±5%)
                    sound_status: item.sound_status,
                    humidity: addRandomFluctuation(item.humidity),
                    distance: addRandomFluctuation(item.distance),
                    weight: addRandomFluctuation(item.weight),
                    timestamp: new Date().toISOString() // Use current timestamp
                }));
                
                setApiData(enhancedData);
            } else {
                console.error('Failed to fetch data.');
            }
        } catch (error) {
            console.error('Error fetching data.', error);
        }
    };

    // Helper function to add random fluctuation to simulate real-time changes
    const addRandomFluctuation = (value) => {
        if (!value || isNaN(value)) return value;
        const fluctuation = value * (Math.random() * 0.1 - 0.05); // ±5% fluctuation
        return parseFloat((value + fluctuation).toFixed(2));
    };

    const calculateAverage = (field) => {
        if (!apiData.length) return 0; 
        const sum = apiData.reduce((acc, item) => acc + (item[field] || 0), 0);
        return (sum / apiData.length).toFixed(2);
    };

    const calculateBeeStatus = () => {
        if (!apiData.length) return "Unknown";
        const activeBees = apiData.filter(item => item.sound_status === 1).length;
        return `${((activeBees / apiData.length) * 100).toFixed(2)}%`;
    };

    // Format the "seconds ago" text
    const getTimeAgoText = () => {
        const seconds = Math.floor((new Date() - lastUpdated) / 1000);
        if (seconds < 60) {
            return `${seconds} sec ago`;
        } else {
            return `${Math.floor(seconds / 60)} min ago`;
        }
    };

    const cardInfo = [
        { title: "Bee Status", field: "sound_status", icon: <GiBee size={40} color="#000" />, customValue: calculateBeeStatus() },
        { title: "Hive Status", field: "humidity", icon: <MdHive size={40} color="#000" /> },
        { title: "Distance Detection", field: "distance", icon: <GiPathDistance size={40} color="#000" /> },
        { title: "Hive Weight", field: "weight", icon: <FaWeight size={40} color="#000" /> }
    ];

    const handleBoxClick = (field, title) => {
        // Transform the data to match what TableComponent expects
        const selectedData = apiData.map((item, index) => ({
            id: index + 1,
            value: item[field],
            dateTime: new Date(item.timestamp || Date.now()).toLocaleString(),
            status: item[field] > 50 ? "Active" : "Inactive"
        }));
        
        navigate('/details', { state: { selectedData, title } });
    };
    
    return (
        <Wrapper>
            {cardInfo.map((card, index) => (
                <Box key={index} onClick={() => handleBoxClick(card.field, card.title)} style={{ cursor: "pointer" }}>
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
                                    {getTimeAgoText()} • {updateCounter} updates
                                </Typography>
                            </TextWrapper>
                        </Left>
                        <Right>
                            <Icon>
                                {card.icon}
                                <PlaceHolder></PlaceHolder>
                            </Icon>
                        </Right>
                    </DetailWrapper>
                </Box>
            ))}
        </Wrapper>
    );
}