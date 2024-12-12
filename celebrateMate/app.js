function addData(){
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pwd').value;
    
    localStorage.setItem('username', username);
    localStorage.setItem('userEamil', email);
    localStorage.setItem('userPass', pass);


}


function checkData(){
    var enterusername = document.getElementById('username').value;
    var enterpass = document.getElementById('pwd').value;

    var getuser=localStorage.getItem('username');
    var getpass=localStorage.getItem('userPass');

    if(enterusername == getuser){
        if(enterpass == getpass){
           window.location.href='dashboard.html';
        }
        else{
            alert("wrong details.");
        }
    }
    else{
        alert("invalid details.");
    }
}


