from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load .env file if it exists
load_dotenv()

def create_app():
    app = Flask(__name__)

    # MongoDB Configuration
    # Try to read a full connection URI first (Atlas)
    mongo_uri = os.getenv('MONGO_URI')
    mongo_db = os.getenv('MONGO_DB', 'testdb')

    if mongo_uri:
        client = MongoClient(mongo_uri)
    else:
        # Fallback to local Docker MongoDB
        mongo_host = os.getenv('MONGO_HOST', 'mongo')
        mongo_port = os.getenv('MONGO_PORT', '27017')
        client = MongoClient(f"mongodb://{mongo_host}:{mongo_port}")

    db = client[mongo_db]
    app.db = db  # Optional: attach DB to app for easy access in routes

    # Import routes
    from . import main
    app.register_blueprint(main.bp)  # Assuming main.py uses a Blueprint called bp

    return app
