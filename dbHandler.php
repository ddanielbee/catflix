<?php


	function connectToDb()
	{
		// Test Database Info
		//$mysqli=mysqli_connect("localhost", "root", "root", "elede");
		// Actual Database info
		$mysqli=mysqli_connect("host", "user", "pass", "table_name");
		// Check connection
		if (mysqli_connect_errno()) {
		  return "Failed to connect to MySQL: " . mysqli_connect_error();
		} else
		{
			return $mysqli;
		}
	}

	function closeDb($stmt, $mysqli)
	{
		$stmt->close();
		mysqli_close($mysqli);
	}

	function getContent() {
		$mysqli = connectToDb();
		$stmt = $mysqli->prepare("SELECT id, content FROM tips ORDER BY RAND() LIMIT 1");
		$stmt->execute();
		$stmt->bind_result($iId, $sContent);
		$aResult = array();
		while($stmt->fetch())
		{
			$tip = array(
					"id"		=> $iId,
					"content"	=> utf8_encode($sContent)
				);
			$aResult["tip"] = $tip;
		}
		$stmt->close();
		$stmt = $mysqli->prepare("SELECT id, name, url FROM orgs ORDER BY RAND() LIMIT 1");
		$stmt->execute();
		$stmt->bind_result($iOid, $sOname, $sOurl);
		while($stmt->fetch())
		{
			$org = array(
					"id"		=> $iOid,
					"name"		=> utf8_encode($sOname),
					"url"		=> $sOurl
				);
			$aResult["org"] = $org;
		}
		closeDb($stmt, $mysqli);
		return json_encode($aResult);
	}