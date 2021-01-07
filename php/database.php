<?php
$field_email = $_POST['email'];

$mail_to = 'rakeshssnit@email.com';
$subject = 'Message from a site visitor '.$field_email;

$body_message .= 'E-mail: '.$field_email."\n";

$headers = 'From: '.$field_email."\r\n";
$headers .= 'Reply-To: '.$field_email."\r\n";

$mail_status = mail($mail_to, $subject, $body_message, $headers);

if ($mail_status) { ?>
	<script language="javascript" type="text/javascript">
		//alert('Data has been added successfully.');
		window.location = '/index.html';
	</script>
<?php
}
else { ?>
	<script language="javascript" type="text/javascript">
		//alert('Database addition failed');
		window.location = '/index.html';
	</script>
<?php
}
?>