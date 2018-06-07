#!/usr/bin/perl 


use DBI;
use CGI;

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

my $response = "";
 
$stmt = "SELECT sku from product";
$sth   = $dbh->prepare($stmt) or die $dbh->errstr;

$sth->execute();
while(my $val=$sth->fetchrow_array()) {
	$response .= $val ."|";
}


$sth->finish();
$dbh->disconnect();
    

 
print "Content-type: text/html\n\n";
print $response ;



