var item_id_set = [];
var dummy = [1,2,3,4];
function insertToRow(data) {
    var table = document.getElementById("list");
    data.forEach(val => {
        console.log(val);
        var row = table.insertRow(-1);
        var record_id = row.insertCell(0);
        var item_id = row.insertCell(1);
        var item_name = row.insertCell(2);
        var date = row.insertCell(3);
        var amount = row.insertCell(4);
        record_id.innerHTML = `${val.record_id}`;
        item_id.innerHTML = `${val.item_id}`;
        item_name.innerHTML = `${val.item_name}`;
        var shortdate = new Date(val.record_date).toDateString();
        date.innerHTML = `${shortdate}`;
        amount.innerHTML = `${val.amount}`;
    })
}

async function getRecord() {
    let response = await axios.get('http://localhost:3000/api/record/view');
    console.log(response);
    insertToRow(response.data);
}
getRecord();

async function getItem() {
    let response = await axios.get('http://localhost:3000/api/item/view');
    console.log(response);
    itemID(response.data);
}

function itemID(data){
    data.forEach(val => {
        item_id_set.push(val.item_id);
    })
}
window.onload = async function() {
    await getItem();
    var itemID = document.getElementById("item_id");
    console.log(item_id_set);
    item_id_set.forEach(x => {
        console.log(x)
        itemID.options[itemID.options.length] = new Option(x, x);
    })
}

var modal = document.getElementById('id01');
//getItem();

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    // getItem();
    // console.log(item_id_set);
    // var itemID = document.getElementById("item_id1");
    // for(var x in item_id_set){
    //     itemID.options[itemID.options.length] = new Option(x, x);
    // }
}