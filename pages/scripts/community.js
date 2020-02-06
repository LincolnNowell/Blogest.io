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
                main.append(user);
            }) 
        });
    })
})