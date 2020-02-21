<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');


$to = "info@anwin.be";

$body = file_get_contents('php://input');
$postvars = json_decode($body, true);
$naam = $postvars['naam'];
$voornaam = $postvars['voornaam'];
$onderwerp = $postvars['onderwerp'];
$email = $postvars['email'];
$gsm = $postvars['tel'];
$bericht = $postvars['bericht'];
$msq = 'Naam: ' . $naam . $voornaam . "\n" . 'E-mail: ' . $email . "\n" .'Gsm: '. $gsm . "\n" . 'Bericht: '. "\n" . $bericht;

$emailSend = mail($to, $onderwerp, $msq);

    



?>