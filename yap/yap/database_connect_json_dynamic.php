<?php 

// PHP program to connect with CKWarehouse database 

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

// SQL query to select data 
// from database 
$sql2 = "SELECT * FROM Ck_Ai_Youtube_Analytics"; 
$result = $mysqli->query($sql2); 

// Fetching data from the database 
// and storing in array of objects 
while($row = $result->fetch_array()) { 
	$studentdata[] = array( 
		"ing" => $row["ing"], 
		"claims" => $row["claims"], 
		"Department" => $row["dept"], 
		"Category" => $row["div"], 
	); 
} 

// Creating a dynamic JSON file 
$file = "temp.json"; 

// Converting data into JSON and putting 
// into the file 
// Checking for its creation 
if(file_put_contents($file, 
		json_encode($studentdata))) 
	echo("File created"); 
else
	echo("Failed"); 

// Closing the database 
$mysqli->close(); 

?> 
