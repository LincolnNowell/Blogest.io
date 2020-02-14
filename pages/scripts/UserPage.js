let hold = '';
let append = true;
for(let i = 0; i < document.cookie.length; i++){
    if(document.cookie[i] === ';'){
        append = false;
    }
    if(append){
        hold += document.cookie[i];
    }
}

document.getElementById('name').innerText = hold;

let blogPost = (title,views,likes) =>{
    return`
    <div class="title">
      <h3 class="main">${title}</h3>
    </div>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium nemo deserunt illum voluptatum eveniet est enim, sed tempore, voluptas aliquid dicta explicabo officia reiciendis architecto repellendus, ad placeat eaque alias.</p>
    <div class="icons">
        <div class="total">
            <p id="likes">${likes}</p>
            <i class="far fa-thumbs-up"></i>
        </div>
        <div class="total">
            <p id="views">${views}</p>
            <i class="far fa-eye"></i>
        </div>
      </div>`
}

async function add(){
    await $.ajax({
        type: 'GET',
        url: "/blogs",
        data: {name: hold},
        success: (data,status) =>{
            let BlogPostArea = document.querySelector('.bloggers');
            if(data){
                for(blog of data){
                    let div = document.createElement('div');
                    div.className = 'blogger';
                    div.innerHTML = blogPost(blog.title,blog.views,blog.likes);
                    BlogPostArea.append(div);
                }
            }
        }
    })

    let bloggers = document.getElementsByClassName('blogger');
    for(blog of bloggers){
        blog.addEventListener('click',(e)=>{
            let SelectedBlog = e.currentTarget.getElementsByClassName('main').item(0).innerText;
            let SelectedUser = document.getElementById('name').innerText;
            Cookies.set('blog', SelectedBlog, { expires: 7, path: '' })
            Cookies.set('user', SelectedUser, { expires: 7, path: '' })
            window.location.href = '/pages/blogPage.html';
        })
    } 
}

add();
