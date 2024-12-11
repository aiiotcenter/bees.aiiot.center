import React from 'react'
import Box from '../components/Box'
import Temperature from '../components/Temperature'
import Humidity from '../components/Humidity'
import { Container } from '../style/common/style'


export default function HomePage() {
	return (
		<>
			<Container>
				<Temperature/>
				<Box />
				<Humidity/>
			</Container>
			
		</>
	)
}
