from pymongo import MongoClient
from faker import Faker
import random

# MongoDB connection details
MONGO_URI = "mongodb://flask-mongo:27017"  # Adjust as needed
DB_NAME = "testdb"

# Initialize Faker
faker = Faker()

# Function to generate families
def generate_families(num_families):
    families = []
    for _ in range(num_families):
        family = {
            "last_name": faker.last_name(),
            "address": faker.address(),
            "email": faker.email(),
            "phone_number": faker.phone_number(),
        }
        families.append(family)
    return families

# Function to generate students
def generate_students(num_students, families):
    students = []
    for _ in range(num_students):
        family = random.choice(families)
        student = {
            "first_name": faker.first_name(),
            "last_name": family["last_name"],  # Match family last name
            "family_id": family["_id"],  # Reference family ID
        }
        students.append(student)
    return students

def load_fixtures():
    # Connect to MongoDB
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]

    # Drop collections to avoid duplicate data during development
    db.families.drop()
    db.students.drop()

    # Generate and insert families
    num_families = 10  # Adjust as needed
    families = generate_families(num_families)
    family_ids = db.families.insert_many(families).inserted_ids

    # Add generated MongoDB IDs to the family documents
    for family, family_id in zip(families, family_ids):
        family["_id"] = family_id

    # Generate and insert students
    num_students = 30  # Adjust as needed
    students = generate_students(num_students, families)
    db.students.insert_many(students)

    print(f"Inserted {len(families)} families and {len(students)} students into the database.")

    # Close the connection
    client.close()

if __name__ == "__main__":
    load_fixtures()
