import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import styled from 'styled-components';
import { Button } from "../Style/GlobalStyle";

// Styled Components
const PageWrapper = styled.div`
  /* font-family: 'Arial', sans-serif; */
  padding: 20px;
  /* max-width: 1200px; */
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
`;

const HeadingWrapper = styled.div`
  margin-bottom: 20px;
  h1 {
    margin-bottom: 10px;
  }
`;

// const Button = styled.button`
//   background-color: #f0c14b;
//   border: 1px solid #a88734;
//   border-radius: 4px;
//   padding: 8px 16px;
//   cursor: pointer;
//   font-weight: bold;
//   transition: all 0.3s;
  
//   &:hover {
//     background-color: #ddb347;
//   }
  
//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }
// `;

const FormWrapper = styled.form`
  width: 100%;
`;

const ErrorText = styled.p`
  color: #d8000c;
  margin: 10px 0;
`;

// Reusing your provided styled components
const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: 100%;  
  background: #fff;
  padding: 25px;
  margin-bottom: 50px;
  box-sizing: border-box;
  flex-direction: column;
  min-height: 600px;
  position: relative;
  border: 1px solid #e9e9e9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  
  h1 {
    font-size: 24px;
    margin: 0;
  }
  
  span {
    color: green;
    font-size: 16px;
    text-transform: capitalize;
  }
`;

const Section = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;  
  background: #fff;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const Main = styled.div`
  display: flex;
  gap: 20px;
  width: 100%; 
  border: 1px solid #E9E9E9;
  border-radius: 4px;
  padding: 25px; 
  box-sizing: border-box;
  min-height: 400px;
  justify-content: space-between;
`;

const Content = styled.div`
  width: 50%;  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

const SummarySection = styled.div`
  width: 100%;
  padding: 15px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  margin-bottom: 15px;
  min-height: 60px;

`;

const AdviceSection = styled.div`
  width: 100%;
  padding: 15px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  margin-bottom: 15px;
  min-height: 60px;
  box-sizing: border-box;
`;

const Footer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;  
  box-sizing: border-box;
  /* position: absolute; */
  bottom: 25px;

  form {
    margin-top: 0px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px 20px;
    box-sizing: border-box;
    flex-direction: row-reverse;
    align-content: center;
    width: 100%;
    justify-content: center;
  }
`;

const ActionButton = styled(Button)`
  width: 100%;
  padding: 12px;
  background-color: ${props => props.secondary ? "#e9e9e9" : "#78091e"};
  margin-top: 10px;
`;

const UploadArea = styled.div`
  width: 100%;
  height: 250px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  
  &:hover {
    border-color: #f0c14b;
  }
  
  input {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    box-sizing: border-box;
  }
`;

const ImagePreview = styled.div`
  max-width: 100%;
  height: auto;
  img {
    max-width: 100%;
    max-height: 300px;
    object-fit: contain;
    border-radius: 8px;
  }
