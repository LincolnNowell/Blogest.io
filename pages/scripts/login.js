let btn = document.getElementById('start');

btn.addEventListener('click',(e)=>{
    let name = document.getElementById('name').value;
    let pwd = document.getElementById('pwd').value;
    $.post('/login',{name: name,pwd:pwd},(status)=>{
        console.log("off")
        if(status){
            window.location.href = '/pages/create.html';
        }else{
            alert('Invalid Creditials')
        }
    });
})