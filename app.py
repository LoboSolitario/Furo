from flask import Flask, Response, render_template, session, request,jsonify
from random import randint
import json
import time
import pandas as pd
app = Flask(__name__)


def event_stream():
    data_dic = {}
    while True:
        pyth_data = pd.read_csv("out.csv")
        time.sleep(0.05)
        data = json.dumps(pyth_data.to_dict(orient="records")) 
        yield f"data:{data}\n\n"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/index1")
def index1():
    return render_template("index1.html")

@app.route("/generic")
def generic():
    return render_template("generic.html")

@app.route("/elements")
def elements():
    return render_template("elements.html")

@app.route("/stream")
def stream():
    return Response(event_stream(), mimetype="text/event-stream")

@app.route("/get_index_data")
def ret_index_data():
    data = pd.read_csv("index.csv")
    index_list = data.set_index('Index_name').T.to_dict('list')
    for key, value in index_list.items():
        value = [x for x in value if x == x]
        index_list[key] = value
    return jsonify(index_list)


if __name__ == "__main__":
    app.run(debug=True)
