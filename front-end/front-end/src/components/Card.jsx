import React from 'react';
import { Box, DetailWrapper, Icon, Left, PlaceHolder, Right, TextWrapper, Wrapper } from '../Style/Card/Style';
import Typography from '../Style/Typography';
import cardData from '../api/Card.json';

export default function Card() {
    return (
        <Wrapper>
            {cardData.cards.map((card, index) => (
                <Box key={index}>
                    <DetailWrapper>
                        <Left>
                            <Typography variant="p">{card.title}</Typography>
                            <Typography variant="h2">{card.count}</Typography>
                            <TextWrapper>
                                <Typography variant="span" style={{ color: '#5aa75a' }}>
                                    {card.newCount}
                                </Typography>
                                <Typography variant="p" style={{ fontSize: '15px' }}>
                                    {card.newLabel}
                                </Typography>
                            </TextWrapper>
                        </Left>
                        <Right>
                            <Icon>
                                <img src={`../../src/assets/icons/${card.icon}`}  width="40" height="40" />
                                <PlaceHolder></PlaceHolder>
                            </Icon>
                        </Right>
                    </DetailWrapper>
                </Box>
            ))}
        </Wrapper>
    );
}
