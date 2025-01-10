import React, { useState, useEffect } from 'react';

function Test() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://bees-backend.aiiot.center/api/data')  // Call the backend API
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
          });
        }

        // Check if the response is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          throw new Error('Expected JSON response, but received: ' + contentType);
        }
      })
      .then((data) => setData(data))  // Set the data in the state
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);  // Show error message on the UI
      });
  }, []);

  return (
    <div>
      <h1>Data from Backend</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}
      <ul>
        {data.length === 0 ? (
          <li>No data available</li>  // Show this message if no data is returned
        ) : (
          data.map((item) => (
            <li key={item.id}>
              Temperature: {item.temperature}°C, Humidity: {item.humidity}%, Weight: {item.weight} kg, Created At: {item.created_at}
            </li>  // Adjust based on actual table columns
          ))
        )}
      </ul>
    </div>
  );
}

export default Test;
