import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  ErrorText,
  FormWrapper,
  PageWrapper,
} from "../Style/GlobalStyle";
import {
  Content,
  Footer,
  Header,
  Main,
  Section,
  Wrapper,
} from "../Style/AIModal/Style";
import Typography from "../Style/Typography";
import { HeadingWrapper } from "../Style/Dashboard/Style";

export default function AIModel() {
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [beeCount, setBeeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const API_URL = "https://detect.roboflow.com/bee-detection-h59jf/1"; // Roboflow model endpoint
  const API_KEY = "GfNceoaR4aeKM6ihreVc";  // Your Roboflow API key

  // Function to convert the file to base64
  const loadImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadedImage(URL.createObjectURL(selectedFile)); // Show uploaded image
      setError(null);
      setProgress(0);
      setBeeCount(0);
      setProcessedImage(null); // Reset previous detection
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!file) {
      setError("Please select an image.");
      return;
    }
  
    try {
      setLoading(true);
      setError(null);
      setProgress(0);
  
      console.log("Uploading file...");
  
      // Convert the image to base64
      const image = await loadImageBase64(file);
  
      // Send the base64 image to Roboflow
      const response = await axios({
        method: "POST",
        url: API_URL,
        params: {
          api_key: API_KEY,
        },
        data: image,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });
  
      // Log the full API response to see its structure
      console.log("API Response:", response.data);
  
      // Check if the response contains the expected keys
      if (response.data && response.data.predictions) {
        const predictions = response.data.predictions;
  
        // Assuming the predictions contain the bees count
        setBeeCount(predictions.length); // Assuming each prediction represents a bee
        setProcessedImage(response.data.image_url); // Assuming there's an image_url in the response
  
        console.log(`Detected Bees Count: ${predictions.length}`);
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Error detecting bees:", error);
      setError("Failed to detect bees. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <PageWrapper>
      <Container>
        <HeadingWrapper style={{ marginBottom: "30px" }}>
          <Typography variant="h1">AI Bee Detection</Typography>
          <Typography variant="p">
            Upload an image to detect and count honey bees using AI.
          </Typography>
        </HeadingWrapper>

        <Wrapper>
          <Header>
            <Typography variant="h1">Bees Detection</Typography>
            {beeCount > 0 && (
              <div>
                <strong>🐝 Total Bees Detected: {beeCount}</strong>
              </div>
            )}
          </Header>

          <Section>
            {progress > 0 && progress < 100 && (
              <div style={{ width: "100%", backgroundColor: "#ccc", marginTop: "10px" }}>
                <div
                  style={{
                    width: `${progress}%`,
                    height: "8px",
                    backgroundColor: "#4caf50",
                    transition: "width 0.3s ease-in-out",
                  }}
                />
              </div>
            )}

            <Main>
              <Content>
                <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                  {/* Show uploaded image */}
                  {uploadedImage && (
                    <div>
                      <Typography variant="h3">Uploaded Image</Typography>
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        style={{ width: "100%", maxWidth: "250px", borderRadius: "10px" }}
                      />
                    </div>
                  )}

                  {/* Show processed image with detected bees */}
                  {processedImage && (
                    <div>
                      <Typography variant="h3">Detected Bees</Typography>
                      <img
                        src={processedImage}
                        alt="Detection Result"
                        style={{ width: "100%", maxWidth: "250px", borderRadius: "10px" }}
                      />
                    </div>
                  )}
                </div>
              </Content>
            </Main>

            <Footer>
              <FormWrapper onSubmit={handleSubmit}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "inline-block", padding: "10px", cursor: "pointer" }}
                />
                <Button type="submit" disabled={loading} style={{ marginLeft: "10px" }}>
                  {loading ? "Processing..." : "Detect Bees"}
                </Button>
              </FormWrapper>
            </Footer>
          </Section>

          {error && <ErrorText style={{ color: "red" }}>{error}</ErrorText>}
        </Wrapper>
      </Container>
    </PageWrapper>
  );
}
