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