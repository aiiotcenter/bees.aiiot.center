import React from 'react'
import { Container, Figure, Image, Text, Button, H2} from '../../style/missing/Style'

export default function Missing() {
  return (
    <>
        <Container>
          <Figure>
            <Image src='https://templates.iqonic.design/instadash/html/assets/images/error/404.png' alt='404' width={794} height={561} />
          </Figure>
          <H2>Oops! This Page is Not Found.</H2>
          <Text>The requested page dose not exist.</Text>
          
        </Container>
    </>
  )
}
