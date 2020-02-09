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

let saveBtn = document.getElementById('save');
saveBtn.addEventListener('click',(e)=>{
    let textAreaValue = CKEDITOR.instances.text.getData();
    thisDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    $.post('/saveBlog',{
        blog: textAreaValue.toString(),
        month: monthNames[thisDate.getMonth()],
        day: thisDate.getDate()
    });
})