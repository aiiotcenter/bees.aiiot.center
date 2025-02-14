import React, { useState } from 'react';
import { DetailWrapper, IL, ImageWrapper, IR, IRIcon, IRIconWrapper, IRUpload, Wrapper } from '../../Style/Profile/Card';
import Typography from '../../Style/Typography';
import { Figure, FormWrapper, Image, Input, InputGroup, Label, Button, ErrorText } from '../../Style/GlobalStyle';
import { FiArrowUpRight } from "react-icons/fi";

export default function Card() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    country: '',
  });

  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.country) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, image: "Only image files are allowed" }));
        return;
      }
      if (file.size > 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "File size must be less than 1MB" }));
        return;
      }

      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted", formData);
      // Add save logic here (e.g., API call)
    }
  };

  return (
    <Wrapper>
      <Typography variant="h3">Profile Details</Typography>
      <DetailWrapper>
        <ImageWrapper>
          <IL>
            <Figure>
              <Image 
                src={imagePreview || "https://via.placeholder.com/90"} 
                alt="User" 
                width={90} 
                height={90} 
                style={{ borderRadius: '50%' }} 
              />
            </Figure>
          </IL>
          <IR>
            <IRIconWrapper>
              <IRIcon>
                📷
              </IRIcon>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="upload" />
              <IRUpload htmlFor="upload">Upload Image</IRUpload>
            </IRIconWrapper>
            {errors.image && <ErrorText>{errors.image}</ErrorText>}
          </IR>
        </ImageWrapper>
      </DetailWrapper>

      <FormWrapper onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Username</Label>
          <Input type='text' name="username" placeholder='Enter username' value={formData.username} onChange={handleInputChange} />
          {errors.username && <ErrorText>{errors.username}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Email Address</Label>
          <Input type='email' name="email" placeholder='Enter email' value={formData.email} onChange={handleInputChange} />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Phone Number</Label>
          <Input type='tel' name="phone" placeholder='Enter phone number' value={formData.phone} onChange={handleInputChange} />
          {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Country</Label>
          <Input type='text' name="country" placeholder='Enter country' value={formData.country} onChange={handleInputChange} />
          {errors.country && <ErrorText>{errors.country}</ErrorText>}
        </InputGroup>

        <Button type="submit" onClick={handleSubmit}>
          Save <FiArrowUpRight />
        </Button>
      </FormWrapper>
    </Wrapper>
  );
}
