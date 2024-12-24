import React from 'react';
import Logo from "../assets/images/bee-keeping-logo.png"
import LoginForm from '../components/LoginForm';
import { PageWrapper, Wrapper, LoginDetail, Figure, Image, H1, P, LoginFormContainer, LoginFormText, LoginFormHeading, LoginFormFigure, LoginFormLogo } from '../style/login/style';
import FormLogo from '../assets/images/RcaiotLogo.png';

export default function LoginPage() {
	return (
		<>
			<Wrapper>
				<PageWrapper>
					<LoginDetail>
						<Figure>
							<Image src={Logo} alt="" width="" height="" />
						</Figure>
						<H1>Welcome to Smart Bee keeping</H1>
						<P>Monitor your hive health and bee behavior with our AI-powered solutions. Smart beekeeping
							combines
							traditional apiculture with advanced technology, using AI and IoT devices to monitor bee health,
							hive conditions, and productivity in real-time. This data-driven approach enhances beekeeping
							efficiency, detects diseases early, and promotes healthier bee populations and better honey
							yields.
						</P>
					</LoginDetail>
					<LoginFormContainer>
						{/* <LoginFormHeading style={{color:'#6f2036'}}>Bee keeping</LoginFormHeading>
						<LoginFormText>Login into your pages account</LoginFormText> */}
						<LoginFormFigure>
							<LoginFormLogo src={FormLogo} alt=''/>
						</LoginFormFigure>
						<LoginForm />
					</LoginFormContainer>
				</PageWrapper>
			</Wrapper>
		</>
	)
}
