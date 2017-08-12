var button= document.getElementById("counter");
button.onclick = function()
{
    //make request
    var request= new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responseText;
                var span=document.getElementById("count");
                span.innerHTML=counter.toString();
            }
        }
    }
    request.open('GET',"http://arunvramesh96.imad.hasura-app.io/counter",true);
    request.send(null);
}

var submit=document.getElementById("button");
var input=document.getElementById("name");
var name=input.value;
submit.onclick = function() {
    
}