import React from 'react';

export default function Live() {
  return (
  <>
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {/* <h2>Live Streaming</h2> */}
      <iframe
        width="100%"
        height="500px"
        src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID"
        title="Live Streaming"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </>
  );
}
