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

@app.route('/students', methods=['GET'])
def get_students():
    """Fetch all documents from a collection."""
    data = db.students.find()
    result = list(data)  

    return json_util.dumps({"data": result}), 200, {"Content-Type": "application/json"}

@app.route('/api/families', methods=['GET'],)
def get_():
    """Fetch all documents from a collection."""
    data = db.families.find()
    result = list(data)  

    return json_util.dumps({"data": result}), 200, {"Content-Type": "application/json"}

@app.route('/families/create', methods=['POST'])
def create_family():
    # Get form data from the request body (which is a JSON object)
    family_data = request.get_json()

    # Insert the new family document into MongoDB
    family_collection = db.families  # Use the 'families' collection in your DB
    result = family_collection.insert_one(family_data)

    # Return the newly created family with the MongoDB _id
    family_data['_id'] = str(result.inserted_id)
    return jsonify(family_data), 201

@app.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.json
    db.appointments.insert_one(data)
    return jsonify({"message": "Appointment created"}), 201

@app.route('/appointments', methods=['GET'])
def get_appointments():
    appointments = list(db.appointments.find())
    return json_util.dumps({"data": appointments}), 200, {"Content-Type": "application/json"}

@app.route('/appointments/<id>', methods=['DELETE'])
def delete_appointment(id):
    db.appointments.delete_one({'_id': ObjectId(id)})
    return jsonify({"message": "Deleted"}), 200

   
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
