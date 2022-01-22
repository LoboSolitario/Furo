from flask import Flask, Response, flash, render_template, session, request,jsonify
from random import randint
import json
import time
import pandas as pd
from csv import writer
from flask_session import Session

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

@app.route("/create_index", methods = ['POST', 'GET'])
def create_index():
    if request.method =='POST': 
        req = request.form
        index_name = req['index_name']
        with open('index.csv', 'a',newline='') as f_object:
            writer_object = writer(f_object)
            for k in req:
                if (k!="index_name"):
                    row = [index_name, k, req.getlist(k)[1]]
                    writer_object.writerow(row)
            f_object.close()
        
        flash("New Index added successfully")

        return render_template("create_index.html")
    else :
        return render_template("create_index.html")
        

@app.route("/elements")
def elements():
    return render_template("elements.html")

@app.route("/stream")
def stream():
    return Response(event_stream(), mimetype="text/event-stream")

@app.route("/get_index_data")
def get_index_data():
    data = pd.read_csv("index.csv")
    data = data.set_index('index_name')
    data['combined']= data.values.tolist()
    data = data.drop(['asset','weight'],axis=1)
    data = data.groupby('index_name')['combined'].apply(list).to_dict()
    index = {'index1': [['Crypto.LTC/USD',12], 'Crypto.BTC/USD', 'Equity.US.QQQ/USD'], 'index2': ['Crypto.LTC/USD', 'Crypto.BTC/USD']}
    return jsonify(data)

@app.route("/get_asset_data")
def get_asset_data():
    asset_data = pd.read_csv("out.csv")
    return jsonify(asset_data.to_dict(orient="records"))

@app.route("/phantom_get", methods = (["POST"]))
def phantom_get():
    if request.method == "POST":
        req = request.get_json()
        session['phantom_key'] = req['key']
        return render_template("index.html")

@app.route("/btfd", methods = ['GET', 'POST'])
def btfd():
    if request.method == "GET":
        return render_template("btfd.html")
    elif request.method == "POST":
        req = request.form
        for k in req:
            if (k!="index_name" and len(req.getlist(k)) > 1):
                print(k,req.getlist(k))
        flash("Limit order placed successfully")
        return render_template("btfd.html")


if __name__ == "__main__":
    app.run(debug=True)
