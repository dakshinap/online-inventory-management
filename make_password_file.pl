#!/usr/bin/perl


use Crypt::Password;

my $salt = "6y4TYQR4";
my ($user, $password, $encrypted_password);

open OUTFILE, ">passwords.dat" or die "Cannot open file.";

print "Enter the username and password for each entry at the prompt.\n";
print "Hit ENTER for the username (leaving it empty) to end the script.\n\n";
for(;;) {
    print "Enter the username: ";
    $user = <STDIN>;
    chomp $user;
    if(length($user) == 0) { last; }
    print "Enter the password: ";
    $password = <STDIN>;
    chomp $password;
    $encrypted_password = Crypt::Password->new($password, $salt, sha256);
    print OUTFILE "$user" . "=" . $encrypted_password . "\n";
    } 
    
close OUTFILE;    