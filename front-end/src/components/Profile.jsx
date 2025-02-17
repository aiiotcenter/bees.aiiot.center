import React from 'react'
import { Wrapper } from '../Style/Profile/Style';
import Typography from '../Style/Typography';
import { Container, PageWrapper } from '../Style/GlobalStyle';
import Card from './Profile/Card';

export default function Profile() {
    return (
        <>
        <PageWrapper>
            <Container>
                <Wrapper>
                    <Typography variant="h1">My Profile</Typography>
                    <Typography variant="p" style={{margin:'0'}}>Welcome to your profile dashboard! Easily manage your personal details, including your photo, name, email, phone number, and country. Keep your information up to date for a seamless experience!</Typography>
                </Wrapper>
                <Card/>
            </Container>
            </PageWrapper>
        </>
    )
}
