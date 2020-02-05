let btns = document.querySelectorAll('fieldset').item(0).querySelectorAll('input');
btns.forEach(element =>{
    element.addEventListener('click',(e)=>{
        $.get('/user',(bloggers)=>{
            let main = document.querySelector('.bloggers');
            console.log(bloggers.length)
            bloggers.forEach(element =>{
                let head = document.createElement('h1');
                head.innerText = element.name;
                main.append(head);
            })
        });
    })
})