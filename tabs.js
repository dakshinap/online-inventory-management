$(document).ready(function() {

    console.log("tabs script enetered")
    $("#tabs").tabs();  

    $("#sku").focus();

    populate_sku();

     populate_sku_del();

    $('#logoutbtn').on('click',function(){
        $.get("http://jadran.sdsu.edu/cgi-bin/jadrn031/logout.cgi",logout_handler);             
    }); // logout click


    ///////////////////////////////////////////////////////ADD RECORD /////////////////////////////////////////////////////

    $('#tabs-1').on('click', '#new_item', function(e){

        ok = true;
    	
    	e.preventDefault();
    	if($("#sku").val() == ""){
            $("#sku_err").text("Please enter SKU!");
            $("#sku").focus();

            ok = false;
        
        }else if(new RegExp('^([A-Z]{3}[-]{1}[0-9]{3})$').test($("#sku").val()) == false){
            $("#sku_err").text("Invalid! SKU should be of the form ABC-123");
            $("#sku").focus();
            ok = false;
        }
        if($("#vendor").val()==="none"){
   			$("#ven_err").text("Please Select Vendor!");
            ok = false;
        }
        if($("#mid").val() == ""){
            $("#mid_err").text("Please enter Manufacturer's ID!");
            ok = false;
        }
        if($("#category").val()==="none"){
           $("#cat_err").text("Please Select Category!");
            ok = false;
        }
        if($("#desc").val() == ""){
           $("#des_err").text("Please enter Description!");
           ok = false;
        }
        if($("#features").val() == ""){
            $("#ftr_err").text("Please enter Features!");
            ok = false;
        }
        if($("#cost").val() == ""){
           $("#cst_err").text("Please enter Cost!");
           ok = false;
        }
        else if(new RegExp('^[0-9]*(\.[0-9]{2})?$').test($("#cost").val()) == false){
           $("#cst_err").text("Invalid Cost!");
           ok = false;
        }
        if($("#retail").val() == ""){
           $("#ret_err").text("Please enter Retail!");
           ok = false;
        }
        else if(new RegExp('^[0-9]*(\.[0-9]{2})?$').test($("#retail").val()) == false){
           $("#ret_err").text("Invalid Retail!");
           ok = false;
        }else if($("#cost").val() != "" && new RegExp('^[0-9]*(\.[0-9]{2})?$').test($("#cost").val()) == true){
        	if($("#retail").val() <= 1.25*$("#cost").val()){
           		$("#ret_err").text(" Retail should be 25% greater than cost price");
                ok = false;
           	}
        }
        if($("#quantity").val() == ""){
           $("#qty_err").text("Please enter Quantity!");
        }else if(new RegExp('^[0-9]*(\.[0-9]{2})?$').test($("#quantity").val()) == false){
            ok = false;
           $("#qty_err").text("Invalid Quantity!");
        }
        if($("#p_img").val() == ""){
            $("#img_err").text("Please select Image!");
            ok = false;
           
        }

        if(ok){
            console.log("Sending data to server");
            var form_data = new FormData($('#form-1')[0]);
            form_data.append("image", document.getElementById("p_img").files[0]);
            $.ajax({
            url: "http://jadran.sdsu.edu/cgi-bin/jadrn031/img_upload.cgi",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
             console.log("success");
              send_form_data();
                },
            error: function(response) {
                $("$form1_err").text("Image upload Error. Please Try again");
                $("#p_img").val() = "";
                $("#p_img").focus();
            }
            });
        } // if ok
    }); // tabs 1 on click

    $("#sku").on('blur', function(){
    	$("#sku_err").text("");
        if($("#sku").val() === "" || new RegExp('^([A-Z]{3}[-]{1}[0-9]{3})$').test($("#sku").val()) == false) {
           $("#sku_err").text("Invalid SKU .SKU should be of the form ABC-123");
        }
        else if($("#sku").val() != "" && new RegExp('^([A-Z]{3}[-]{1}[0-9]{3})$').test($("#sku").val()) == true) {
            var form_data = new FormData();
            form_data.append("sku", $("#sku").val());
            $.ajax({
            url: "http://jadran.sdsu.edu/cgi-bin/jadrn031/sku_dup.cgi",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log("success");
                if(response === "ERROR"){
                    $("#sku_err").text("SKU " + $("#sku").val()  + "found. Enter a different SKU");
                    $("#sku").text(""); 
                    $("#sku").focus(); 
                }
            },
            error: function(response) {
                $("#sku_err").text("SKU found. Enter a different SKU");
                $("#sku").val() == ""; 
            }
            });

        }
    }); // sku on blur
    $("#mid").on('blur', function(){
    	$("#mid_err").text("");
    });
    $("#category").on('blur', function(){
        $("#cat_err").text("");
    });
    $("#vendor").on('blur', function(){
    	$("#ven_err").text("");
    });
    $("#desc").on('blur', function(){
    	$("#des_err").text("");
    });
    $("#features").on('blur', function(){
    	$("#ftr_err").text("");
    });
    $("#cost").on('blur', function(){
    	$("#cst_err").text("");
    });
    $("#retail").on('blur', function(){
    	$("#ret_err").text("");
    });
    $("#quantity").on('blur', function(){
    	$("#qty_err").text("");
    });
    $("#p_img").on('blur', function(){
    	$("#img_err").text("");
    });




