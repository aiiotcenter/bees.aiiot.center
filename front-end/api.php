<?php
// Database credentials
$host = "localhost";
$username = "aiiovdft_bees";
$password = "FadiFadi2020";
$database = "aiiovdft_bees";

// Create a connection
$conn = new mysqli($host, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if POST data is received
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve and cast data
    $temperature = isset($_POST['temperature']) ? floatval($_POST['temperature']) : 0.0;
    $humidity = isset($_POST['humidity']) ? floatval($_POST['humidity']) : 0.0;
    $weight = isset($_POST['weight']) ? floatval($_POST['weight']) : 0.0;
    $distance = isset($_POST['distance']) ? floatval($_POST['distance']) : 0.0;
    $sound_status = isset($_POST['sound_status']) ? intval($_POST['sound_status']) : 0;
    $light_status = isset($_POST['light_status']) ? intval($_POST['light_status']) : 0;

    // Log received data for debugging
    file_put_contents('debug.log', "Received Data: Temp=$temperature, Hum=$humidity, Weight=$weight, Dist=$distance, Sound=$sound_status, Light=$light_status\n", FILE_APPEND);

    // Insert into the database
    $stmt = $conn->prepare("INSERT INTO sensor_data (temperature, humidity, weight, distance, sound_status, light_status) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ddddii", $temperature, $humidity, $weight, $distance, $sound_status, $light_status);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Data saved successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to save data."]);
        file_put_contents('debug.log', "Database Error: " . $stmt->error . "\n", FILE_APPEND);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}

$conn->close();
?>
