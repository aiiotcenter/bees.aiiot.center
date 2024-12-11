import React from 'react';
import Live from '../components/live/Live'
import { Container, LiveWrapper } from '../style/live/style';

export default function LivePage() {
  return (
    <>
      <Container>
        <LiveWrapper>
          <Live />
        </LiveWrapper>
      </Container>
    </>
  )
}
