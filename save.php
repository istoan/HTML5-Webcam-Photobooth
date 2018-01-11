<?php 
if ( isset($_POST["image"]) && !empty($_POST["image"]) ) { 

	//get image data
	$data = $_POST["image"];

	//remove the prefix
	$uri =  substr($data,strpos($data,","));
	
	$folder = "images";

	//create a filename for the new image
	$file = md5(uniqid()) . ".jpg";

	//decode the image data and save it to file
	file_put_contents($folder . "/" . $file, base64_decode($uri));

	//return the file name
	echo $file;
}
?>