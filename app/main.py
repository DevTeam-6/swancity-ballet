from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import json_util
import os

# Create Flask app
app = Flask(__name__)

CORS(app)

# MongoDB Configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongo:27017/")
DB_NAME = os.getenv("DB_NAME", "testdb")  # choose your DB name

client = MongoClient(MONGO_URI)
db = client[DB_NAME]  # Access database by name


@app.route('/')
def home():
    return {"message": "Welcome to the App!"}

@app.route("/api/intake", methods=["POST"])
def create_intake():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    result = db.intakes.insert_one(data)
    saved_doc = {**data, "_id": str(result.inserted_id)}

    return jsonify(saved_doc), 201

   
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
