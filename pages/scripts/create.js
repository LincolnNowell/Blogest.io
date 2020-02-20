let preview = CKEDITOR.replace( 'text' );

const popUp = `
<h1>Summary</h1>
<textarea placeholder="" id="preview2"></textarea>
<a href="#0" class="large button secondary" id="SavePreview">Save</a>`;

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
    constructor(title,blog,preview){
        this.title = title;
        this.blog = blog;
        this.preview = preview;
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
    let pop = document.querySelector('#pop-up');
    pop.innerHTML = popUp;
    CKEDITOR.replace( 'preview2' );
    let btn = document.querySelector(".button");
    btn.addEventListener('click',(e)=>{
        let textAreaValue = CKEDITOR.instances.text.getData();
        let title = document.getElementById('title').value;
        let preview = CKEDITOR.instances.preview2.getData();
        thisDate = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        let blog = new Blog(title,textAreaValue.toString(),preview.toString());
        blog.GetDate(monthNames[thisDate.getMonth()],thisDate.getDate(),thisDate.getFullYear());
        $.post('/saveBlog',blog);
        let pop = document.querySelector('#pop-up');
        let child = pop.lastElementChild;
        while(child){
            pop.removeChild(child);
            child = pop.lastElementChild;
        } 
    })
})