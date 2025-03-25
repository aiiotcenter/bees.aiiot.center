import React, { useState } from "react";
import axios from "axios";
import { Button, Container, ErrorText, FormWrapper, PageWrapper } from "../Style/GlobalStyle";
import { Content, Footer, Header, List, ListItems, Main, Result, Section, Wrapper } from "../Style/AIModal/Style";
import Typography from "../Style/Typography";
import { HeadingWrapper } from "../Style/Dashboard/Style";

export default function AIModel() {
  const [file, setFile] = useState(null);
  const [resultURL, setResultURL] = useState(null);
  const [classCounts, setClassCounts] = useState({}); // ✅ Ensure default object to avoid errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isVideo, setIsVideo] = useState(false);

  const API_URL = "http://127.0.0.1:8080/detect/";

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setError(null);
    setProgress(0);
    setClassCounts({}); // ✅ Reset object counts

    setIsVideo(selectedFile?.type.startsWith("video/"));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please select an image or video.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError(null);
      setProgress(0);
      setClassCounts({});

      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });

      setResultURL(response.data.image_url || response.data.video_url);
      setClassCounts(response.data.class_counts || {}); // ✅ Ensure it doesn't break if empty
    } catch (error) {
      console.error("Error detecting objects:", error);
      setError("Failed to detect objects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Container>
        <HeadingWrapper style={{marginBottom:'30px'}}>
          <Typography variant="h1">AI Model</Typography>
          <Typography variant="p">
            This AI model detects honey bees and counts them in images and videos with precision. It provides real-time analysis, ensuring accurate bee identification and tracking.
          </Typography>
        </HeadingWrapper>

        <Wrapper>
          <Header>
            <Typography variant="h1">Bees Detection</Typography>
            <div>
              {Object.keys(classCounts).length > 0 && (
                <span>
                  {Object.entries(classCounts).map(([className, count]) => (
                    <div key={className}>
                     Total Number of {className}s: <strong>{count}</strong>
                    </div>
                  ))}
                </span>
              )}
            </div>
          </Header>

          <Section>
            {progress > 0 && progress < 100 && (
              <div style={{ width: "100%", backgroundColor: "#ccc", marginTop: "10px" }}>
                <div
                  style={{
                    width: `${progress}%`,
                    height: "8px",
                    backgroundColor: "#78091e",
                    transition: "width 0.3s ease-in-out",
                  }}
                />
              </div>
            )}

            <Main>
              <Content>
                {resultURL && (
                  <div>
                    {isVideo ? (
                      <video key={resultURL} controls style={{ width: "100%", maxWidth: "500px" }}>
                        <source src={resultURL} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img src={resultURL} alt="Detection Result" style={{ width: "100%", maxWidth: "500px" }} />
                    )}
                  </div>
                )}
              </Content>

            </Main>

            <Footer>
              <FormWrapper onSubmit={handleSubmit}>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  style={{ display: "inline-block", padding: "10px", cursor: "pointer" }}
                />
                <Button type="submit" disabled={loading} style={{ marginLeft: "10px" }}>
                  {loading ? "Processing..." : "Show Result"}
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
