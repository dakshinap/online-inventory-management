#!/usr/bin/perl

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);


print <<END;    
    
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="http://jadran.sdsu.edu/~jadrn031/proj1/jquery/jquery.js"></script>
    <script src="http://jadran.sdsu.edu/~jadrn031/proj1/login.js"></script>
    <title> Dak's Makeup Alley </title>
</head>
<body>
<div id="resp">
<h1 align="center">Daks MakeUp Alley</h1>
    <p align="center"> UN-AUTHORISED USER. LOGIN AGAIN</p>
	<form align="center" method="POST">
		User Name:<br>
	  	<input type="text" style="font-size:120%;"  id="usrName" name="username"><br><div id="err_usr" class="errorMessage"></div><br>
	 	User Password:<br>
	  	<input type="password" style="font-size:120%" id="pwd" name="psw"><br><div id="err_pwd" class="errorMessage"></div><br><br><br>
	  	<input type="submit"   style="width:150px;height:200px;" value="Submit" id="sub">
  		<input type="reset"    style="width:150px;height:200px;"  value="Clear" id="clr" ><br>
	</form>
	<p id="errorMessage" align="center"> </p>
</div>
</body>
</html>

END
