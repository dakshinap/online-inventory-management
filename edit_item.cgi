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


my $rows_affected = 0;

my $dbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';


my $sku = $query->param('sku') ;
my $vendor = $query->param('vendor');
my $mid = $query->param('mid');
my $category = $query->param('category');
my $description = $query->param('description');
my $features = $query->param('features');
my $cost = $query->param('cost');
my $retail = $query->param('retail');
my $quantity = $query->param('quantity');
my $image = $query->param('image');
 


my $stmt = "UPDATE product SET catID = ? , venID = ?, mid = ?, description = ?, features = ?, cost = ? , retail = ?, quantity = ?, image = ? where sku = ?";
my $sth = $dbh->prepare($stmt) or die $dbh->errstr;

$rows_affected  = $sth->execute($category,$vendor,$mid,$description,$features,$cost,$retail,$quantity,$image,$sku)
or die "Couldn't execute statement";



$sth->finish();
$dbh->disconnect();

print "Content-type: text/html\n\n";
print ""; 
}
