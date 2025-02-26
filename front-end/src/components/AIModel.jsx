import React, { useState } from "react";
import axios from "axios";
import { Container, PageWrapper } from "../Style/GlobalStyle";

export default function AIModel() {
  const [file, setFile] = useState(null);
  const [resultURL, setResultURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const API_URL = "http://127.0.0.1:8080/detect/";

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
    setProgress(0);
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

      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });

      setResultURL(response.data.image_url || response.data.video_url);
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
        <h2>Upload an Image or Video</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Upload & Detect"}
          </button>
        </form>

        {/* ✅ Show Progress Bar */}
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* ✅ Show Image or Video Result */}
        {resultURL && (
          <div>
            <h3>Detection Result:</h3>
            {file?.type.startsWith("image/") ? (
              <img src={resultURL} alt="Detection Result" style={{ width: "100%", maxWidth: "500px" }} />
            ) : (
              <video controls style={{ width: "100%", maxWidth: "500px" }}>
                <source src={resultURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </Container>
    </PageWrapper>
  );
}
