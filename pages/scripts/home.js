let hold = Cookies.get('home');
document.getElementById('name').innerText = hold;

let blogPost = (title,preview,views,likes) =>{
    return`
    <div class="title">
      <h3 class="main">${title}</h3>
    </div>
    <p>${preview}</p>
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
                    div.innerHTML = blogPost(blog.title,blog.preview,blog.views,blog.likes);
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
            Cookies.set('blog', SelectedBlog, {path: '' })
            Cookies.set('user', SelectedUser, {path: '' })
            window.location.href = '/pages/blogPage.html';
        })
    } 
}

add();
let btn = document.getElementById('CreateBlog');
btn.addEventListener('click',(e)=>{
    window.location.href = '/pages/create.html';
})