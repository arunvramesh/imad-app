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
};

var submit=document.getElementById("button");
var input=document.getElementById("name");
var name1=input.value;
submit.onclick = function () {
    var names = ["name1","name2","name3"];
    var list='';
    for(var i=0 ; i< names.length ; i++)
    {
        list= list + "<li>" + names[i] +"</li>"
    }
    var hlist=document.getElementById("list");
    hlist.innerHTML=list;
};