#!/usr/bin/perl 

use CGI;


my $q = new CGI;
my $query = CGI->new;
my $sku = $query->param('sku');


print "Content-type: text/html\n\n";

my $statement = "Select * from product where sku = '$sku'";
 if(db_insert($statement) > 0)
 { 
   print "ERROR";
 }
 else
 {
 	print  "SUCCESS"
 }       


