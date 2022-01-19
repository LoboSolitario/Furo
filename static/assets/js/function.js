let index = ['Crypto.LTC/USD','Crypto.BTC/USD', 'Equity.US.QQQ/USD'];
				let dict;
				function index1(){
					index = ['Crypto.LTC/USD'];
				}
				function index2(){
					index = ['Crypto.LTC/USD','Crypto.BTC/USD', 'Equity.US.QQQ/USD'];
				}
				function index3(){
					index = ['Crypto.LTC/USD','Crypto.BTC/USD'];
				}
				function index4(){
					index = ['Crypto.LTC/USD'];
				}
				var table = document.getElementById("pyth-data-table");
				var eventSource = new EventSource("/stream")
				eventSource.onmessage = function(e) {
					dict = JSON.parse(e.data);
					var tbody = document.getElementById("pyth-data-table-tbody")
					tbody.innerHTML = ""
					for (var i = 1; i < dict.length; i++){
						  
						if(index.includes(dict[i]['Market'])){
							var tr = document.createElement('tr'); 
							var td1 = document.createElement('td');
							var td2 = document.createElement('td');
							var td3 = document.createElement('td');
							var text1 = document.createTextNode(dict[i]['Market']);
							var text2 = document.createTextNode(parseFloat(dict[i]['Value']).toFixed(3)+' +/- '+ parseFloat(dict[i]['Confidence']).toFixed(2));
							var text3 = document.createTextNode(" ");
							td1.appendChild(text1);
							td2.appendChild(text2);
							td3.appendChild(text3);
							tr.appendChild(td1);
							tr.appendChild(td2);
							tr.appendChild(td3);
							tbody.appendChild(tr);
						}
					}
					table.appendChild(tbody);

				};
			
			