function sku_handler(response) {
        response = $.trim(response);
        if(response === 'SUCCESS')$('#sku_err').text("");
        else{
            $('#sku_err').text("Duplicate SKU found!");
            $("#sku").focus();
        }    
}

function logout_handler(response) {
    $('#logout').html(response);
}  

function logouterror_handler(response) {
    $('#logout').html(response);
} 

function upload_form_handler(response){
    response = $.trim(response);
   if(response === 'SUCCESS'){
    $('#form1_res').text("SKU " + $("#sku").val() + " added");
    $('#sku').val("");
    $("#category").val("0");
    $("#vendor").val("0");
    $("#mid").val("");
    $("#desc").val("");
    $("#features").val("");
    $("#cost").val("");
    $("#retail").val("");
    $("#image").val("");
    $("#p_img").html("<h5>&nbsp;</h5>");
    $('#sku').focus();
   }else
    $('#message_line').text(response);
}

function send_form_data(){

    var form_data = new FormData($('#form-1')[0]);
    form_data.append("sku", $("#sku").val());
    form_data.append("vendor", $("#vendor").val());
    form_data.append("category", $("#category").val());
    form_data.append("mid", $("#mid").val());
    form_data.append("description", $("#desc").val());
    form_data.append("features", $("#features").val());
    form_data.append("cost", $("#cost").val());
    form_data.append("retail", $("#retail").val());
    form_data.append("quantity", $("#quantity").val());
    var iname = document.getElementById("p_img").value;       
    var where = iname.lastIndexOf("\\");  // this is safer!
    iname = iname.substring(where+1);  
    form_data.append("image", iname);
    
    $.ajax({
            url: "http://jadran.sdsu.edu/cgi-bin/jadrn031/add_item.cgi",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
                if(response != ""){
                   $.get("http://jadran.sdsu.edu/cgi-bin/jadrn031/error.cgi",logouterror_handler);      
                }else{
                $('#form1_res').text("SKU " + $("#sku").val() + "  record added successfully!");
                $('#sku').val("");
                $("#category").val("none");
                $("#vendor").val("none");
                $("#mid").val("");
                $("#desc").val("");
                $("#features").val("");
                $("#cost").val("");
                $("#retail").val("");
                $("#p_img").val("");
                $("#quantity").val("");
                $('#sku').focus();
                populate_sku();
                }
            },
            error: function(response) {
               console.log(response);
               $('#form1_res').text("SKU " + $("#sku").val() + "record add unsuccessful please try again!");
            }
            }); //ajax add item
    }//send form data

 ///////////////////////////////////////////////////////EDIT RECORD /////////////////////////////////////////////////////
     $('#tabs-2').on('click', '#sku2', function(e){
        console.log("Tab 2 clicked");
        $('#sku').val("");
        $("#category").val("none");
        $("#vendor").val("none");
        $("#mid").val("");
        $("#desc").val("");
        $("#features").val("");
        $("#cost").val("");
        $("#retail").val("");
        $("#p_img").val("");
        $("#quantity").val("");

        $.get("http://jadran.sdsu.edu/cgi-bin/jadrn031/db_getsku.cgi", function(data, status){
            console.log(data);
        });//get

    }); //tabs 2 on click


    function populate_sku(){

        $.ajax({
            url: "http://jadran.sdsu.edu/cgi-bin/jadrn031/db_getsku.cgi",
            type: "get",
            data: "",
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response);
                response = "" + response;
                response = response.trim();
                var skuList = response.split("|");
                for(var i = 0; i < (skuList.length -1); i++)
                {
                    $('#sku2').append($('<option>', {
                        value: skuList[i],
                        text: skuList[i]
                    }));
                }
                
                },
            error: function(response) {
               console.log(response);
               
            }
            });// ajax db_get sku
    } // populate_sku

    $('#tabs-2').on('click', '#get_sku_data', function(e){

        var form_data2 = new FormData();
        form_data2.append("sku", $("#sku2").val());

        $.ajax({
            url: "http://jadran.sdsu.edu/cgi-bin/jadrn031/get_sku_details.cgi",
            type: "post",
            data: form_data2,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response);
                show_details(response);
                
                },
            error: function(response) {
               console.log(response);
               
            }
            }); //ajax

    });// tabs 2 on click

    var category = {
      'nose': 1,
      'cheeks': 2,
      'lips': 3,
      'eyes': 4,
      'brows': 5
    };

    var vendor = {
      'mac': 1,
      'clinique': 2,
      'loreal': 3,
      'nyx': 4,
      'pixie': 5
    };

    function show_details(response){
        response = response.trim();
        var data_values = response.split("|");

        document.getElementById("category2").disabled=false;
        document.getElementById("vendor2").disabled=false;
        $("#mid2").attr('disabled', false);
        $("#desc2").attr('disabled', false);
        $("#features2").attr('disabled', false);
        $("#cost2").attr('disabled', false);
        $("#retail2").attr('disabled', false);
        $("#p_img2").attr('disabled', false);
        $("#quantity2").attr('disabled', false);
        $("#edit_item").attr('disabled', false);
     
        $( "#category2" ).find( 'option[value="' + category[data_values[2]]  + '"]' ).prop( "selected", true );
        $( "#vendor2" ).find( 'option[value="' + vendor[data_values[1]] + '"]' ).prop( "selected", true );
        $("#mid2").val(data_values[3]);
        $("#desc2").val(data_values[4]);
        $("#features2").val(data_values[5]);
        $("#cost2").val(data_values[8]);
        $("#retail2").val(data_values[7]);
        $("#quantity2").val(data_values[6]);
        $("#img_val").val(data_values[9]);
         var toDisplay = "<img style='width: 100%;max-height: 100%' src=\"/~jadrn031/proj1/images/" + data_values[9] + "\" />";                         
        $('#pic').html(toDisplay);
    }// show details

