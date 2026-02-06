<?php
/**
 * Afridrop Solutions - Newsletter Subscription Handler
 * This script processes newsletter subscription form submissions
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

// Validate email
if (empty($_POST['email'])) {
    sendResponse(false, 'Please enter your email address.');
}

// Sanitize and validate email
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, 'Please enter a valid email address.');
}

// Process subscription
try {
    // Check if email already exists in the database
    // if (emailAlreadySubscribed($email)) {
    //     sendResponse(true, 'You are already subscribed to our newsletter.');
    // }
    
    // Store subscription in database
    // storeSubscription($email);
    
    // For now, just send a confirmation email
    $to = $email;
    $subject = 'Newsletter Subscription Confirmation - Afridrop Solutions';
    
    $message = "Dear Subscriber,\n\n";
    $message .= "Thank you for subscribing to the Afridrop Solutions newsletter!\n\n";
    $message .= "You will now receive updates about our latest services, promotions, and pool maintenance tips.\n\n";
    $message .= "If you did not request this subscription, please ignore this email.\n\n";
    $message .= "Best regards,\n";
    $message .= "The Afridrop Solutions Team\n";
    
    $headers = "From: info@afridrop.co.ug\r\n";
    $headers .= "Reply-To: info@afridrop.co.ug\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send confirmation email
    mail($to, $subject, $message, $headers);
    
    sendResponse(true, 'Thank you for subscribing to our newsletter!');
} catch (Exception $e) {
    // Log the error (in a production environment)
    error_log('Newsletter subscription error: ' . $e->getMessage());
    sendResponse(false, 'An error occurred while processing your request. Please try again later.');
}

/**
 * Check if email is already subscribed (commented out - implement when database is ready)
 */
/*
function emailAlreadySubscribed($email) {
    try {
        // Database connection
        $db = new PDO('mysql:host=localhost;dbname=afridrop_db', 'username', 'password');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Check if email exists
        $stmt = $db->prepare("SELECT COUNT(*) FROM newsletter_subscribers WHERE email = ?");
        $stmt->execute([$email]);
        
        return $stmt->fetchColumn() > 0;
    } catch (PDOException $e) {
        error_log('Database error: ' . $e->getMessage());
        return false;
    }
}
*/

/**
 * Store subscription in database (commented out - implement when database is ready)
 */
/*
function storeSubscription($email) {
    try {
        // Database connection
        $db = new PDO('mysql:host=localhost;dbname=afridrop_db', 'username', 'password');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Prepare and execute query
        $stmt = $db->prepare("INSERT INTO newsletter_subscribers (email, subscribed_at) VALUES (?, NOW())");
        $stmt->execute([$email]);
        
        return true;
    } catch (PDOException $e) {
        error_log('Database error: ' . $e->getMessage());
        return false;
    }
}
*/
?>