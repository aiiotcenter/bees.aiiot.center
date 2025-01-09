import React, { useEffect, useState } from 'react';

export default function Swarm() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // After the component mounts, set loading to false (optional)
    setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading the page...</p>
      ) : (
        <>
        <div style={{width: '100%'}} className="unity-work">
        <iframe
          src="https://temp.aiiot.center/"
          width="100%"
          height="600"
          title="Swarm Site"
          style={{ border: 'none' }}
        />
        </div>
        </>
      )}
    </div>
  );
}
