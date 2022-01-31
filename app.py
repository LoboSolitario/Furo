from flask import Flask, Response, flash, render_template, session, request,jsonify
from random import randint
import json
import time
import pandas as pd
from csv import writer
from flask_session import Session
import FTX_Class
import decimal
import mango

app = Flask(__name__)
app.secret_key = "abc" 
# adding sessions for storing phantom key
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# to stream live pyth data
def event_stream():
    data_dic = {}
    while True:
        pyth_data = pd.read_csv("out.csv")
        # updates every 0.5seconds
        time.sleep(0.5)
        pyth_data = json.dumps(pyth_data.to_dict(orient="records"))
        yield f"data:{pyth_data}\n\n"

@app.route("/")
def index():
    return render_template("index.html")

# route to create custom baskets by the portfolio managers
@app.route("/create_index", methods = ['POST', 'GET'])
def create_index():
    if request.method =='POST': 
        req = request.form
        index_name = req['index_name']
        with open('custom_index.csv', 'a',newline='') as f_object:
            writer_object = writer(f_object)
            for k in req:
                if (k!="index_name"):
                    row = [index_name, k, req.getlist(k)[1]]
                    writer_object.writerow(row)
            f_object.close()
        
        flash("New basket added successfully")

        return render_template("your_index.html")
    else :
        return render_template("create_index.html")
        
# SSE to stream the real-time pyth data 
@app.route("/stream")
def stream():
    return Response(event_stream(), mimetype="text/event-stream")

# getting the basket data 
@app.route("/get_index_data")
def get_index_data():
    data = pd.read_csv("index.csv")
    data = data.set_index('index_name')
    data['combined']= data.values.tolist()
    data = data.drop(['asset','weight'],axis=1)
    data = data.groupby('index_name')['combined'].apply(list).to_dict()
    return jsonify(data)


# Get the custom basket data for the users.
@app.route("/get_custom_index_data")
def get_custom_index_data():
    data = pd.read_csv("custom_index.csv")
    data = data.set_index('index_name')
    data['combined']= data.values.tolist()
    data = data.drop(['asset','weight'],axis=1)
    data = data.groupby('index_name')['combined'].apply(list).to_dict()
    return jsonify(data)

@app.route("/get_asset_data")
def get_asset_data():
    asset_data = pd.read_csv("out.csv")
    return jsonify(asset_data.to_dict(orient="records"))

#phantom log in
@app.route("/phantom_get", methods = (["POST"]))
def phantom_get():
    if request.method == "POST":
        req = request.get_json()
        session['phantom_key'] = req['key']
        return "phantom logged in"

#placing order on FTX -> currently not fully integrated because FTX doesn't directly provide an API to connect user account
@app.route("/place_order", methods = ['POST'])
def place_order():
    if request.method == "POST":
        api_key = ''
        api_secret = ''
        c = FTX_Class.FtxClient(api_key=api_key, api_secret=api_secret)
        req = request.get_json()
        quantity = float(req['quantity'])
        index_list = req["index"]
        pyth_data = pd.read_csv("out.csv")
        pyth_data.set_index('Market', inplace=True)
        for l in index_list:
            price = pyth_data.loc[l[0]].Value
            asset_quantity = (quantity*l[1])/(price*100)
            print(l[0].split(".")[1], "buy", 0.001, asset_quantity,"12434")
            #print(c.place_order(l[0].split(".")[1], "buy", 0.005, asset_quantity,f"{random.randint(10000000,1000000000)}"))

        return "order placed successfully"
    
#place order on mango markets
@app.route("/btfd", methods = ['GET', 'POST'])
def btfd():
    if request.method == "GET":
        return render_template("btfd.html")
    elif request.method == "POST":
        #currently connected to a devnet mango wallet 
        wallet = mango.Wallet(bytes(bytearray([67,218,68,118,140,171,228,222,8,29,48,61,255,114,49,226,239,89,151,110,29,136,149,118,97,189,163,8,23,88,246,35,187,241,107,226,47,155,40,162,3,222,98,203,176,230,34,49,45,8,253,77,136,241,34,4,80,227,234,174,103,11,124,146])))
        context = mango.ContextBuilder.build(cluster_name="devnet")
        group = mango.Group.load(context)
        accounts = mango.Account.load_all_for_owner(context, wallet.address, group)
        account = accounts[0]
        req = request.form
        return_val =""
        for k in req:
            if (k!="index_name" and len(req.getlist(k)) > 1):
                lst = req.getlist(k)
                k = k.split(".")[1]+"C"
                stub = context.market_lookup.find_by_symbol(k)
                market = mango.ensure_market_loaded(context, stub)
                market_operations = mango.create_market_operations(context, wallet, account, market, dry_run=False)
                #place order on mango
                order = mango.Order.from_basic_info(side=mango.Side.BUY,
                                    price=decimal.Decimal(float(lst[0])*(100-float(lst[3]))/100),
                                    quantity=decimal.Decimal(float(lst[2])),
                                    order_type=mango.OrderType.POST_ONLY)
                placed_order = market_operations.place_order(order)
                return_val = "Order placed at Mango. " + str(placed_order)
        print(return_val)
        return render_template("btfd.html", return_val = return_val)

@app.route("/your_index", methods = ['GET'])
def your_index():
    if request.method == "GET":
        return render_template("your_index.html")


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='80',debug=True)
