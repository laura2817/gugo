<?php 
$name  = $_GET['pname'];
$lname = $_GET['plastname'];
$email = $_GET['pemail'];
$phone = $_GET['pphone'];

$formcontent	="Nombre: ".$name. "\n Apellido:  " .$lname. "\n Correo:  " .$email. "\n Telefono:  " .$phone;
$recipient 		= "correo@degugo.com";
$from 			= "contactosWeb@gugoweb.com";
$subject 		= "Contacto de la Web " .$name;
$mailheader 	= "From:" . $from;

if( mail($recipient, $subject, $formcontent, $mailheader) ){
	header("Location: index.html");
}else{
	header("Location: index.html");
}
?>



