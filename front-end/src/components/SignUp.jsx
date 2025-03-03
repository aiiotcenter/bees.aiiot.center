import React, { useState } from "react";
import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import { Container, Form, Input, InputGroup, Label, PageWrapper, ErrorText } from "../Style/Login/Style";
import Typography from "../Style/Typography";
import { Button } from "../Style/GlobalStyle";

const poolData = {
  UserPoolId: "eu-west-2_K6L5O2HfY", // Replace with your User Pool ID
  ClientId: "4njc2pp1cpfi7ecmspudfvggf4", // Replace with your App Client ID
};
const userPool = new CognitoUserPool(poolData);

export default function SignUp() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const [cognitoUser, setCognitoUser] = useState(null); // ✅ Store user instance
  const navigate = useNavigate();

  // ✅ Handle Sign-Up
  const onSubmit = (event) => {
    event.preventDefault();
    const emailInput = event.target.email.value;
    const passwordInput = event.target.password.value;

    setEmail(emailInput); // Store email for verification step

    userPool.signUp(emailInput, passwordInput, [], null, (err, result) => {
      if (err) {
        console.error("Sign Up Error:", err.message);
        return;
      }
      console.log("Sign Up Success:", result);
      setCognitoUser(result.user); // ✅ Store the Cognito user instance
      setIsRegistered(true); // ✅ Move to verification step
    });
  };

  // ✅ Handle Confirmation Code Submission
  const confirmSignUp = () => {
    if (!cognitoUser) {
      console.error("User instance not found!");
      return;
    }

    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        console.error("Verification Error:", err.message);
        return;
      }
      console.log("Verification Success:", result);
      navigate("/login"); // ✅ Redirect to login after confirmation
    });
  };

  return (
    <PageWrapper>
      <Typography variant="h1">Sign Up</Typography>
      
      {!isRegistered ? (
        <>
          <Container>
            <Form onSubmit={onSubmit}>
              <InputGroup>
                <Label>Email Address</Label>
                <Input placeholder="your-email@example.com" type="email" name="email" required />
              </InputGroup>

              <InputGroup>
                <Label>Password</Label>
                <Input placeholder="Enter your password" type="password" name="password" required />
              </InputGroup>

              <Button type="submit">Sign Up</Button>
            </Form>
          </Container>
        </>
      ) : (
        <>
          <Typography variant="h2">Enter Verification Code</Typography>
          <Typography variant="p" style={{ paddingBottom: "0px", textAlign:'left' }}>A verification code has been sent to {email}. Please enter it below.</Typography>

          <Container>
            <InputGroup style={{marginBottom:'10px'}}>
              <Label>Verification Code</Label>
              <Input 
                placeholder="Enter 6-digit code" 
                type="text" 
                value={verificationCode} 
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </InputGroup>
            <Button onClick={confirmSignUp}>Confirm Sign Up</Button>
          </Container>
        </>
      )}
    </PageWrapper>
  );
}
