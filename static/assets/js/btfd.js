function get_asset_data(){
    fetch('/get_asset_data')
    .then((response) => response.json())
    .then((asset_data)=> {
        table = document.getElementById("asset-data-table");
        var tbody = document.getElementById("asset-data-table-tbody")
        for (var i = 0; i< asset_data.length; i++){
            var tr = document.createElement('tr'); 
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');
            var td4 = document.createElement('td');
            var tdnum = document.createElement('td');
            var textnum = document.createTextNode(i+1);
            var text1 = document.createTextNode(asset_data[i]['Market'].split(".").pop());
            var text2 = document.createTextNode(parseFloat(asset_data[i]['Value']+ 3*asset_data[i]['Confidence']).toFixed(4));
            var input1 = document.createElement("input");
            var label1 = document.createElement("Label");
            var input2 = document.createElement("input");
            var hidden = document.createElement("input");
            hidden.type = "hidden";
            hidden.name = asset_data[i]['Market'];
            hidden.value = parseFloat(asset_data[i]['Value']+ 3*asset_data[i]['Confidence']).toFixed(4);
            input1.type = "checkbox";
            input1.id = "check_" + asset_data[i]['Market'];
            input1.name = asset_data[i]['Market'];
            label1.setAttribute("for", "check_" + asset_data[i]['Market']);
            input1.setAttribute("onclick","EnableDisableTextBox(this)");
            input1.value = 1; 
            input2.type = "text";
            input2.placeholder = "%dip";
            input2.autocomplete="off";
            input2.id = "weight_" + asset_data[i]['Market'];
            input2.name = asset_data[i]['Market'];
            input2.disabled = "disabled"
            tdnum.appendChild(textnum);
            td1.appendChild(text1);
            td2.appendChild(text2);
            td2.appendChild(hidden);
            td3.appendChild(input1);
            td3.appendChild(label1);
            td4.appendChild(input2);
            tdnum.appendChild(textnum);
            tr.appendChild(tdnum);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
    })
}


function EnableDisableTextBox(check_asset) {
    var weight_asset = document.getElementById("weight_" + check_asset.name);
    if (!check_asset.checked) {
        weight_asset.value = "";
        weight_asset.disabled = true;
    }
    else{
        weight_asset.disabled = false;
        weight_asset.required = true;

    }
    if (!weight_asset.disabled) {
        weight_asset.focus();
    }
}
 
