let btn = document.getElementById('create');

btn.addEventListener('click',(e)=>{
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let pwd = document.getElementById('pwd').value;
    $.post('/create',{name: name,email:email,pwd:pwd},(saved) =>{
        if(saved){
            window.location.href = '/pages/create.html';
        }else{
            alert('Username Taken');
        }
    });
})