let btn = document.getElementById('create');

btn.addEventListener('click',(e)=>{
    let name = DOMPurify.sanitize(document.getElementById('name').value);
    let email = document.getElementById('email').value;
    let pwd = DOMPurify.sanitize(document.getElementById('pwd').value);
    if(name != '' && email != '' && pwd != ''){
        $.post('/create',{name: name,email:email,pwd:pwd},(saved) =>{
            if(saved){
                window.location.href = '/pages/create.html';
            }else{
                alert('Username Taken');
            }
        });
    }
})