<?php
// Include PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

$email = $_POST['email'];
// $otp = $_POST['otp'];
$otp = rand(1000, 9000);
$token = $_POST['token'];


try {
    // Server settings
    $mail->isSMTP();                                            // Use SMTP
    $mail->Host       = 'smtp.gmail.com';                       // Gmail SMTP server
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'cgpacalculator528@gmail.com';                 // Your Gmail
    $mail->Password   = 'kujh fhig epuv lfmn';                    // Your Gmail App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Encryption (TLS)
    $mail->Port       = 587;                                    // Port for TLS
    // Recipients
    $mail->setFrom('cgpacalculator528@gmail.com', 'CGPA CALCULATOR');        // Sender
    $mail->addAddress($email, 'User'); // Recipient
    // Content
    $mail->isHTML(true);                                        // Set email format to HTML
    $mail->Subject = 'VERIFICATION';
    $mail->Body    = "<h2>Greetings!</h2><br><br><h3>This is a verification email sent for registering the CGPA CALCULATOR system.Your verification code is:</h3><br><h1>Verification code:$otp</h1><br><br><h3>Thank You.</h3>";
    $mail->AltBody = 'This is the plain text version for non-HTML clients.';
    $mail->send();
    echo $otp;
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>