/////////////////////////////////////////DELETE RECORD////////////////////////////////////////
 function populate_sku_del(){

        $.ajax({
            url: "http://jadran.sdsu.edu/cgi-bin/jadrn031/db_getsku.cgi",
            type: "get",
            data: "",
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response);
                response = "" + response;
                response = response.trim();
                var skuList = response.split("|");
                for(var i = 0; i < (skuList.length -1); i++)
                {
                    $('#sku3').append($('<option>', {
                        value: skuList[i],
                        text: skuList[i]
                    }));
                }
                
                },
            error: function(response) {
               console.log(response);
               
            }
            });// ajax db_get sku

    }//populate sku del


 $('#tabs-3').on('click', '#del_sku_data', function(e){

        var form_data3 = new FormData();
        form_data3.append("sku", $("#sku3").val());

        $.ajax({
            url: "http://jadran.sdsu.edu/cgi-bin/jadrn031/get_sku_details.cgi",
            type: "post",
            data: form_data3,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response);
                show_details_del(response);
                
                },
            error: function(response) {
               console.log(response);
               
            }
            }); //ajax

    });// tabs 2 on click

    function show_details_del(response){
        response = response.trim();
        var data_values = response.split("|");
         $('#message3').html("");
        $( "#cat3" ).html([data_values[2]]);
        $( "#ven3" ).html([data_values[1]]);;
        $("#mid3").html(data_values[3]);
        $("#desc3").html(data_values[4]);
        $("#features3").html(data_values[5]);
        $("#cost3").html(data_values[8]);
        $("#retail3").html(data_values[7]);
        $("#quantity3").html(data_values[6]);
         var toDisplay2 = "<img style='width: 100%;max-height: 100%' src=\"/~jadrn031/proj1/images/" + data_values[9] + "\" />";                         
        $('#pic2').html(toDisplay2);

    }// show details_del

    $('#tabs-3').on('click', '#del_item', function(e){

        if($("#sku3").val() == "none"){
            $('#message3').html("Record not selected.Please select a valid record to delete");
            return;
        }
        var form_data3 = new FormData();
        form_data3.append("sku", $("#sku3").val());

        $.ajax({
            url: "http://jadran.sdsu.edu/cgi-bin/jadrn031/deleteitem.cgi",
            type: "post",
            data: form_data3,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response);
                if(response != ""){
                   $.get("http://jadran.sdsu.edu/cgi-bin/jadrn031/error.cgi",logouterror_handler);      
                }else{
                var dele = $("#sku3").val();
                $('#message3').html("RECORD OF SKU  " + $("#sku3").val()+ "  DELETED")
                $( "#cat3" ).html("");
                $( "#ven3" ).html("");;
                $("#mid3").html("");
                $("#desc3").html("");
                $("#features3").html("");
                $("#cost3").html("");
                $("#retail3").html("");
                $("#quantity3").html("");
                $("#pic2").html("");
                $( "#sku3" ).find( 'option[value="' + "none" + '"]' ).prop( "selected", true );
                $("#sku3 option[value=" +dele + "]").remove();
                $("#sku2 option[value=" +dele + "]").remove();
            }
                },
            error: function(response) {
               console.log(response);
               
            }
            }); //ajax

    });// tabs 2 on delete item

