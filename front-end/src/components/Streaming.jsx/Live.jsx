import React from 'react';

export default function Live() {
  return (
  <>
    <div style={{ textAlign: 'center'}}>
      <iframe
        width="100%"
        height="500px"
        src="https://beesscamera.pagekite.me/?action=stream"
        title="Live Streaming"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </>
  );
}
