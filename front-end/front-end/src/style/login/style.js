// src/style/login/style.js
import styled from 'styled-components';

// Styled components for styling the login page
export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #f4f4f4;
  background-image: url('https://mhkit.rometheme.pro/madoe/wp-content/uploads/sites/21/2022/12/the-beekeeper-uses-a-bee-brush-the-process-of-har-2022-01-18-23-45-28-E6HA8BP-1536x1024.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: lch(1 4.13 285.26 / 0.42);
    z-index: -1;
  }
`;

export const PageWrapper = styled.div`
  max-width: 1320px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 15px;
  flex-direction: row;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const LoginDetail = styled.div`
  max-width: 660px;
  width: 100%;
  padding: 10px 30px 10px 0;
  text-align: left;
`;

export const LoginFormContainer = styled.div`
  padding: 40px 30px;
  width: 100%;
  max-width: 660px;
  background-color: #fff;
  border-radius: 2px;
  height: auto;
`;

export const LoginFormHeading = styled.h2`
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 5px;
  /* color: #6f2036; */
  color: ${({ theme }) => (theme === 'light' ? '#6f2036' : '#fff')};
  text-transform: capitalize;

`;

export const LoginFormText = styled.p`
  font-size: 18px;
  text-align: center;
  padding-bottom: 40px;
	

`;

export const LoginFormFigure = styled.figure`
  margin: 0px;

`;
export const LoginFormLogo = styled.img`
    width: 410px;
    margin-bottom: 40px;
    display: block;
    margin-left: auto;
    margin-right: auto; 

`;

export const Figure = styled.figure`
  margin-bottom: 20px;

	@media screen and (max-width: 767px) {
		justify-content: center;
		display: flex;
	}
`;

export const Image = styled.img`
  width: 200px;
  display: flex;
  justify-content: flex-start;
  margin: 0;
`;

export const H1 = styled.h1`
  font-size: 36px;
  padding-bottom: 10px;
  color: #fff;
	@media screen and (max-width: 767px) {
		display: none;
  }
`;

export const P = styled.p`
  font-size: 16px;
  color: #fff;
  font-weight: normal;
	@media screen and (max-width: 767px) {
		display: none;
  }
`;

export const Form = styled.form`
  font-size: 16px;
  color: #fff;
  font-weight: normal;
`;

export const InputBox = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

export const Label = styled.label`
  color: #333333;
  margin-bottom: 8px;

`;

export const CheckWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  gap: 5px;
  flex-direction: row;
`;

export const CheckBox = styled.div`
  display: flex;
  align-items: center;

  input {
    width: 24px;
    height: 16px;
    margin: 0;
    display: flex;
    justify-content: flex-start;
    margin-left: -2px;
  }

  label {
    color: #808080;
  }
`;

export const ForgetWrapper = styled.div``;

export const Direction = styled.a`
  color: #6f2036;
  font-size: 15px;
  margin-bottom: 5px;
  display: block;
  transition: all 0.3s ease-in-out;

  a {
    color: #6f2036;
    font-size: 15px;
    display: inline-block;
    transition: all 0.3s ease-in-out;
    margin-left: 3px;
  }
`;

export const Register = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Error = styled.p`
  color: red;
  font-size: 14px;
`;

export const ButtonWrapper = styled.div`
	button{

	}

  font-size: 17px;
  font-weight: 500;
  background-color: #6f2036;
  margin-bottom: 10px;

  &:focus {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px !important;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px !important;
    background: #980a25;
  }
`;
