#Import necessary libraries
from flask import Flask, render_template, redirect
import pymongo
from flask_pymongo import PyMongo


#Create instance of Flask app
app = Flask(__name__, template_folder='template')




#Create route to render index.html template using data from Mongo
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/geographial")
def geographial():
    return render_template("geographial.html")

@app.route("/gallery")
def gallery():
    return render_template("gallery.html")

@app.route("/economy")
def economy():
    return render_template("economy.html")




if __name__ == "__main__":
    app.run(debug=True)
