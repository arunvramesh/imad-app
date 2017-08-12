var button= document.getElementById("counter");
button.onclick = function()
{
    //make request
    var request= new XMLHttpRequest();
    
    request.onReadyStateChange = function(){
        if(request.readystate==XMLHttpRequest.DONE){
            if(request.status==200){
                var counter = request.getresponceText;
                var span=document.getElementById("count");
                span.innerHTML=counter.toString();
            }
        }
    }
    request.open('GET',"http://arunvramesh96.imad.hasura-app.io/counter",true);
    request.sent(null);
}