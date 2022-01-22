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
//Eventlisteners for button clicks
// index1 = document.getElementById("index1");
// index1.addEventListener('click',function(){
//     selectIndex('index1');
// });
// index2 = document.getElementById("index2");
// index2.addEventListener('click',function(){
//     selectIndex('index2');
// });
// index3 = document.getElementById("index3");
// index3.addEventListener('click',function(){
//     selectIndex('index3');
// });
// index4 = document.getElementById("index4");
// index4.addEventListener('click',function(){
//     selectIndex('index4');
// });

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


const getProvider = async () => {
    if ("solana" in window) {
      
        await window.solana.connect(); // opens wallet to connect to

        const provider = window.solana;
        if (provider.isPhantom) {
            console.log("Is Phantom installed?  ", provider.isPhantom);
            return provider;
        }
    } 
};

function getAccount(){
    getProvider().then(provider => {
        var phantom_key = provider.publicKey.toString()
        if(phantom_key){
            login_text = document.getElementById("phantom_account")
            login_text.innerHTML = "Phantom Wallet Connected"
            send_key = JSON.stringify({
                key: phantom_key
            })
            console.log(send_key)
            fetch('/phantom_get', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: send_key
            }).then(function(response){
                console.log(response)
            })
        }
    })
    .catch(function(error){
        console.log(error)
    });

  }

  