var index, dict, index_list, index1, index2;
var index3, index4, table, eventSource;

// Getting the index data
function get_index_data(){
    fetch('/get_index_data')
    .then((response)=> response.json())
    .then((index_data) => {
        index_list = index_data;
        // setting the value of index for the first page load.
        index = index_list['index1'];
    });

    
}

function selectIndex(index_name){
    console.log(index_name)
    if(index_name){
        index = index_list[index_name];
    }
}

table = document.getElementById("pyth-data-table");
eventSource = new EventSource("/stream")
eventSource.onmessage = function(e) {
    dict = JSON.parse(e.data);
    var tbody = document.getElementById("pyth-data-table-tbody")
    tbody.innerHTML = ""
    for (var i = 0; i < index.length;i++){
        //console.log(index[i])
        for (var j = 0; j < dict.length; j++){
            if(dict[j]['Market']==index[i][0]){
                var tr = document.createElement('tr'); 
                var tdnum = document.createElement('td');
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');
                var textnum = document.createTextNode(i+1);
                var text1 = document.createTextNode(dict[j]['Market'].split(".").pop());
                var text2 = document.createTextNode(parseFloat(dict[j]['Value']+ 3*dict[j]['Confidence']).toFixed(4));
                var text3 = document.createTextNode(parseFloat(index[i][1]).toFixed(2));
                td1.appendChild(text1);
                td2.appendChild(text2);
                td3.appendChild(text3);
                tdnum.appendChild(textnum);
                tr.appendChild(tdnum);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tbody.appendChild(tr);
            }
        }
    }
    table.appendChild(tbody);

};


  function place_order(){
    var quantity = document.getElementById("basket_quantity").value;
    var req_data = JSON.stringify({
        quantity : quantity,
        index : index
    })
    fetch('/place_order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: req_data
    }).then(function(response){
        console.log(response)
    })

  }