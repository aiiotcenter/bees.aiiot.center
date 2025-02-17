import React, { useState, useRef } from "react";
import { DetailWrapper, IL, ImageWrapper, IR, IRIconWrapper, IRUpload, Wrapper, ButtonWrapper } from "../../Style/Profile/Card";
import Typography from "../../Style/Typography";
import { Figure, FormWrapper, Image, Input, InputGroup, Label, Button, ErrorText } from "../../Style/GlobalStyle";
import { FiArrowUpRight } from "react-icons/fi";

export default function Card() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    country: "",
    imageFile: null, // Store the actual image file
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150");
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple clicks

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors({ image: "Only image files are allowed" });
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ image: "File size must be less than 2MB" });
        return;
      }

      setFormData((prev) => ({ ...prev, imageFile: file }));
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.imageFile) newErrors.image = "Profile image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setIsSubmitting(false); // Enable button if validation fails
      return;
    }

    setIsSubmitting(true); // Disable button to prevent multiple clicks

    const submittedData = new FormData();
    submittedData.append("username", formData.username);
    submittedData.append("email", formData.email);
    submittedData.append("phone", formData.phone);
    submittedData.append("country", formData.country);
    submittedData.append("image", formData.imageFile);

    console.log("🔹 Submitted Data:");
    console.log("Username:", formData.username);
    console.log("Email:", formData.email);
    console.log("Phone:", formData.phone);
    console.log("Country:", formData.country);
    console.log("Image File:", formData.imageFile ? formData.imageFile.name : "No image selected");

    // Simulating API call delay
    setTimeout(() => {
      console.log("✅ Form successfully submitted!");
      setIsSubmitting(false); // Re-enable button after submission
    }, 2000);
  };

  return (
    <Wrapper>
      <Typography variant="h3">Profile Details</Typography>

      <DetailWrapper>
        <ImageWrapper>
          <IL>
            <Figure>
              <Image 
                src={imagePreview} 
                alt="Profile" 
                width={90} 
                height={90} 
                style={{ borderRadius: "50%" }} 
              />
            </Figure>
          </IL>
          <IR>
            <IRIconWrapper>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                style={{ display: "none" }} 
              />
              <IRUpload onClick={handleUploadClick}>Upload Image</IRUpload>
            </IRIconWrapper>
            {errors.image && <ErrorText>{errors.image}</ErrorText>}
          </IR>
        </ImageWrapper>
      </DetailWrapper>

      <FormWrapper onSubmit={handleSubmit}>
        {["username", "email", "phone", "country"].map((field) => (
          <InputGroup key={field}>
            <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <Input 
              type={field === "email" ? "email" : field === "phone" ? "tel" : "text"} 
              name={field} 
              placeholder={`Enter ${field}`} 
              value={formData[field]} 
              onChange={handleInputChange} 
            />
            {errors[field] && <ErrorText>{errors[field]}</ErrorText>}
          </InputGroup>
        ))}

        <ButtonWrapper>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"} <FiArrowUpRight />
          </Button>
        </ButtonWrapper>
      </FormWrapper>
    </Wrapper>
  );
}
