#!/usr/bin/perl 


use DBI;
use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $query = new CGI;
my $cookie_sid = $query->cookie('jadrn031_SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
 my $sid = $session->id;

 if($cookie_sid ne $sid) {
     print <<END;
Content-type:  text/html

<html>
<head>
    <meta http-equiv="refresh" 
        content="0; url=http://jadran.sdsu.edu/~jadrn031/sessions_cookies/error.html" />
</head><body></body>
</html>

END

 }else{

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn031";
my $username = "jadrn031";
my $password = "samovar";
my $database_source = "dbi:mysql:$database:$host:$port";

my $item = "";
my $rows_affected = 0;

my $dbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';

my $stmt = "";
my $sth  = "";


my $sku = $query->param('sku') or die 'not good';

my $response = "";
 
 #DELETE FROM product WHERE sku =;

$stmt = "DELETE FROM product WHERE sku ='$sku'";
$sth   = $dbh->prepare($stmt) or die $dbh->errstr;

$sth->execute();

$sth->finish();
$dbh->disconnect();
    
 
print "Content-type: text/html\n\n";
print $response ;
}