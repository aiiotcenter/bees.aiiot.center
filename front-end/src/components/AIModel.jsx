import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
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
import Imageinsert from '../assets/images/image-insert.png'

export default function AIModel() {
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [beeCount, setBeeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const API_URL = "https://detect.roboflow.com/bee-detection-h59jf/1";
  const API_KEY = "GfNceoaR4aeKM6ihreVc";

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
      setUploadedImage(URL.createObjectURL(selectedFile));
      setError(null);
      setProgress(0);
      setBeeCount(0);
      setProcessedImage(null);
    }
  };

  // Clear/Remove image
  const handleClearImage = () => {
    setFile(null);
    setUploadedImage(null);
    setProcessedImage(null);
    setBeeCount(0);
    setError(null);
    setProgress(0);
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
        setBeeCount(predictions.length);
        setProcessedImage(response.data.image_url);
  
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
            <AnimatePresence>
              {beeCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <strong>🐝 Total Bees Detected: {beeCount}</strong>
                </motion.div>
              )}
            </AnimatePresence>
          </Header>

          <Section>
            {progress > 0 && progress < 100 && (
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                style={{ 
                  height: "8px", 
                  backgroundColor: "#78091e", 
                  marginTop: "10px" 
                }}
              />
            )}

            <Main>
              <Content>
                <div style={{ display: "flex", gap: "20px", justifyContent: "center", alignItems: "center" }}>
                  <AnimatePresence>
                    {uploadedImage ? (
                      <motion.div
                        key="uploaded-image"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div style={{ position: 'relative', textAlign: 'center' }}>
                          <Typography variant="h3">Uploaded Image</Typography>
                          <img
                            src={uploadedImage}
                            alt="Uploaded"
                            style={{ 
                              width: "100%", 
                              maxWidth: "250px", 
                              borderRadius: "10px",
                              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}
                          />
                          <Button 
                            type="button" 
                            onClick={handleClearImage}
                            style={{ 
                              marginTop: '10px', 
                              backgroundColor: '#ff4d4d', 
                              color: 'white' 
                            }}
                          >
                            Remove Image
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          width: "250px",
                          height: "250px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: "2px dashed #ccc",
                          borderRadius: "10px",
                          cursor: "pointer",
                          background: `url(${Imageinsert}) no-repeat center center`,
                          backgroundSize: "contain",
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{ opacity: 0, width: "100%", height: "100%", cursor: "pointer" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {processedImage && (
                      <motion.div
                        key="processed-image"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Typography variant="h3">Detected Bees</Typography>
                        <img
                          src={processedImage}
                          alt="Detection Result"
                          style={{ 
                            width: "100%", 
                            maxWidth: "250px", 
                            borderRadius: "10px",
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Content>
            </Main>

            <Footer>
              <FormWrapper onSubmit={handleSubmit}>
                <Button 
                  type="submit" 
                  disabled={loading || !uploadedImage} 
                  style={{ 
                    marginLeft: "10px", 
                    opacity: uploadedImage ? 1 : 0.5 
                  }}
                >
                  {loading ? "Processing..." : "Detect Bees"}
                </Button>
              </FormWrapper>
            </Footer>
          </Section>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ErrorText style={{ color: "red" }}>{error}</ErrorText>
              </motion.div>
            )}
          </AnimatePresence>
        </Wrapper>
      </Container>
    </PageWrapper>
  );
}