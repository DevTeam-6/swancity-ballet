from pymongo import MongoClient
import json

# MongoDB connection details
MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "testdb"

def load_fixtures():
    # Connect to MongoDB
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]

    # Load fixture data
    with open("/app/fixtures/fixtures.json") as f:
        fixtures = json.load(f)

    # Insert data into collections
    for fixture in fixtures:
        collection_name = fixture["collection"]
        documents = fixture["documents"]
        collection = db[collection_name]
        collection.insert_many(documents)
        print(f"Inserted {len(documents)} documents into '{collection_name}' collection.")

    client.close()

if __name__ == "__main__":
    load_fixtures()
