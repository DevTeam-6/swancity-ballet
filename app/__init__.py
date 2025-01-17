from flask import Flask
from pymongo import MongoClient
import os

def create_app():
    app = Flask(__name__)

    # MongoDB Configuration
    mongo_host = os.getenv('MONGO_HOST', 'mongo')
    mongo_port = os.getenv('MONGO_PORT', '27017')
    mongo_db = os.getenv('MONGO_DB', 'testdb')
    
    client = MongoClient(f"mongodb://{mongo_host}:{mongo_port}")
    db = client[mongo_db]

    from . import main  # Import routes

    return app
