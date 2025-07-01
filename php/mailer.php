<?php
/**
 * Afridrop Solutions - Contact Form Handler
 * This script processes contact form submissions and sends email notifications
 */

// Set error reporting for debugging (remove in production)
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

// Define response function
function sendResponse($success, $message) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Invalid request method.');
}

// Verify CSRF token
if (!isset($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'] ?? '', $_POST['csrf_token'])) {
    sendResponse(false, 'Security verification failed. Please try again.');
}

// Validate required fields
$required_fields = ['name', 'email', 'message'];
foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        sendResponse(false, 'Please fill in all required fields.');
    }
}

// Sanitize and validate input data
$name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$phone = filter_var(trim($_POST['phone'] ?? ''), FILTER_SANITIZE_STRING);
$message = filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING);

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, 'Please enter a valid email address.');
}

// Prepare email content
$to = 'info@afridrop.co.ug'; // Replace with your actual email
$subject = 'New Contact Form Submission from ' . $name;

$email_content = "Name: $name\n";
$email_content .= "Email: $email\n";
if (!empty($phone)) {
    $email_content .= "Phone: $phone\n";
}
$email_content .= "Message:\n$message\n";

// Set email headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
try {
    // For production, use mail() function or a proper email library like PHPMailer
    if (mail($to, $subject, $email_content, $headers)) {
        // Store in database if needed
        // storeLeadInDatabase($name, $email, $phone, $message);
        
        sendResponse(true, 'Thank you for your message. We will get back to you soon.');
    } else {
        sendResponse(false, 'Failed to send your message. Please try again later.');
    }
} catch (Exception $e) {
    // Log the error (in a production environment)
    error_log('Contact form error: ' . $e->getMessage());
    sendResponse(false, 'An error occurred while processing your request. Please try again later.');
}

/**
 * Store lead in database (commented out - implement when database is ready)
 */
/*
function storeLeadInDatabase($name, $email, $phone, $message) {
    try {
        // Database connection
        $db = new PDO('mysql:host=localhost;dbname=afridrop_db', 'username', 'password');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Prepare and execute query
        $stmt = $db->prepare("INSERT INTO leads (name, email, phone, message, status, created_at) VALUES (?, ?, ?, ?, 'new', NOW())");
        $stmt->execute([$name, $email, $phone, $message]);
        
        return true;
    } catch (PDOException $e) {
        error_log('Database error: ' . $e->getMessage());
        return false;
    }
}
*/
?>