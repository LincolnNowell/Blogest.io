let blog = Cookies.get('blog')
let user = Cookies.get('user');
async function setUp(){

    await $.ajax({
        type: 'GET',
        url: "/blogs",
        data: {name: user},
        success: (data,status) =>{
            for(blogs of data){
                if(blogs.title == blog){
                    document.getElementById('title').innerText = blogs.title;
                    document.getElementById('main').innerHTML = blogs.blog;
                    $.ajax({
                        type: 'POST',
                        url: "/update",
                        data: {name: user, title:blogs.title},
                        success: (data,status) =>{
    
                        }
                    })
                }
            }
        }
    })

}

setUp();