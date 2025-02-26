import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { 
  Container, Form, Input, InputGroup, Label, PageWrapper, 
  PaymentBox, PaymentWrapper, ErrorText 
} from "../Style/Login/Style";
import Typography from "../Style/Typography";
import { Button } from "../Style/GlobalStyle";

// ✅ Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  username: yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function SignUp() {
  const [isRegistered, setIsRegistered] = useState(false); // Simulating registration status
  const navigate = useNavigate(); // To navigate between pages

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Handle form submission and simulate registration process
  const onSubmit = (data) => {
    console.log("SignUp Data:", data);
    // Simulate user registration (you can replace this with actual registration logic later)
    setIsRegistered(true); // Simulate successful registration

    if (isRegistered) {
      navigate("/login"); // Redirect to login page after successful registration
    }
  };

  return (
    <PageWrapper>
      <Typography variant="h1">Sign Up</Typography>
      <Typography variant="p">
        Join us and experience a seamless online journey with a great UX!
      </Typography>
      
      <Container>
        <Typography variant="h2">Create your account</Typography>
        <Typography variant="p">
          Already have an account? <span onClick={() => navigate("/login")}>Log In!</span>
        </Typography>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label>Name</Label>
            <Input 
              placeholder="John Doe" 
              type="text" 
              {...register("name")}
            />
            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Username</Label>
            <Input 
              placeholder="johndoe123" 
              type="text" 
              {...register("username")}
            />
            {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
          </InputGroup>

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

          <Button type="submit">Sign Up</Button>
        </Form>

        {/* OR Section with horizontal lines */}
        <Typography 
          variant="p" 
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <span style={{ flex: 1, height: "1px", backgroundColor: "#ccc" }}></span>
          OR
          <span style={{ flex: 1, height: "1px", backgroundColor: "#ccc" }}></span>
        </Typography>

        {/* Social SignUp Options */}
        <PaymentWrapper>
          <PaymentBox variant="second">Google</PaymentBox>
        </PaymentWrapper>
      </Container>
    </PageWrapper>
  );
}
