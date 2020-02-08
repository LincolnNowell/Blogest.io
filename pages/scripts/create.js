let font_size = document.getElementById('font');
font_size.addEventListener('change',(e)=>{
    let font = e.currentTarget.value;
    let textArea = document.getElementById('text');
    textArea.style.fontSize = `${font}px`;
})

let font = document.getElementById('font_family');
font.addEventListener('change',(e)=>{
    let font_fam = e.currentTarget.value;
    let textArea = document.getElementById('text');
    textArea.style.fontFamily = `${font_fam}`;
})

let align = document.getElementById('align');
align.addEventListener('change',(e)=>{
    let alignment = e.currentTarget.value;
    let textArea = document.getElementById('text');
    textArea.style.textAlign = `${alignment}`;
})

let saveBtn = document.getElementById('start');
saveBtn.addEventListener('click',(e)=>{
    let textAreaValue = document.getElementById('text').value;
})