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




//login
var lsubmit=document.getElementById("lbutton");

lsubmit.onclick = function () {
    var request= new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                consol.log('Succesfully loged in');
                alert("User succesfully loged in");
            }else if(request.status === 403){
                alert("Username or papssword incorrect");
            }else if(request.status === 500){
                alert("Somthing went wrong");
            }else if(request.status === 404){
                alert("404");
            }
        }
    }
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    request.open('POST',"http://arunvramesh96.imad.hasura-app.io/login/",true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username: username, password: password}));
};



//name
var submit=document.getElementById("button");

submit.onclick = function () {
    var request= new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var names =request.responseText;
                names=JSON.parse(names);
                var list='';
                for(var i=0 ; i< names.length ; i++)
                {
                    list= list + "<li>" + names[i] +"</li>"
                }
                var hlist=document.getElementById("list");
                hlist.innerHTML=list;
            }
        }
    }
    var input=document.getElementById("name");
    var name1=input.value;
    request.open('GET',"http://arunvramesh96.imad.hasura-app.io/name?name="+name1,true);
    request.send(null);
};