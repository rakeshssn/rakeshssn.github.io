<?php

$serverName = "ckwarehouse.database.windows.net";
$connectionOptions = array("Database" => "CKWarehouse", 
    "Uid" => "ck_rpt_usr", 
    "PWD" => "Welcome0!");

$conn = sqlsrv_connect($serverName, $connectionOptions);
$tsql= "SELECT * FROM Ck_Ai_Youtube_Analytics";
$getResults= sqlsrv_query($conn, $tsql);
if ($getResults == FALSE)
    echo (sqlsrv_errors());

while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC))
{
    //Here you deal with your data
	$studentdata[] = array( 
		"ing" => $row["ing"], 
		"claims" => $row["claims"], 
		"Department" => $row["dept"], 
		"Category" => $row["div"], 
	); 
}

$file = "temp.json"; 

// Converting data into JSON and putting 
// into the file 
// Checking for its creation 
if(file_put_contents($file, 
		json_encode($studentdata))) 
	echo("File created"); 
else
	echo("Failed"); 
//closes sql connection and clears everything connected to it
sqlsrv_free_stmt($getResults);
?> 