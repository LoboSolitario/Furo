var index, dict, index_list, index1, index2;
var index3, index4, table, eventSource;

// Getting the index data
function get_index_data() {
    fetch('/get_index_data')
        .then((response) => response.json())
        .then((index_data) => {
            index_list = index_data;
            // setting the value of index for the first page load.
            index = index_list['index1'];
        });


}

function selectIndex(index_name) {
    var basket_name = document.getElementById("basket_name");
    var basket_overview = document.getElementById("basket_overview")
    var basket_risk = document.getElementById("basket_risk");
    var basket_data = {
        "index1": ["Crypto Large Cap", "The basket gives exposure to the top blockchain ecosystems available. Large market cap layer 1's are usually well-established, and the probability of such networks going bust are low.", "Medium"],
        "index2": ["Solana DeFi", "The basket aims at giving exposure to Solana’s DeFi space which is the fastest growing in the crypto ecosystem. With more and more people adopting Solana for their financial transactions, DeFi space is sure to benefit from it. The basket invests in DEX’s, Borrowing/Lending Protocols, Liquidity providers etc.", "High"],
        "index3": ["Gold-Crypto", "The basket is for conservative investors who want equiweighted exposure to Gold & Crypto. The crypto assets are diversified into BTC, ETH & SOL to give an even exposure to the crypto market. ", "Low"],
        "index4": ["All Weather", "The basket helps you get an equi-weighted exposure to all three apex asset classes, i.e. Gold, Equity, and Crypto. The basket provides a well-balanced portfolio for passive investors.", "Low"],
        "index5": ["Exchanges", "The perfect group of crypto tokens to invest in the ever-expanding crypto exchange space. Invest in top of the class exchanges, both centralised and decentralised, and ride the incoming mega growth wave.", "Medium"],
        "index6": ["Solana TradeFi", "With continuously growing trading volumes and ever-increasing interest in trading, TradeFi platforms/protocols are best positioned to absorb the incoming exponential growth. Thus, presenting a huge investment opportunity in this space.", "High"]
    }
    basket_name.innerHTML = basket_data[index_name][0];
    basket_overview.innerHTML = basket_data[index_name][1];
    if (basket_data[index_name][2] == "High") {
        console.log("high")
        basket_risk.style.color = "#fa0000";
    }
    if (basket_data[index_name][2] == "Medium") {
        basket_risk.style.color = "#fab700";
    }
    if (basket_data[index_name][2] == "Low") {
        basket_risk.style.color = "#01eb5b";
    }
    basket_risk.innerHTML = basket_data[index_name][2];
    if (index_name) {
        index = index_list[index_name];
    }
}

table = document.getElementById("pyth-data-table");
eventSource = new EventSource("/stream")
eventSource.onmessage = function (e) {
    dict = JSON.parse(e.data);
    var tbody = document.getElementById("pyth-data-table-tbody")
    tbody.innerHTML = ""
    for (var i = 0; i < index.length; i++) {
        //console.log(index[i])
        for (var j = 0; j < dict.length; j++) {
            if (dict[j]['Market'] == index[i][0]) {
                var tr = document.createElement('tr');
                var tdnum = document.createElement('td');
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');
                var textnum = document.createTextNode(i + 1);
                var text1 = document.createTextNode(dict[j]['Market'].split(".").pop());
                var text2 = document.createTextNode(parseFloat(dict[j]['Value'] + 3 * dict[j]['Confidence']).toFixed(4));
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


function place_order() {
    var quantity = document.getElementById("basket_quantity").value;
    var req_data = JSON.stringify({
        quantity: quantity,
        index: index
    })
    fetch('/place_order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: req_data
    }).then(function (response) {
        console.log(response)
    })

}