/////////////////////////////////////////////EDIT AGAIN///////////////////////////

$('#tabs-2').on('click', '#edit_item', function(e){

        ok = true;
        
        e.preventDefault();
        
        if($("#vendor2").val()==="none"){
            $("#ven_err2").text("Please Select Vendor!");
            ok = false;
        }
        if($("#mid2").val() == ""){
            $("#mid_err2").text("Please enter Manufacturer's ID!");
            ok = false;
        }
        if($("#category2").val()==="none"){
           $("#cat_err2").text("Please Select Category!");
            ok = false;
        }
        if($("#desc2").val() == ""){
           $("#des_err2").text("Please enter Description!");
           ok = false;
        }
        if($("#features2").val() == ""){
            $("#ftr_err2").text("Please enter Features!");
            ok = false;
        }
        if($("#cost2").val() == ""){
           $("#cst_err2").text("Please enter Cost!");
           ok = false;
        }
        else if(new RegExp('^[0-9]*(\.[0-9]{2})?$').test($("#cost2").val()) == false){
           $("#cst_err2").text("Invalid Cost!");
           ok = false;
        }
        if($("#retail2").val() == ""){
           $("#ret_err2").text("Please enter Retail!");
           ok = false;
        }
        else if(new RegExp('^[0-9]*(\.[0-9]{2})?$').test($("#retail2").val()) == false){
           $("#ret_err2").text("Invalid Retail!");
           ok = false;
        }else if($("#cost2").val() != "" && new RegExp('^[0-9]*(\.[0-9]{2})?$').test($("#cost2").val()) == true){
            if($("#retail2").val() <= 1.25*$("#cost2").val()){
                $("#ret_err2").text(" Retail should be 25% greater than cost price");
                ok = false;
            }
        }
        if($("#quantity2").val() == ""){
           $("#qty_err2").text("Please enter Quantity!");
        }else if(new RegExp('^[0-9]*(\.[0-9]{2})?$').test($("#quantity2").val()) == false){
            ok = false;
           $("#qty_err2").text("Invalid Quantity!");
        }
        if(ok){
            console.log("Sending data to server");
            var img_name = $("#sku2").val().toLowerCase();
            var form_data = new FormData($('#form-2')[0]);
            if(!document.getElementById("p_img2").files[0]){
                edit_form_data();
            }else{
            form_data.append("image", document.getElementById("p_img2").files[0]);
            $.ajax({
            url: "http://jadran.sdsu.edu/cgi-bin/jadrn031/img_upload.cgi",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
             console.log("success");
              edit_form_data();
                },
            error: function(response) {
                $("$form2_res").text("Image upload Error. Please Try again");
                $("#p_img").val() = "";
                $("#p_img").focus();
            }

            });
            }
        } // if ok
    }); // tabs 2 on click

    function edit_form_data(){

    var form_data = new FormData($('#form-2')[0]);
    form_data.append("sku", $("#sku2").val());
    form_data.append("vendor", $("#vendor2").val());
    form_data.append("category", $("#category2").val());
    form_data.append("mid", $("#mid2").val());
    form_data.append("description", $("#desc2").val());
    form_data.append("features", $("#features2").val());
    form_data.append("cost", $("#cost2").val());
    form_data.append("reatil", $("#retail2").val());
    form_data.append("quantity", $("#quantity2").val());
    var iname = document.getElementById("p_img2").value;       
    var where = iname.lastIndexOf("\\");  // this is safer!
    
    if(iname = ''){
       form_data.append("image", $("img_val")); 
    }else {
        iname = iname.substring(where+1);  
        form_data.append("image", iname);
    }
    
    $.ajax({
            url: "http://jadran.sdsu.edu/cgi-bin/jadrn031/edit_item.cgi",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
                if(response != ""){
                   $.get("http://jadran.sdsu.edu/cgi-bin/jadrn031/error.cgi",logouterror_handler);      
                }else{
                $('#form2_res').text("SKU " + $("#sku2").val() + "  record editted successfully!");
                $('#sku2').val("");
                $("#category2").val("none");
                $("#vendor2").val("none");
                $("#mid2").val("");
                $("#desc2").val("");
                $("#features2").val("");
                $("#cost2").val("");
                $("#retail2").val("");
                $("#p_img2").val("");
                $("#quantity2").val("");
                $("#pic").html("");
                }
            },
            error: function(response) {
               console.log(response);
               $('#form2_res').text("SKU " + $("#sku").val() + "record edit unsuccessful please try again!");
            }
            }); //ajax add item
    }//send form data

function display_img(img) {
      var toDisplay = "<img src=\"/~jadrn031/proj1/images/" + img.toLowerCase() + "\" margin-left=\"250px\" height=\"100px\" width=\"150px\" />";
      $('#pic2').html(toDisplay);
}

});// document on ready
//#sourceURL=tabs.js
