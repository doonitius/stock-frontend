function insertToRow(data) {
    console.log(data)
    var table = document.getElementById("list");
    data.forEach(val => {
        console.log(val)
        var row = table.insertRow(-1);
        var item_id = row.insertCell(0);
        var item_name = row.insertCell(1);
        var category = row.insertCell(2);
        var available_item = row.insertCell(3);
        var editBtn = row.insertCell(4);
        var deleteBtn = row.insertCell(5);
        item_id.innerHTML = `<td id = "item_id">${val.item_id}</td>`;
        item_name.innerHTML = `<td id = "item_name">${val.item_name}</td>`;
        category.innerHTML = `<td id = "category">${val.category}</td>`;
        available_item.innerHTML = `<td id = "available">${val.available_item}</td>`;
        editBtn.innerHTML = `<button class = "btn" onclick = "onEdit(this)">Edit</button>`;
        deleteBtn.innerHTML = `<button class = "btnDel" onclick = "onDelete(this)">Delete</button>`;
    })
}

async function getItem() {
    let response = await axios.get('http://localhost:3000/api/item/view');
    console.log(response);
    console.log(response.data);
    insertToRow(response.data);
}
getItem();

var modal = document.getElementById('id01')
var modal2 = document.getElementById('id02');
var modal3 = document.getElementById('id03');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
    if (event.target == modal3) {
        modal3.style.display = "none";
    }

}
/*---------------edit----------- */
var item_id_edit;
var item_name_edit;
var item_category_edit;

function onEdit(edit) {
    console.log("edit");
    console.log(edit);
    document.getElementById('id03').style.display ='block';
    console.log("sdasd");
    while(edit.parentNode && edit.tagName.toLowerCase() != 'tr'){
        edit = edit.parentNode;
    }
    if(edit){
        item_id_edit = edit.firstChild.innerText;
        item_name_edit = edit.childNodes[1].innerText;
        item_category_edit = edit.childNodes[2].innerText;
        console.log("here")
        console.log(item_id_edit);
        console.log(item_name_edit);
        console.log(item_category_edit);
    }
}

/*---------------delete----------- */
var item_id_del;

async function deleteItem() {
    console.log(item_id_del);
    const txt = '{"item_id": ""}';
    var now = await JSON.parse(txt);
    now.item_id = item_id_del;
    console.log(now);
    let res = await axios.post('http://localhost:3000/api/item/deleteItem',now);
    location.reload();
    console.log(res);
    return res;
}
function onDelete(del) {
    document.getElementById('id02').style.display='block';
    while(del.parentNode && del.tagName.toLowerCase() != 'tr'){
        del = del.parentNode;
    }
    if(del){
        item_id_del = del.firstChild.innerText;
        console.log(item_id_del);
    }

}
/*---------------delete----------- */

