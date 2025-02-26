import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom"; // ✅ Use Link & useNavigate
import { 
  Container, Form, Input, InputGroup, Label, PageWrapper, 
  PaymentBox, PaymentWrapper, ErrorText 
} from "../Style/Login/Style";
import Typography from "../Style/Typography";
import { Button } from "../Style/GlobalStyle";

// ✅ Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Login({ setIsAuthenticated }) {
  const [isAuthenticated, setAuthState] = useState(false); 
  const navigate = useNavigate(); // ✅ Hook for navigation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // ✅ Handle form submission
  const onSubmit = (data) => {
    console.log("Login data:", data);
    setAuthState(true); // ✅ Simulating authentication
    setIsAuthenticated(true); // ✅ Updating authentication state
    navigate("/dashboard"); // ✅ Programmatic navigation
  };

  return (
    <PageWrapper>
      <Typography variant="h1">Log In</Typography>
      <Typography variant="p" style={{ textAlign: "center" }}>
        Welcome back! Please enter your details to continue.
      </Typography>
      
      <Container>
        <Typography variant="h2">We’re glad to see you again!</Typography>
        <Typography variant="p" style={{ textAlign: "center", marginBottom: "20px" }}>
          Don't have an account?{" "}
          <Link to="/sign-up" style={{ color: "#1967D2", fontWeight: "bold" }}>
            Sign Up!
          </Link>
        </Typography>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label>Email Address</Label>
            <Input 
              placeholder="your-email@example.com" 
              type="email" 
              {...register("email")}
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <Input 
              placeholder="Enter your password" 
              type="password" 
              {...register("password")}
            />
            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          </InputGroup>

          {/* ✅ Button now redirects using navigate */}
          <Button type="submit">Login</Button>
        </Form>

        {/* OR with Horizontal Lines */}
        <Typography 
          variant="p" 
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <span style={{ flex: 1, height: "1px", backgroundColor: "#ccc", marginRight: "10px" }}></span>
          OR
          <span style={{ flex: 1, height: "1px", backgroundColor: "#ccc", marginLeft: "10px" }}></span>
        </Typography>

        <PaymentWrapper>
          <PaymentBox variant="second">Continue with Google</PaymentBox>
        </PaymentWrapper>
      </Container>
    </PageWrapper>
  );
}
