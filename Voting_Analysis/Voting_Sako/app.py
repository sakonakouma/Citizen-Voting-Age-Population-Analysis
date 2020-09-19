import os
import pandas as pd 
import numpy as np 

import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import inspect

from flask import Flask, jsonify, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy



###################### Flask Setup ################################
app = Flask(__name__)

############################# Database Setup #######################################

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI', '') or "sqlite:///db/votingAgesdb.db"
#app.config['JSON_SORT_KEYS'] = False
#SQLALCHEMY_TRACK_MODIFICATIONS = True

db = SQLAlchemy(app)

engine = create_engine("sqlite:///db/votingAgesdb.db")
conn = engine.connect()

# reflect an existing database into the model 
Base = automap_base()
# repleac the tables
Base.prepare(db.engine, reflect=True)

Base.classes.keys()

@app.route("/")
def index():
    """Return to the homepage"""
    return render_template("index.html")
