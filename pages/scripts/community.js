const CreateBlogger = (name) =>{ return `
<div class="title">
  <a href="#" class="imgs"><img class="pic" src="/imgs/Sketch.jpg"></a>
  <h3>${name}</h3>
</div>
<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium nemo deserunt illum voluptatum eveniet est enim, sed tempore, voluptas aliquid dicta explicabo officia reiciendis architecto repellendus, ad placeat eaque alias.</p>
`}

let btns = document.querySelectorAll('fieldset').item(0).querySelectorAll('input');
btns.forEach(element =>{
    element.addEventListener('click',(e)=>{
        let btnToSetUp = e.currentTarget.id;
        $.get('/user',(bloggers)=>{
            let main = document.querySelector('.bloggers');   

            let child = main.lastElementChild;
            while(child){
                main.removeChild(child);
                child = main.lastElementChild;
            } 

            switch(btnToSetUp){
                case 'most':
                    console.log('most');
                break;
                case 'new':
                    console.log('new');
                break;
                case 'highest':
                    console.log('highest');
                break;
                default:

                break;
            }   

            bloggers.forEach(element =>{
                let user = document.createElement('div');
                user.className = 'blogger';
                user.innerHTML = CreateBlogger(element.name);
                user.addEventListener('click',(e)=>{
                    $.ajax({
                        type: 'GET',
                        url: "/UserPage",
                        data: {name: e.currentTarget.querySelector('h3').innerText},
                    })
                    window.location = '/UserPage';
                })
                main.append(user);
            }) 
        });
    })
})

$.get('/user',(bloggers)=>{
    let numbOfBloggers = 0;
    numbOfBloggers = bloggers.length;
    let stuff = numbOfBloggers;
    let pages = 0;
    while(stuff > 0){
        stuff -= 12;
        pages++;
    }

    let pagination = document.getElementsByClassName('pagination');

    for(let page = 0; page < pages; page++){
        let number = document.createElement('li');
        number.innerHTML = `<a href="#" aria-label="Page ${page + 1}">${page + 1}</a>`;
        pagination.item(0).append(number);
    }
    let pgs = document.getElementsByClassName('pagination');
    let things = pgs.item(0).querySelectorAll('a');
    things.forEach(element =>{
        element.addEventListener('click', (e)=>{
            let what = e.currentTarget;
            $.get('/user', (data,status)=>{
                let prev = document.querySelector('.current');
                if(prev){prev.className = "";}
                let current = what.parentElement;
                current.className = 'current';
                let main = document.querySelector('.bloggers');   

                let child = main.lastElementChild;
                while(child){
                    main.removeChild(child);
                    child = main.lastElementChild;
                } 

                let begin = Number.parseInt(what.innerText) - 1;
                for(let i = begin * 12; i < ((begin + 1) * 12); i++){
                    if(i < data.length){
                        let user = document.createElement('div');
                        user.className = 'blogger';
                        user.innerHTML = CreateBlogger(data[i].name);
                        user.addEventListener('click',(e)=>{
                            $.ajax({
                                type: 'GET',
                                url: "/UserPage",
                                data: {name: e.currentTarget.querySelector('h3').innerText},
                            })
                            window.location = '/UserPage';
                        })
                        main.append(user);
                    }
                }
            })
        })
    })
})