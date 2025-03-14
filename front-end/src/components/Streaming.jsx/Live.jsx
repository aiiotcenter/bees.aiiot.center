import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FullScreenContainer = styled.div`
  max-width: 1290px;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  position: relative;
`;

const FullScreenMedia = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover; /* Ensures full coverage */
`;

const FullScreenVideo = styled.video`
  width: 100vw;
  height: 100vh;
  object-fit: cover; /* Ensures full coverage */
`;

const ButtonGroup = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
`;

const Button = styled.button`
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function Live() {
  const [isVideo, setIsVideo] = useState(false);
  const streamURL = "https://beesscamera.pagekite.me/?action=stream";

  // Check if the source is a video
  useEffect(() => {
    fetch(streamURL, { method: "HEAD" })
      .then((response) => {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("video")) {
          setIsVideo(true);
        } else {
          setIsVideo(false);
        }
      })
      .catch(() => setIsVideo(false));
  }, []);

  return (
    <FullScreenContainer>
      {isVideo ? (
        <FullScreenVideo src={streamURL} autoPlay loop muted playsInline />
      ) : (
        <FullScreenMedia src={streamURL} alt="Live Stream" />
      )}

      <ButtonGroup>
        <Button onClick={() => window.location.reload()}>🔄 Refresh</Button>
        <Button onClick={() => document.documentElement.requestFullscreen()}>
          ⛶ Fullscreen
        </Button>
      </ButtonGroup>
    </FullScreenContainer>
  );
}
