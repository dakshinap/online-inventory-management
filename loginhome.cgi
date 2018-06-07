
#!/usr/bin/perl



print <<END;
Content-type: text/html

<html>
<head>
<meta charset="utf-8">
      <title>Daks MakeUp Alley</title>
      <link rel="stylesheet" href="http://jadran.sdsu.edu/~jadrn031/proj1/tabs_example.css">
      <script src="http://jadran.sdsu.edu/~jadrn031/proj1/jquery/jquery.js"></script>
      <script src="http://jadran.sdsu.edu/~jadrn031/proj1/jquery/jqueryUI.js"></script>    
      <script src="http://jadran.sdsu.edu/~jadrn031/proj1/tabs.js"></script>
</head>
<body>

  <h2>Daks MakeUp Alley</h2>
  <form method=post id=logout>
  <input type=button style="margin:auto;display:block;" id=logoutbtn value=Logout>

    <div id="tabs">
      <ul>
        <li><a href="#tabs-1"><span>New Record</span></a></li>
        <li><a href="#tabs-2" ><span >Edit Record</span></a></li>
        <li><a href="#tabs-3"><span id="del">Delete Record</span></a></li>       
      </ul>
      <div id="tabs-1">
      <form method="post" enctype="multipart/form-data" id="form-1" action="">
        <p>
          <table id="customers">
          <tr>
            <th>Field</th>
            <th>Value</th>
            <th></th>
          </tr>
          <tr>
            <td>SKU</td>
            <td><input type="text" id="sku"></td>
            <td id="sku_err"></td>
          </tr>
          <tr>
            <td>Category</td>
            <td><select id="category">
            <option value="none">None</option>
            <option value="1">Nose</option>
            <option value="2">Cheeks</option>
            <option value="3">Lips</option>
            <option value="4">Eyes</option>
            <option value="5">Brows</option>
            </select></td>
            <td id="cat_err"></td>
          </tr>
          <tr>
            <td>Vendor</td>
            <td><select id="vendor">
            <option value="none">None</option>
            <option value="1">MAC</option>
            <option value="2">CLINIQUE</option>
            <option value="3">LOREAL</option>
            <option value="4">NYX</option>
            <option value="5">PIXIE</option>
            </select></td>
            <td id="ven_err"></td>
          </tr>
          <tr>
            <td>Manufacturers Identifier</td>
            <td><input type="text" id="mid"></td>
            <td id="mid_err"></td>
          </tr>
          <tr>
            <td>Description</td>
            <td><input type="text" id="desc"></td>
            <td id="des_err"></td>
          </tr>
          <tr>
            <td>Features</td>
            <td><input type="text" id="features"></td>
            <td id="ftr_err"></td>
          </tr>
          <tr>
            <td>Cost</td>
            <td><input type="text" id="cost"></td>
            <td id="cst_err"></td>
          </tr>
          <tr>
            <td>Retail</td>
            <td><input type="text" id="retail"></td>
            <td id="ret_err"></td>
          </tr>
          <tr>
            <td>Quantity</td>
            <td><input type="text" id="quantity"></td>
            <td id="qty_err"></td>
          </tr>
          <tr>
            <td>Product Image</td>
            <td><input type="file" id="p_img" name="product_image" /></td>
            <td id="img_err"></td>
          </tr>
        </table>
      </p>
      <input type="submit" id="new_item" value="Submit">
      </form>
      <p id="form1_res"></p>
      </div>
 
      <div id="tabs-2">
      <form method="post" enctype="multipart/form-data" id="form-2" action="">
      <p id = "img_val" hidden></p>
        <p>
          <table id="customers2">
          <p>"Please select a SKU to EDIT"</p>
          <tr>
            <td><b>Field</b></td>
            <td><b>Value</b></td>
          </tr>
          <tr>
            <td>SKU</td>
            <td><select id="sku2">
            <option value="none">Select sku</option>
            </select></td>
            <td><button type="button" id="get_sku_data">Get Details</button></td>
          </tr>
          <tr>
            <td>Category</td>
            <td><select id="category2" disabled>
            <option value="none">None</option>
            <option value="1">Nose</option>
            <option value="2">Cheeks</option>
            <option value="3">Lips</option>
            <option value="4">Eyes</option>
            <option value="5">Brows</option>
            </select></td>
            <td id="cat2_err"></td>
          </tr>
          <tr>
            <td>Vendor</td>
            <td><select id="vendor2" disabled>
            <option value="none">None</option>
            <option value="1">MAC</option>
            <option value="2">CLINIQUE</option>
            <option value="3">LOREAL</option>
            <option value="4">NYX</option>
            <option value="5">PIXIE</option>
            </select></td>
            <td id="ven_err2"></td>
          </tr>
          <tr>
            <td>Manufacturers Identifier</td>
            <td><input type="text" id="mid2" disabled></td>
            <td id="mid_err2"></td>
          </tr>
          <tr>
            <td>Description</td>
            <td><input type="text" id="desc2" disabled></td>
            <td id="des_err2"></td>
          </tr>
          <tr>
            <td>Features</td>
            <td><input type="text" id="features2" disabled></td>
            <td id="ftr_err2"></td>
          </tr>
          <tr>
            <td>Cost</td>
            <td><input type="text" id="cost2" disabled></td>
            <td id="cst_err2"></td>
          </tr>
          <tr>
            <td>Retail</td>
            <td><input type="text" id="retail2" disabled></td>
            <td id="ret_err2"></td>
          </tr>
          <tr>
            <td>Quantity</td>
            <td><input type="text" id="quantity2" disabled></td>
            <td id="qty_err2"></td>
          </tr>
          <tr>
            <td>Product Image</td>
            <td><input type="file" id="p_img2" name="product_image" disabled/></td>
            <td id="img_err2"></td>
          </tr>
        </table>
        <div id="pic" style="width:225px;height:225px"></div>
      </p>
      <input type="submit" id="edit_item" value="Submit" disabled>
      </form>
      <p id="form2_res"></p>
      </div>


      <div id="tabs-3">
        <p>
          <table id="customers3">
          <p>"Please select a SKU to DELETE"</p>
          <tr>
            <td><b>Field</b></td>
            <td><b>Value</b></td>
          </tr>
          <tr>
            <td>SKU</td>
            <td><select id="sku3"><option value="none">Select sku</option></select></td>
            <td><button type="button" id="del_sku_data">Get Details</button></td>
          </tr>
          <tr>
            <td>Category</td>
            <td id="cat3" ></td>
          </tr>
          <tr>
            <td>Vendor</td>
            <td id="ven3"></td>
          </tr>
          <tr>
            <td>Manufacturers Identifier</td>
            <td id="mid3"></td>
          </tr>
          <tr>
            <td>Description</td>
            <td id="desc3" ></td>
          </tr>
          <tr>
            <td>Features</td>
            <td id="features3" ></td>
          </tr>
          <tr>
            <td>Cost</td>
            <td id="cost3" ></td>
          </tr>
          <tr>
            <td>Retail</td>
            <td id="retail3"></td>
          </tr>
          <tr>
            <td>Quantity</td>
            <td id="quantity3" ></td>
          </tr>
          <tr>
            <td>Product Image</td>
            <td id="p_img3"></td>
          </tr>
        </table>
        <div id="pic2" style="width:225px;height:225px"></div>
      </p>
      <button type="button" id="del_item" > Delete record </button> 
      <p id="message3"></p>
      </div>
</form>
</body>
</html>

END