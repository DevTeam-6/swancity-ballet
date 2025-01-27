from flask import Flask
from pymongo import MongoClient
import os

# Create the Flask app
app = Flask(__name__)

@app.route('/')
def home():
    return {"message": "welcome to farts"}

@app.route('/data', methods=['GET'])
def get_data():
    data = db.collection_name.find()
    return {"data": [doc for doc in data]}  # Convert cursor to list

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
