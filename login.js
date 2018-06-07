console.log("Entered login script")

$( document ).ready(function() {
  console.log( "ready function" );

  //Clear the error message on DOM ready
  $('.errorMessage').text("");

  //Focus on the user name input field when the DOM is ready
  $('#usrName').focus(); 

  $('#sub').on('click', function(e) {

    console.log("Submit clicked")

    //validate before sending the form data.
    e.preventDefault();
    
    //check if username and password are valid.
    if($("#usrName").val() == "" || $("#pwd").val() == ""){

      if($("#usrName").val() == ""){
        $("#err_usr").text("Please enter the User Name!");
        $('#usrName').focus(); 
      }
      if($("#pwd").val() == ""){
        $("#err_pwd").text("Please enter the Password!");
        if($("#usrName").val() != ""){
          $('#pwd').focus(); 
        }
      }
    }
    else{

      //All clear with validation. Take it forward to authenticate the user details
      e.preventDefault();
      params = "user="+$("#usrName").val()+"&passwd="+$("#pwd").val();
      $('#errorMessage').text("Checking Login Details... Please Wait");
      $.post('http://jadran.sdsu.edu/cgi-bin/jadrn031/login.cgi', params, authenticate_user);       
    }  
  });

   $("#usrName").on('blur', function() {
        if(($("#usrName").val()) != "") {
            $("#err_usr").text("");
            }
        });

    $("#pwd").on('blur', function() {
        if(($("#pwd").val()) != "") {
            $("#err_pwd").text("");
            }
        });
});

function authenticate_user(res) { 
  console.log("Authenticating User")
  if (res === 'OK'){  
    $('#errorMessage').text("Logging IN.... Please Wait");
    $.get("http://jadran.sdsu.edu/perl/jadrn031/loginhome.cgi", user_authenticated);
  }
  else{
    $('#errorMessage').text("Incorrect User Name or Password! Try again!");
    $('#usrName').val(""); 
    $('#pwd').val(""); 
    $('#usrName').focus(); 
  }
}

function user_authenticated(res) {
    $('#resp').html(res);

}
