import React from 'react'
import { Button, Container, Figure, Image, PageWrapper } from '../Style/GlobalStyle'
import { Left, Right, Wrapper } from '../Style/404/Style'
import Typography from '../Style/Typography'
import Images from '../../../front-end/src/assets/images/404.jpg'

export default function NotFound() {
    return (
        <>
            <PageWrapper>
                <Container>
                    <Wrapper>
                        <Left>
                            <Figure>
                                <Image src={Images} alt='ff' width={629} height={481} />
                            </Figure>
                    </Left>
                    <Right>
                    <Typography variant="h1">40<span style={{color:'green'}}>4</span></Typography>
                    <Typography variant="h1" style={{fontSize:'32px'}}>Oops! It looks like you're lost.</Typography>
                    <Typography variant="p">The page you're looking for isn't available. Try to search again or use the go to.</Typography>
                    <Button>Go back to home</Button>
                    </Right>
                    </Wrapper>
                </Container>
            </PageWrapper>
        </>
    )
}
