<html>
    <head>
        <title>
            Products
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/css/navbar.css">
        <link rel="icon" href="/img/grocery2.png">
        <link rel="stylesheet" href="/css/styles.css">
        <link rel="stylesheet" href="/css/products.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
        integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
        <script>
            function displaylist(element){
                if(document.getElementById(element).style.display="none"){
                document.getElementById(element).style.display="block";
                document.getElementById("show").style.display="none";
                document.getElementById("hide").style.display="block";
                document.getElementById(element).style.marginLeft="15%";
                document.getElementById(element).style.marginRight="15%";}
                else{
                document.getElementById(element).style.display="none";}
            }
            function hidelist(element){
                document.getElementById(element).style.display="none";
                document.getElementById("show").style.display="block";
                document.getElementById("hide").style.display="none";
            }
            
        </script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    </head>
    <body>
{{>header}}
        <div class="main-content">
           
            <h3 style="float: left;margin-left:4%">Cilck to add item in your cart</h3>
                <form action="/addtocart" method="POST" style="float: right;">
                <input type="hidden" name="p1" id="nacho1" value="0" ></input>
                <input type="hidden" name="p2" id="nacho2" value="0" ></input>
                <input type="hidden" name="p3" id="nacho3" value="0" ></input>
                <input type="hidden" name="p4" id="nacho4" value="0" ></input>
                <input type="submit" style="cursor:pointer;: right;margin-right:10 %;border-radius:12px;padding:10px;" onclick=addtocart() value="Add to cart" ></input>
                </form><br><br><br>
                {{!-- <button onclick=addtocart()></button> --}}
            {{!-- <table  style="width: 100%;position:relative;" >

                <tr style="margin-top: 16px;">


                    <td class="oneproduct" onclick=displaylist("list1") style="padding-top: 3%;" ><center><img src="/img/beverages.png">
                    <br>Beverages<br><br>
                    <p id="show" style="color:blue;cursor:pointer;">Click here to see products</p>
                    <p id="hide" style="display: none;color:blue" onclick=hidelist("list1")>Click + to add item to cart</p>
                        
                        <table id="list1" style="display: none;">
                            <tr>
                                <th>Product</th>
                                <th>Amount</th>
                                <th>Price</th>
                                <th colspan="3">Quantity</th>
                            </tr>
                             <tr>
                                        <td>Coffee</td>
                                        <td>50 gm</td>
                                        <td>25</td>
                                        <div>
                                            <td><span class="minus bg-red cfm">-</span></td>
                                            <td><input id="coffee" type="number" class="count" name="coffee" value="0" disabled=""
                                                    style=" width: 4px; height: 20px;"></input>
                                            </td>
                                            {{!-- <td><button onclick="addProduct(Coffee,25)">+</button></td> --}}
                                            <td><span class="plus bg-green cfp">+</span></td>
                                        </div>

                                    </tr>
                            <tr>
                                <td>Tea</td>
                                <td>50gm</td>
                                <td>20</td>
                                <div>
                                            <td><span class="minus bg-red tem">-</span></td>
                                            <td><input id="tea" type="number" class="count" name="tea" value="0" disabled=""
                                                    style=" width: 4px; height: 20px;"></input>
                                            </td>
                                            {{!-- <td><button onclick="addProduct(Coffee,25)">+</button></td> --}}
                                            <td><span class="plus bg-green tep">+</span></td>
                                        </div>
                            </tr>
                            <tr>
                                <td>Orange Juice</td>
                                <td>250ml</td>
                                <td>50</td>
                                <div>
                                            <td><span class="minus bg-red orm">-</span></td>
                                            <td><input id="orange" type="number" class="count" name="orange" value="0" disabled=""
                                                    style=" width: 4px; height: 20px;"></input>
                                            </td>
                                            {{!-- <td><button onclick="addProduct(Coffee,25)">+</button></td> --}}
                                            <td><span class="plus bg-green orp">+</span></td>
                                        </div>
                            </tr>
                            <tr>
                                <td>Strawberry Juice</td>
                                <td>250ml</td>
                                <td>50</td> 
                                <div>
                                            <td><span class="minus bg-red stm">-</span></td>
                                            <td><input id="strawberry" type="number" class="count" name="strawberry" value="0" disabled=""
                                                    style=" width: 4px; height: 20px;"></input>
                                            </td>
                                            {{!-- <td><button onclick="addProduct(Coffee,25)">+</button></td> --}}
                                            <td><span class="plus bg-green stp">+</span></td>
                                        </div>
                            </tr>
                        </table></center>
                    </td>


                    <td class="oneproduct" onclick=displaylist("list2") style="padding-top: 3%;"><center><img src="/img/bakery.png">
                    <br>Bread/Bakery<br><br>
                    <p id="show" style="color:blue">Click here to see products</p>
                    <p id="hide" style="display: none;color:blue" onclick=hidelist("list2")>Click + to add item to cart</p>
                        
                        <table id="list2" style="display: none;">
                            <tr>
                                <th>Product</th>
                                <th>Amount</th>
                                <th>Price</th>
                                <th colspan="3">Quantity</th>
                            </tr>
                            <tr>
                                <td>Coffee</td>
                                <td>50 gm</td>
                                <td>25</td>
                                <div>
                                            <td><span class="minus bg-red">-</span></td>
                                            <td><input type="number" class="count" name="qty" value="0" disabled=""
                                                    style=" width: 4px; height: 20px;"></input>
                                            </td>
                                            {{!-- <td><button onclick="addProduct(Coffee,25)">+</button></td> --}}
                                            <td><span class="plus bg-green">+</span></td>
                                        </div>
                            </tr>
                            <tr>
                                <td>Tea</td>
                                <td>50gm</td>
                                <td>20</td>
                                <div>
                                            <td><span class="minus bg-red">-</span></td>
                                            <td><input type="number" class="count" name="qty" value="0" disabled=""
                                                    style=" width: 4px; height: 20px;"></input>
                                            </td>
                                            {{!-- <td><button onclick="addProduct(Coffee,25)">+</button></td> --}}
                                            <td><span class="plus bg-green">+</span></td>
                                        </div>
                            </tr>
                            <tr>
                                <td>Orange Juice</td>
                                <td>250ml</td>
                                <td>50</td>
                               <div>
                                            <td><span class="minus bg-red">-</span></td>
                                            <td><input type="number" class="count" name="qty" value="0" disabled=""
                                                    style=" width: 4px; height: 20px;"></input>
                                            </td>
                                            {{!-- <td><button onclick="addProduct(Coffee,25)">+</button></td> --}}
                                            <td><span class="plus bg-green">+</span></td>
                                        </div>
                            </tr>
                            <tr>
                                <td>Strawberry Juice</td>
                                <td>250ml</td>
                                <td>50</td> 
                                <div>
                                            <td><span class="minus bg-red">-</span></td>
                                            <td><input type="number" class="count" name="qty" value="0" disabled=""
                                                    style=" width: 4px; height: 20px;"></input>
                                            </td>
                                            {{!-- <td><button onclick="addProduct(Coffee,25)">+</button></td> --}}
                                            <td><span class="plus bg-green">+</span></td>
                                        </div>
                            </tr>
                        </table></center></td>
                    <td class="oneproduct" onclick=displaylist("list3") style="padding-top: 3%;"><center><img src="/img/canned.png">
                    <br>Canned/Jarred Goods<br><br>
                    <p id="show" style="color:blue;">Click here to see products</p>
                    <p id="hide" style="display: none;color:blue" onclick=hidelist("list3")>Click + to add item to cart</p>
                        
                        <table id="list3" style="display: none;">
                            <tr>
                                <th>Product</th>
                                <th>Amount</th>
                                <th>Price</th>
                                <th colspan="3">Quantity</th>
                            </tr>
                            <tr>
                                <td>Coffee</td>
                                <td>50 gm</td>
                                <td>25</td>
                                <div>
                                            <td><span class="minus bg-red">-</span></td>
                                            <td><input type="number" class="count" name="qty" value="0" disabled=""
                                                    style=" width: 4px; height: 20px;"></input>
                                            </td>
                                            {{!-- <td><button onclick="addProduct(Coffee,25)">+</button></td> --}}
                                            <td><span class="plus bg-green">+</span></td>
                                        </div>
                            </tr>
                            <tr>
                                <td>Tea</td>
                                <td>50gm</td>
                                <td>20</td>
                                <div>
                                            <td><span class="minus bg-red">-</span></td>
                                            <td><input type="number" class="count" name="qty" value="0" disabled=""
                                                    style=" width: 4px; height: 20px;"></input>
                                            </td>
                                            {{!-- <td><button onclick="addProduct(Coffee,25)">+</button></td> --}}
                                            <td><span class="plus bg-green">+</span></td>
                                        </div>
                            </tr>
                            <tr>
                                <td>Orange Juice</td>
                                <td>250ml</td>
                                <td>50</td>
                                <div>
                                            <td><span class="minus bg-red">-</span></td>
                                            <td><input type="number" class="count" name="qty" value="0" disabled=""
                                                    style=" width: 4px; height: 20px;"></input>
                                            </td>
                                            {{!-- <td><button onclick="addProduct(Coffee,25)">+</button></td> --}}
                                            <td><span class="plus bg-green">+</span></td>
                                        </div>
                            </tr>
                            <tr>
                                <td>Strawberry Juice</td>
                                <td>250ml</td>
                                <td>50</td> 
                                <div>
                                            <td><span class="minus bg-red">-</span></td>
                                            <td><input type="number" class="count" name="qty" value="0" disabled=""
                                                    style=" width: 4px; height: 20px;"></input>
                                            </td>
                                            {{!-- <td><button onclick="addProduct(Coffee,25)">+</button></td> --}}
                                            <td><span class="plus bg-green">+</span></td>
                                        </div>
                            </tr>
                        </table></center></td>
                   
                </tr>
                <tr>
                    <td class="oneproduct" style="padding-top: 3%;"><center><img src="/img/baking.png">
                    <br>Dry/Baking Goods</center></td>
                     <td class="oneproduct"style="padding-top: 3%;"><center><img src="/img/dairy.png">
                    <br>Dairy</center></td>
                    <td class="oneproduct" style="padding-top: 3%;"><center><img src="/img/frozen.png">
                    <br>Frozen Foods</center></td>
                </tr>
                <tr>
                    <td class="oneproduct" style="padding-top: 3%;"><center><img src="/img/meat.png">
                    <br>Meat</center></td>
                    <td class="oneproduct" style="padding-top: 3%;"><center><img src="/img/produce.png">
                    <br>Produce</td></td>
                    <td class="oneproduct" style="padding-top: 3%;"><center><img src="/img/soap.png">
                    <br>Personal Care</center></td>
                    
                </tr>
                <tr>
                    <td class="oneproduct" style="padding-top: 3%;"><center><img src="/img/cleaners.png">
                    <br>Cleaners</center></td>
                    <td class="oneproduct" style="padding-top: 3%;"><center><img src="/img/paper.png">
                    <br>Paper goods</center></td>
                    <td class="oneproduct"  style="padding-top: 3%;"><center><img src="/img/cart.png">
                    <br>Go to Cart</center></td>
                   
                </tr>
                

            </table> --}}

            <div class="pcontainer">
                <div class="prow">
                    <div class="pcol oneproduct" onclick=displaylist("list1")>
                        <img src="/img/beverages.png" alt="Beverages">
                        Beverages
                        <p id="show" style="color:blue;cursor:pointer;">Click here to see products</p>
                        <p id="hide" style="display: none;color:blue" onclick=hidelist("list1")>Click + to add item to cart</p>
                        <div class="pcontainer" id="list1" style="display: none;">
                            <div class="prow">
                                <div class="pcol-16">Product</div>
                                <div class="pcol-16">Amount</div>
                                <div class="pcol-16">Price</div>
                                <div class="pcol-48">>Quantity</div>
                            </div>
                             <div class="prow">
                                        <div class="pcol-16">Coffee</div>
                                        <div class="pcol-16">50 gm</div>
                                        <div class="pcol-16">25</div>
                                        <div class="pcol-48">
                                            <div class="pcol-16"><span class="minus bg-red cfm">-</span></div>
                                            <div class="pcol-16"><input id="coffee" type="number" class="count" name="coffee" value="0" disabled=""
                                                    style=" width: 4px; height: 20px;"></input>
                                            </div>
                                            {{!-- <td><button onclick="addProduct(Coffee,25)">+</button></td> --}}
                                            <div class="pcol-16"><span class="plus bg-green cfp">+</span></div>
                                        </div>

                            </div>
                                <div class="prow">
                                <div class="pcol-16">Tea</div>
                                <div class="pcol-16">50 gm</div>
                                <div class="pcol-16">20</div>
                                <div class="pcol-48">
                                    <div class="pcol-16"><span class="minus bg-red tem">-</span></div>
                                    <div class="pcol-16"><input id="tea" type="number" class="count" name="tea" value="0" disabled=""
                                            style=" width: 4px; height: 20px;"></input>
                                    </div>
                                    {{!-- <td><button onclick="addProduct(Coffee,25)">+</button></td> --}}
                                    <div class="pcol-16"><span class="plus bg-green tep">+</span></div>
                                </div>

                            </div>
                            <div class="prow">
                                <div class="pcol-16">Orange Juice</div>
                                <div class="pcol-16">250 ml</div>
                                <div class="pcol-16">50</div>
                                <div class="pcol-48">
                                    <div class="pcol-16"><span class="minus bg-red orm">-</span></div>
                                    <div class="pcol-16"><input id="orange" type="number" class="count" name="orange" value="0" disabled=""
                                            style=" width: 4px; height: 20px;"></input>
                                    </div>
                                    {{!-- <td><button onclick="addProduct(Coffee,25)">+</button></td> --}}
                                    <div class="pcol-16"><span class="plus bg-green orp">+</span></div>
                                </div>

                            </div>
                            <div class="prow">
                                <div class="pcol-16">Strawberry Juice</div>
                                <div class="pcol-16">250 ml</div>
                                <div class="pcol-16">50</div>
                                <div class="pcol-48">
                                    <div class="pcol-16"><span class="minus bg-red stm">-</span></div>
                                    <div class="pcol-16"><input id="strawberry" type="number" class="count" name="strawberry" value="0" disabled=""
                                            style=" width: 4px; height: 20px;"></input>
                                    </div>
                                    {{!-- <td><button onclick="addProduct(Coffee,25)">+</button></td> --}}
                                    <div class="pcol-16"><span class="plus bg-green stp">+</span></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>

    <script src="/js/app.js"> </script>
    <script>
        $(document).ready(function () {
            $('#coffee').prop('disabled', true);
            $(document).on('click', '.cfp', function () {
                $('#coffee').val(parseInt($('#coffee').val()) + 1);
            });
            $(document).on('click', '.cfm', function () {
                $('#coffee').val(parseInt($('#coffee').val()) - 1);
                if ($('#coffee').val() < 0) {
                    $('#coffee').val(0);
                }
            });
        });
    </script>
    <script>
        $(document).ready(function () {
            $('#strawberry').prop('disabled', true);
            $(document).on('click', '.stp', function () {
                $('#strawberry').val(parseInt($('#strawberry').val()) + 1);
            });
            $(document).on('click', '.stm', function () {
                $('#strawberry').val(parseInt($('#strawberry').val()) - 1);
                if ($('#strawberry').val() < 0) {
                    $('#strawberry').val(0);
                }
            });
        });
    </script>
    <script>
        $(document).ready(function () {
            $('#tea').prop('disabled', true);
            $(document).on('click', '.tep', function () {
                $('#tea').val(parseInt($('#tea').val()) + 1);
            });
            $(document).on('click', '.tem', function () {
                $('#tea').val(parseInt($('#tea').val()) - 1);
                if ($('#tea').val() < 0) {
                    $('#tea').val(0);
                }
            });
        });
    </script>
    <script>
        $(document).ready(function () {
            $('#orange').prop('disabled', true);
            $(document).on('click', '.orp', function () {
                $('#orange').val(parseInt($('#orange').val()) + 1);
            });
            $(document).on('click', '.orm', function () {
                $('#orange').val(parseInt($('#orange').val()) - 1);
                if ($('#orange').val() < 0) {
                    $('#orange').val(0);
                }
            });
        });
    </script>
    <script>
        function addtocart(){
            var coffee=document.getElementById("coffee").value
            var tea=document.getElementById("tea").value
            var orange=document.getElementById("orange").value
            var strawberry=document.getElementById("strawberry").value
            
                document.getElementById("nacho1").value=coffee
                document.getElementById("nacho2").value=tea
                document.getElementById("nacho3").value=orange
                document.getElementById("nacho4").value=strawberry
                console.log(coffee)
            
            
        }
    </script>
    {{>footer}}

    </body>
</html>