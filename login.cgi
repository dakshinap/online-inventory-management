#!/usr/bin/perl 

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::Password;


my $q ;

my ($user, $password, $OK, $stored_user, $stored_pass, $line);
my @file_lines;

if(authenticate_user()){
    my $session = new CGI::Session(undef, undef, {Directory=>'/tmp'});
    $session->expires('+1d');
    my $cookie = $q->cookie(jadrn031_SID => $session->id);
    print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser    
    my $sid = $session->id;
    print "OK";

}else{
   print $q->redirect('http://jadran.sdsu.edu/~jadrn031/proj1/error.html');
}
sub authenticate_user {
    $q = new CGI;
    $user = $q->param("user");
    $password = $q->param("passwd");    
    open DATA, "</srv/www/cgi-bin/jadrn031/passwords.dat" 
        or die "Cannot open file.";
    @file_lines = <DATA>;
    close DATA;

    $OK = 0; #not authorized

    foreach $line (@file_lines) {
        chomp $line;
        ($stored_user, $stored_pass) = split /=/, $line;
    if($stored_user eq $user && check_password($stored_pass, $password)){
        $OK = 1;
        last;
        }
    }
     
    return $OK;
    }