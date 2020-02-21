let btn = document.getElementById('start');

btn.addEventListener('click',(e)=>{
    let name = DOMPurify.sanitize(document.getElementById('name').value);
    let pwd = document.getElementById('pwd').value;
    $.post('/login',{name: name,pwd:pwd},(status)=>{
        if(status){
           Cookies.set('home', name, {path: '/pages/home.html' });
           window.location.href = '/pages/home.html';
        }else{
            alert('Invalid Creditials')
        }
    });
})