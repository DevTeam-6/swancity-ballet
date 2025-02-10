from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import json_util
import os

# Create Flask app
app = Flask(__name__)

CORS(app)

# MongoDB Configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongo:27017/testdb")
client = MongoClient(MONGO_URI)
db = client.get_database()  # Use the database defined in the URI or default

@app.route('/')
def home():
    return {"message": "Welcome to the App!"}

@app.route('/data', methods=['GET'])
def get_data():
    """Fetch all documents from a collection."""
    data = db.students.find()
    result = list(data)  

    return json_util.dumps({"data": result}), 200, {"Content-Type": "application/json"}
   
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
