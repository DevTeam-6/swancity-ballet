from app import create_app

app = create_app()

@app.route('/')
def home():
    return {"message": "Welcome to Flask Mongo App"}

@app.route('/data', methods=['GET'])
def get_data():
    data = db.collection_name.find()
    return {"data": list(data)}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
