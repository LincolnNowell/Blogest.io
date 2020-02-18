const CreateBlogger = (name) =>{ return `
<div class="title">
  <a href="#" class="imgs"><img class="pic" src="/imgs/Sketch.jpg"></a>
  <h3>${name}</h3>
</div>
<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium nemo deserunt illum voluptatum eveniet est enim, sed tempore, voluptas aliquid dicta explicabo officia reiciendis architecto repellendus, ad placeat eaque alias.</p>
`}


function addBlogUsers(bloggers,main){
    for(let i = 0; i < 12; i++){
        let user = document.createElement('div');
        user.className = 'blogger';
        user.innerHTML = CreateBlogger(bloggers[i].name);
        user.addEventListener('click',(e)=>{
            Cookies.set('name', e.currentTarget.querySelector('h3').innerText, {path: '/pages/UserPage.html' });
            window.location.href = '/pages/UserPage.html';
        })
        main.append(user);
    }
}

function paganate(sort = 'false'){
$.get('/user',(bloggers)=>{
    let pagenateArea = document.querySelector('.pagination');
    if(pagenateArea.children != undefined){
        let child = pagenateArea.lastElementChild;
        while(child){
            pagenateArea.removeChild(child);
            child = pagenateArea.lastElementChild;
        } 
    }
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
                            Cookies.set('name', e.currentTarget.querySelector('h3').innerText, {path: '/pages/UserPage.html' });
                            window.location.href = '/pages/UserPage.html';
                        })
                        main.append(user);
                    }
                }
            })
        })
    })
})

}

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
                    paganate('most');
                    bloggers = insertionSort(bloggers,'views');
                break;
                case 'new':
                    paganate('new');
                break;
                case 'highest':
                    paganate('highest');
                    bloggers = insertionSort(bloggers,'likes');
                break;
                case 'alphabetical':
                    paganate('alphabetical');
                    bloggers = insertionSort(bloggers,'name');
                break;
                default:

                break;
            }   
            
            addBlogUsers(bloggers,main);
        });
    })
})

paganate();

$.get('/user',(bloggers)=>{
    let main = document.querySelector('.bloggers');
    for(let i = 0; i < 12; i++){
        let user = document.createElement('div');
        user.className = 'blogger';
        user.innerHTML = CreateBlogger(bloggers[i].name);
        user.addEventListener('click',(e)=>{
            Cookies.set('name', e.currentTarget.querySelector('h3').innerText, {path: '/pages/UserPage.html' });
            window.location.href = '/pages/UserPage.html';
        })
        main.append(user);
    }
})