
<?php 

// PHP program to connect with 
// CKWarehouse database 
$user = 'ck_rpt_usr'; 
$password = 'Welcome0!'; 
$database = 'CKWarehouse'; 
$servername ='ckwarehouse.database.windows.net'; 

$mysqli = new mysqli($servername, 
	$user, $password, $database); 

if ($mysqli->connect_error) { 
	die('Connect Error (' . 
		$mysqli->connect_errno . ') '. 
		$mysqli->connect_error); 
} 

// SQL query to INSERT data to database 
$sql2 = "INSERT TO Ck_Ai_Youtube_Analytics (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);"; 
$result = $mysqli->query($sql2); 



// Closing the database 
$mysqli->close(); 

?> 

