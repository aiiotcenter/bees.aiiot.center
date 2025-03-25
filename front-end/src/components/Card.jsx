import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Box, DetailWrapper, Icon, Left, PlaceHolder, Right, TextWrapper, Wrapper } from '../Style/Card/Style';
import Typography from '../Style/Typography';
import { GiBee } from "react-icons/gi";
import { MdHive } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { FaWeight } from "react-icons/fa";


export default function Card() {
    const [apiData, setApiData] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [updateCounter, setUpdateCounter] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastDataHash, setLastDataHash] = useState('');

    const timerRef = useRef(null);
    const navigate = useNavigate();

    // Create a simple hash function to compare data
    const hashData = (data) => {
        if (!Array.isArray(data) || data.length === 0) return '';
        return JSON.stringify(data);
    };

    useEffect(() => {
        let abortController = new AbortController();

        fetchData(abortController.signal);

        timerRef.current = setInterval(() => {
            fetchData(abortController.signal);
        }, 5000); // Poll every 5 seconds

        return () => {
            clearInterval(timerRef.current);
            abortController.abort();
        };
    }, []);

    const fetchData = useCallback(async (signal) => {
        try {
            setError(null);

            const response = await fetch(`https://bees-backend.aiiot.center/api/data?t=${new Date().getTime()}`, {
                method: 'GET',
                headers: { 'Cache-Control': 'no-cache' },
                signal,
            });

            if (!response.ok) throw new Error(`API error: ${response.status}`);

            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                // Calculate hash of the new data
                const newDataHash = hashData(data);

                // Only update state if data has changed
                if (newDataHash !== lastDataHash) {
                    console.log("Data changed, updating UI");
                    setApiData(data);
                    setLastUpdated(new Date());
                    setUpdateCounter(prev => prev + 1);
                    setLastDataHash(newDataHash);
                    console.log("Latest Data Entry:", data[data.length - 1]);
                } else {
                    console.log("No data change detected, skipping update");
                }
            } else {
                console.warn("API returned empty or invalid data:", data);
                if (apiData.length > 0) {
                    // Only update if we're going from data to no data
                    setApiData([]);
                    setLastDataHash('');
                }
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Error fetching live data:", error);
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    }, [apiData, lastDataHash]);

    const calculateAverage = (field) => {
        if (!Array.isArray(apiData) || apiData.length === 0) return 0; 
        const sum = apiData.reduce((acc, item) => acc + (item[field] || 0), 0);
        return (sum / apiData.length).toFixed(2);
    };

    const calculatePercentageActiveBees = () => {
        const activeBees = apiData.filter(item => item.sound_status === 1).length;
        return ((activeBees / apiData.length) * 100).toFixed(2);
    };

    const getTimeAgoText = () => {
        if (!lastUpdated) return "Just now";
        const seconds = Math.floor((new Date() - lastUpdated) / 1000);
        return seconds < 60 ? `${seconds} sec ago` : `${Math.floor(seconds / 60)} min ago`;
    };

    const cardInfo = [
        { 
            title: "Bee Activity Status", 
            field: "sound_status", 
            icon: <GiBee size={40} color="#000" />, 
            customValue: calculatePercentageActiveBees() + "%" 
        },
        { 
            title: "Hive Status", 
            field: "humidity", 
            icon: <MdHive size={40} color="#000" />, 
            customValue: calculateAverage("humidity") + " %"
        },
        { 
            title: "Distance Detection", 
            field: "distance", 
            icon: <GiPathDistance size={40} color="#000" />, 
            customValue: calculateAverage("distance") + " m"
        },
        { 
            title: "Hive Weight", 
            field: "weight", 
            icon: <FaWeight size={40} color="#000" />, 
            customValue: calculateAverage("weight") + " kg"
        }
    ];

    const handleBoxClick = (field, title) => {
        if (!Array.isArray(apiData) || apiData.length === 0) return;

        const selectedData = apiData.map((item, index) => ({
            id: index + 1,
            value: item[field],
            dateTime: new Date(item.created_at || Date.now()).toLocaleString(),
            status: item[field] > 50 ? "Active" : "Inactive"
        }));

        navigate('/details', { state: { selectedData, title } });
    };

    return (
        <Wrapper>
            {loading ? (
                <Typography variant="h3">Loading...</Typography>
            ) : error ? (
                <Typography variant="h3" style={{ color: "red" }}>{error}</Typography>
            ) : !Array.isArray(apiData) || apiData.length === 0 ? (
                <Typography variant="h3">No data available</Typography>
            ) : (
                cardInfo.map((card, index) => (
                    <Box key={index} onClick={() => handleBoxClick(card.field, card.title)} style={{ cursor: "pointer" }}>
                        <DetailWrapper>
                            <Left>
                                <Typography variant="p">{card.title}</Typography>
                                <Typography variant="h2">
                                    {card.customValue}
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
                ))
            )}
        </Wrapper>
    );
}
