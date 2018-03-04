 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) 
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        
        ga('create', 'UA-76049217-1', 'auto');
        ga('send', 'pageview'); 
        ga('set', 'page', '101 Main');



    $( document ).ready(function() {
        var loading = false;
        var animendCount = 0;

        $('select').material_select();
        $(".button-collapse").sideNav();
        Materialize.updateTextFields();

        onResetPrice = function(){

            $("#lock").hide();   
            var ethImage = $("#eth-image");
            var ethereum = $("#ethereum");
            ethImage.addClass("rotate");
            ethereum.prop("disabled",true);

            setTimeout(function(){
                Materialize.toast('Exchange rate has changed', 2000,'rounded') // 4000 is the duration of the toast

                $("#lock").show(); 
                var bitcoin = $("#bitcoin");  
                var ethereum = $("#ethereum");
                var ethImage = $("#eth-image");
                ethImage.removeClass("rotate");
                ethereum.prop("disabled",false);
                resetPrice(bitcoin,true);
            }, 2000)
        }

        onAnimationListener = function(){
            animendCount ++;
            if (animendCount > 1)
            {
                animendCount = 0;
                onResetPrice();
            }
        }

        resetPrice = function(obj,noFocus){
            var ethVal = $(obj).val() / $("#ethCurss").val()
            console.log("New curs"+$("#ethCurss").val())
            if (noFocus == false)
                $("#ethereum").focus();
            $("#ethereum").val(ethVal.toFixed(8))     
            $("#bitcoin").removeClass("invalid")

        }

        $("#bitcoin").on("keypress",function(event,el){
            // console.log(event.keyCode)
            // Not allow: - + e
            if(event.keyCode == 43 || event.keyCode == 45 || event.keyCode == 101)
                event.preventDefault();
            // If . is netered, lets check if we'got it already in place, 
            //    If yes, prevent it.
            if(event.keyCode == 46)
            {
                var val = $(this).val();
                if(val.indexOf('.') > -1)
                    event.preventDefault();
            }    
        });

        $("#bitcoin").on("input",function(event){
            resetPrice(this,false);     
            $(this).focus();
        });

        $("#step1").on("click", function(obj,el){


$.ajax({
    type: "POST",
    url: "/Index?handler=List",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data:  JSON.stringify({
        auth:{
            user: "Test",
            pass: "pass1"
        }
    }),
    beforeSend: function (xhr) {
    console.log( $('input:hidden[name="__RequestVerificationToken"]').val());
        xhr.setRequestHeader("XSRF-TOKEN",
            $('input:hidden[name="__RequestVerificationToken"]').val());
    },
    success: function (response) {
        alert(1);
    },
    failure: function (response) {
        alert(response);
    }
});



            return;

            var btc = $("#bitcoin").val();
            //var ethImage = $("#eth-image");
            //ethImage.addClass("rotate");

            if (btc == "" ){
                $("#bitcoin").addClass("invalid");
                $("#bitcoin").focus();
                 return;   
            }
                
            $("#lock").show();    
            $("#step1").hide();  
            $("#wallet").show();  
            $("#row-step2").show();  
            

            var anim = document.getElementById("lock");
            anim.addEventListener("animationend", onAnimationListener, false);
              
            $("#bitcoin").addClass("disabled");
            $("#ethereum").addClass("disabled");
            $("#bitcoin-address").focus();
            return;
        });

        $("#step2").on("click", function(obj,el){

            var btc = $("#bitcoin-address").val();
            var eth = $("#ethereum-address").val();
            
            if (btc == "" ){
                $("#bitcoin-address").addClass("invalid");
                $("#bitcoin-address").focus();
                 return;   
            }   
            if (eth == "" ){
                $("#ethereum-address").addClass("invalid");
                $("#ethereum-address").focus();
                 return;   
            }   

            var el = $(this).find("i");

            if (loading == false) {
                el[0].innerText = "autorenew";
                $(el[0]).addClass("rotate");
                el.removeClass("force-hidden");

                $("#loader").show();
                loading = true;

            } else {
                el[0].innerText = "autorenew";
                $(el[0]).removeClass("rotate");
                el.addClass("force-hidden");

                $("#loader").hide();
            }

            window.setTimeout(function(){
                $("#loader").hide();
                $("#ethereum-address").focus();
                $("#ethereum-address").addClass("invalid");
                $("#bitcoin-address").addClass("invalid");

                el[0].innerText = "autorenew";
                $(el[0]).removeClass("rotate");
                el.addClass("force-hidden");
                loading = false;
                
            }, 500);
            return;
        });

        $("#bitcoin-address").on("input",function(){
            $("#bitcoin-address").removeClass("invalid")
        });

        $("#ethereum-address").on("input",function(){
            $("#ethereum-address").removeClass("invalid")
        });

        //
        //
        //
        var index = 0;
        var eth2btc = 0;
        var btc2usd = 0;
        var btc = document.getElementById("BTC");
        var btc1 = document.getElementById("BTC1");
        var cls = "";
        var cls1 = "";
        
        var ectIndex = 0;
        var btcIndex = 0;
        var xrpIndex = 0;
        var eth2btcIndex = 0;

        
        var ws = new WebSocket('wss://api.bitfinex.com/ws/');

        ws.onopen = function(){
            ws.send(JSON.stringify({'event':'subscribe','channel':'ticker','pair':'ETHUSD'}));
            ws.send(JSON.stringify({'event':'subscribe','channel':'ticker','pair':'BTCUSD'}));
            ws.send(JSON.stringify({'event':'subscribe','channel':'ticker','pair':'XRPUSD'}));
            ws.send(JSON.stringify({'event':'subscribe','channel':'ticker','pair':'ETHBTC'}));
            ws.send(JSON.stringify({'event':'subscribe','channel':'ticker','pair':'BTCETH'}));
        };

        
        ws.onmessage = function(msg){
            //$("#loader").show();
            var log = JSON.parse(msg.data);
            if (log.event != null && log.event =='subscribed')
            {
                if(log.pair == 'ETHUSD'){
                    ectIndex = log.chanId
                } else  
                    if(log.pair == 'BTCUSD'){
                        btcIndex = log.chanId
                    }
                    else    
                    if(log.pair == "XRPUSD"){ //
                        xrpIndex = log.chanId
                    }
                    else
                    if(log.pair == "ETHBTC"){ //
                        eth2btcIndex = log.chanId
                    }
            }
            
            if (log == null || log == '' || log.length == 0 || log.event != null || log[1] == 'hb')
                return;
                
            if (log[0] == ectIndex){
                $("#icoETH").text("$"+parseFloat(log[7]).toLocaleString())
                //console.log(parseFloat(log[7]))    
            } else
                if (log[0] == btcIndex){
                    $("#icoBTC").text("$"+parseFloat(log[7]).toLocaleString())
                    //console.log(parseFloat(log[7]))    
                } else
                    if (log[0] == xrpIndex){
                        $("#icoXRP").text("$"+parseFloat(log[7]).toString())
                        //console.log(parseFloat(log[7]))    
                    } else
                    if (log[0] == eth2btcIndex){
                        $("#ethCurss").val(parseFloat(log[7]))

                        console.log(parseFloat(log[7]))    
                    } 
                    
            if (loading == false)
                $("#loader").hide();
        };

    });