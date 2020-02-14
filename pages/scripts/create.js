let preview = CKEDITOR.replace( 'text' );

preview.on('change',(e)=>{
    let preview = document.getElementById('preview');
    preview.innerHTML = (CKEDITOR.instances.text.getData());
})

let align = document.getElementById('align');
align.addEventListener('change',(e)=>{
    let alignment = e.currentTarget.value;
    let textArea = document.getElementById('preview');
    textArea.style.textAlign = `${alignment}`;
}) 


class Blog {
    constructor(title,blog){
        this.title = title;
        this.blog = blog;
        this.views = 0;
        this.likes = 0;
    }

    GetDate(month,day,year){
        this.month = month;
        this.day = day;
        this.year = year;
    }
}
let saveBtn = document.getElementById('save');
saveBtn.addEventListener('click',(e)=>{
    let textAreaValue = CKEDITOR.instances.text.getData();
    let title = document.getElementById('title').value;
    thisDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let blog = new Blog(title,textAreaValue.toString());
    blog.GetDate(monthNames[thisDate.getMonth()],thisDate.getDate(),thisDate.getFullYear());
    $.post('/saveBlog',blog);
})