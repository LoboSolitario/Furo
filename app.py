from flask import Flask, Response, render_template, session, request
from random import randint
import json
import time
import pandas as pd
app = Flask(__name__)

def get_message():
    '''this could be any function that blocks until data is ready'''
    time.sleep(1.0)
    s = time.ctime(time.time())
    return s

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


if __name__ == "__main__":
    app.run(debug=True)
