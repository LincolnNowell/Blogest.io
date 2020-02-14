let blog = Cookies.get('blog')
let user = Cookies.get('user');
console.log(blog);
$.ajax({
    type: 'GET',
    url: "/blogs",
    data: {name: user},
    success: (data,status) =>{
        for(blogs of data){
            if(blogs.title == blog){
                let main = document.getElementById('main');
                main.innerHTML = blogs.blog;
            }
        }
    }
})