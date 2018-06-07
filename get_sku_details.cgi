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

my $query = new CGI;
my $sku = $query->param('sku') or die 'not good';

my $response = "";
 

#SELECT sku, vendor.name as vendor, category.name as category, mid, description, features, quantity, retail,cost, image
#FROM vendor, category, product
#WHERE vendor.id=product.venID
#AND category.id=product.catID;

$stmt = "SELECT sku, vendor.name as vendor, category.name as category, mid, description, features, quantity, retail,cost, image FROM vendor, category, product WHERE vendor.id=product.venID AND category.id=product.catID and sku ='$sku'" ;
$sth   = $dbh->prepare($stmt) or die $dbh->errstr;

$sth->execute();

while(my @row=$sth->fetchrow_array()) {
	foreach $item (@row) {
        $response .= $item . "|";
    }
    last
}


$sth->finish();
$dbh->disconnect();
    

 
print "Content-type: text/html\n\n";
print $response ;