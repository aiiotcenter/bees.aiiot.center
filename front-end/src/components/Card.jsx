import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Box, DetailWrapper, Icon, Left, PlaceHolder, Right, TextWrapper, Wrapper } from '../Style/Card/Style';
import Typography from '../Style/Typography';
import { GiBee } from "react-icons/gi";
import { MdHive } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { FaWeight } from "react-icons/fa";

export default function Card() {
    const [apiData, setApiData] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://bees-backend.aiiot.center/api/data');
                if (response.ok) {
                    const data = await response.json();
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

    const cardInfo = [
        { title: "Bee Status", field: "sound_status", icon: <GiBee size={40} color="#000" />, customValue: calculateBeeStatus() },
        { title: "Hive Status", field: "humidity", icon: <MdHive size={40} color="#000" /> },
        { title: "Distance Detection", field: "weight", icon: <GiPathDistance size={40} color="#000" /> },
        { title: "Hive Weight", field: "distance", icon: <FaWeight size={40} color="#000" /> }
    ];

    const handleBoxClick = (field) => {
        const selectedData = apiData.map(item => ({ field: item[field] }));
        navigate('/details', { state: { selectedData } }); // Redirect with data
    };

    return (
        <Wrapper>
            {cardInfo.map((card, index) => (
                <Box key={index} onClick={() => handleBoxClick(card.field)} style={{ cursor: "pointer" }}>
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
