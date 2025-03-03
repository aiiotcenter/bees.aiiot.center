import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { Container, Form, Input, InputGroup, Label, PageWrapper, ErrorText } from "../Style/Login/Style";
import Typography from "../Style/Typography";
import { Button } from "../Style/GlobalStyle";
import { CognitoUserPool } from "amazon-cognito-identity-js";

// AWS Cognito Configuration
const userPool = new CognitoUserPool({
  UserPoolId: "eu-west-2_K6L5O2HfY", // Your Cognito User Pool ID
  ClientId: "4njc2pp1cpfi7ecmspudfvggf4", // Your Cognito App Client ID
});

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Login({ setIsAuthenticated }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  // Login Function
  const onSubmit = (data) => {
    const { email, password } = data;

    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log("Login successful:", result);
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
        navigate("/dashboard"); // Redirect to dashboard
      },
      onFailure: (err) => {
        setError(err.message);
      },
    });
  };

  return (
    <PageWrapper>
      <Typography variant="h1">Log In</Typography>
      <Container>
        <Typography variant="h2">Welcome Back!</Typography>

        {error && <ErrorText>{error}</ErrorText>} {/* Show error if any */}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label>Email</Label>
            <Input type="email" {...register("email")} placeholder="you@example.com" />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <Input type="password" {...register("password")} placeholder="Enter your password" />
            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          </InputGroup>

          <Button type="submit">Login</Button>
        </Form>

        <Typography variant="p" style={{ textAlign: "center", marginTop: "10px" }}>
          Don't have an account?{" "}
          <Link to="/sign-up" style={{ color: "#1967D2", fontWeight: "bold" }}>Sign Up</Link>
        </Typography>
      </Container>
    </PageWrapper>
  );
}
