let btn = document.getElementById('btn');
let input = document.getElementById('input');
let boxes = document.querySelectorAll('.box');
let deleteBtn = document.getElementById('delete-btn');
let todo = document.querySelector('.todo');
let prog = document.querySelector('.pro');
let done = document.querySelector('.done');
let draggedItem = null;
let temp;
let index=0;
let itemID;
let val;
const valArr = [];
let arr =[];

if(JSON.parse(localStorage.getItem("Lists"))!=null){
    arr = JSON.parse(localStorage.getItem("Lists"));
    render();
}
btn.onclick = function addTodoElement(){
    if(input.value != ''){
        temp = input.value;
        boxes[0].innerHTML += `
        <div class="list-item" draggable="true" item-id="${index}">
        <p class="item">${input.value}
        </p>
        <button ><svg id="delete-btn" class="delete" onclick="deleteItem(${index})" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>delete [#1487]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#1487]"> </path> </g> </g> </g> </g></svg></button></div>`
       valArr[index]=temp;
        input.value = '';
         let item = 
            {   "id" : index,
                "value" : temp,
                "type" : 'TODO'
            }
        ;
        
        arr.push(item);
        console.log(arr[index].type)
        index++;
        try{        
            localStorage.setItem('Lists',JSON.stringify(arr));}
                catch(err){
                  console.log(err.message)
                            }  
    }
    dragItem();
}

 function deleteItem(index){
   
     arr.splice(index,1)
     localStorage.setItem('Lists',JSON.stringify(arr));
     window.location.reload();
}

function render(){
   
        for (let i = 0 ; i<arr.length ;i++ )
        {
         let body= `
         <div class="list-item" draggable="true" item-id="${arr[i].id}">
         <p class="item">${arr[i].value}
         </p>
         <button ><svg id="delete-btn" class="delete" onclick="deleteItem(${arr[i].id})" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>delete [#1487]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#1487]"> </path> </g> </g> </g> </g></svg></button></div>`
       
         if(arr[i].type==="TODO"){
            todo.innerHTML+=body;
         }
         else if(arr[i].type==="INPROGRESS"){
            pro.innerHTML+=body;
         }
         else if(arr[i].type==="DONE"){
            done.innerHTML+=body;
         }
    
        }
        dragItem();
    }

function dragItem(){
    let items = document.querySelectorAll('.list-item');
    items.forEach(item=>{
        item.addEventListener('dragstart', function(e){
            draggedItem = item;
            item.style.opacity = 0.2;
             itemID = e.currentTarget.getAttribute("item-id")
        })
        item.addEventListener('dragend', function(){
            draggedItem = null;
            item.style.opacity = '1';
        })

        boxes.forEach(box=>{
            box.addEventListener('dragover',function(e){
                e.preventDefault();
                box.style.opacity = '0.7';
            })
            box.addEventListener('dragleave',function(){
                box.style.opacity = '1';
            })
            box.addEventListener('drop',function(e){
                box.append(draggedItem);
                box.style.opacity = '1';
            let boxInfo  = e.currentTarget.id;
        
            let type = arr.find(item => item.id == itemID);
            type.type = boxInfo;
          
            localStorage.setItem('Lists',JSON.stringify(arr))
                        
          })
        })
    
    })
}

function reset(){
    localStorage.clear();
    window.location.reload();
}

