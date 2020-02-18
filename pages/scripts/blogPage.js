let blog = Cookies.get('blog')
let user = Cookies.get('user');
$.ajax({
    type: 'GET',
    url: "/blogs",
    data: {name: user},
    success: (data,status) =>{
        for(blogs of data){
            if(blogs.title == blog){
                document.getElementById('title').innerText = blogs.title;
                document.getElementById('main').innerHTML = blogs.blog;
            }
        }
    }
})