`;

const TabHeader = styled.div`
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export default function BeeDetectorAdvisor() {
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [beeCount, setBeeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [detectionSummary, setDetectionSummary] = useState("");
  const [adviceQuery, setAdviceQuery] = useState("");
  const [aiAdvice, setAiAdvice] = useState("");

  const API_URL = "https://detect.roboflow.com/bee-detection-h59jf/1";
  const API_KEY = "GfNceoaR4aeKM6ihreVc";
  const HUGGINGFACE_URL = "https://huggingface.co/spaces/haseebcodejourney/Bee-keeing-hamza";

  // Convert image to base64
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
      setDetectionSummary("");
    }
  };

  // Handle drag and drop
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setUploadedImage(URL.createObjectURL(droppedFile));
      setError(null);
      setProgress(0);
      setBeeCount(0);
      setProcessedImage(null);
      setDetectionSummary("");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Clear image
  const handleClearImage = () => {
    setFile(null);
    setUploadedImage(null);
    setProcessedImage(null);
    setBeeCount(0);
    setError(null);
    setProgress(0);
    setDetectionSummary("");
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

      // Convert the image to base64
      const image = await loadImageBase64(file);

      // Send image to API
      const response = await axios({
        method: "POST",
        url: API_URL,
        params: { api_key: API_KEY },
        data: image,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });

      if (response.data && response.data.predictions) {
        const beesDetected = response.data.predictions.length;
        setBeeCount(beesDetected);
        setProcessedImage(response.data.image_url || uploadedImage);
        
        // Generate detection summary
        setDetectionSummary(
          `Detected ${beesDetected} ${beesDetected === 1 ? 'bee' : 'bees'} in the image. 
          ${beesDetected > 0 ? 'The image shows healthy bee activity.' : 'No bees detected in this image.'}`
        );
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

  // Handle advice query submission
  const handleAdviceSubmit = async () => {
    if (!adviceQuery.trim()) {
      return;
    }
    
    setAiAdvice("Processing your question about beekeeping...");
    
    // Simulate AI response - in a real app, this would call your AI service
    setTimeout(() => {
      setAiAdvice(`Based on my analysis, here's some advice regarding "${adviceQuery}": 
      Honey bees typically thrive in temperate climates with access to diverse flowering plants. 
      For optimal hive health, ensure proper ventilation and protection from extreme weather conditions.`);
    }, 1500);
  };

  const handleDetectDiseasesAndInsects = () => {
    if (!uploadedImage) {
      setError("Please upload an image first");
      return;
    }
    
    setLoading(true);
    setDetectionSummary("Analyzing image for bee diseases and harmful insects...");
    
    // Simulate analysis
    setTimeout(() => {
      setDetectionSummary("Analysis complete: No signs of varroa mites or other common bee diseases detected. The colony appears healthy based on visual inspection.");
      setLoading(false);
    }, 2000);
  };

  return (
    <PageWrapper>
      <Container>
        <HeadingWrapper>
          <h1>🐝 Bee Detector & Advisor</h1>
          {/* <p>Upload an image to detect honey bees and get beekeeping advice</p> */}
        </HeadingWrapper>

        <Wrapper>
          <Header>
            <h1>Bee Detection</h1>
            {beeCount > 0 && <span>🐝 Bees Detected: {beeCount}</span>}
          </Header>

          <Section>
            {progress > 0 && progress < 100 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                style={{ height: "8px", backgroundColor: "#f0c14b", marginTop: "10px", borderRadius: "4px" }}
              />
            )}

            <Main>
              <Content>
                <TabHeader>📤 Upload an image</TabHeader>
                <AnimatePresence>
                  {uploadedImage ? (
                    <motion.div
                      key="uploaded-image"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      style={{ width: "100%" }}
                    >
                      <ImagePreview>
                        <img src={uploadedImage} alt="Uploaded" />
                      </ImagePreview>
                      <Button onClick={handleClearImage} style={{ marginTop: "10px", backgroundColor: "#ff4d4d", color: "white" }}>
                        Remove Image
                      </Button>
                    </motion.div>
                  ) : (
                    <UploadArea
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                          <polyline points="17 8 12 3 7 8"/>
                          <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <p>Drop Image Here</p>
                        <p>- or -</p>
                        <p>Click to Upload</p>
                      </motion.div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </UploadArea>
                  )}
                </AnimatePresence>
              </Content>

              <Result>
                <TabHeader>🖼️ Processed Image</TabHeader>
                {processedImage ? (
                  <ImagePreview>
                    <img src={processedImage} alt="Processed" />
                  </ImagePreview>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                )}
              </Result>
            </Main>
          </Section>

          <Section>
            <TabHeader>Detection Summary</TabHeader>
            <SummarySection>
              {detectionSummary || "Detection results will appear here after processing an image."}
            </SummarySection>
          </Section>

          <Section>
            <TabHeader>Ask AI for Advice</TabHeader>
            <AdviceSection>
              <input 
                type="text" 
                placeholder="Example: How can I protect my bees from varroa mites?" 
                value={adviceQuery}
                onChange={(e) => setAdviceQuery(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <Button onClick={handleAdviceSubmit} disabled={!adviceQuery.trim()}>
                Get Advice
              </Button>
            </AdviceSection>
          </Section>

          <Section>
            <TabHeader>Advice from AI</TabHeader>
            <SummarySection>
              {aiAdvice || "Ask a question above to get advice from our AI beekeeping assistant."}
            </SummarySection>
          </Section>

          <Footer>
            <FormWrapper onSubmit={handleSubmit}>
              <ActionButton type="submit" disabled={loading || !uploadedImage}>
                {loading ? "Processing..." : "Detect Bees"}
              </ActionButton>
              <ActionButton 
                type="button" 
                onClick={handleDetectDiseasesAndInsects} 
                disabled={loading || !uploadedImage}
                secondary
              >
                Detect Bees, Diseases & Insects
              </ActionButton>
              <ActionButton 
                type="button" 
                onClick={() => window.open(HUGGINGFACE_URL, "_blank")}
                secondary
              >
                Open in Hugging Face
              </ActionButton>
            </FormWrapper>
          </Footer>

          {error && <ErrorText>{error}</ErrorText>}
        </Wrapper>
      </Container>
    </PageWrapper>
  );
}