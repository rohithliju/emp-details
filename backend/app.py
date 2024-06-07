from datetime import datetime, timedelta
import json
from flask import Flask, Response, current_app, request, jsonify, send_file
from flask_cors import CORS, cross_origin
import jwt
from pymongo import MongoClient
from bson import ObjectId, json_util
from flask import Flask
from functools import wraps


app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'abcd' 


@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173') 
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  
  return response

client = MongoClient('mongodb://localhost:27017/')
db = client.rohith
user_collection = db.users
employee_collection = db.employee

def generate_token(email):
    token = jwt.encode({'email': email, 'exp': datetime.now() + timedelta(minutes=30)}, app.config['SECRET_KEY']) 
    return token 
 
def decode_token(token):
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'
    
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = data['email']
        except:
            return jsonify({'message': 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

@app.route('/signup', methods=['POST'])
def signup(): 
    response = {}

    input_payload = json.loads(request.data)
    username = input_payload.get('username', '')
    email = input_payload.get('email', '')
    password1 = input_payload.get('password1', '123')
    password2 = input_payload.get('password2', '123')

    if user_collection.find_one({'username': username}):
        statuscode = 400
        message = 'Username already exists'
    elif user_collection.find_one({'email': email}):
        statuscode = 400
        message = 'Username already exists'
    elif password1!=password2:
        statuscode = 400
        message = 'Password does not match'
    else:
        user_collection.insert_one({
            'username' : username,
            'email' : email,
            'password' : password1
        })
        statuscode = 200
        message = 'Registered'
    
    
    response = {}
    response['statusCode'] = statuscode
    response['message'] = message
    return response


@app.route('/login', methods=['POST'])
def login(): 
    response = {}

    input_payload = json.loads(request.data)
    email = input_payload.get('email', '')
    password = input_payload.get('password', '')
    user = user_collection.find_one({'email': email})
    if user:
        if user['password']== password:
            token = generate_token(email)
            message='logged in'
            statuscode=200
        else:
            message='invalid email or password'
            statuscode=400
            token='nil'
    else:
        message='invalid email or password'
        statuscode=400
    
    
    response = {}
    response['statusCode'] = statuscode
    response['message'] = message
    response['token'] = token
    return response

@app.route('/insert', methods=['POST'])
@token_required
def create_user(current_user):
    print(request.json) 
    data = request.json
    try:
        user_id = employee_collection.insert_one(data).inserted_id
        statuscode=200
        message='inserted'
    except Exception as e:
        statuscode=500
        message='failed'
    response = {}
    response['statusCode'] = statuscode
    response['message'] = message
    return response


@app.route('/read', methods=['POST'])
@token_required
def get_user(current_user):
    data = request.json
    body=''
    try:
        email=data.get('email', '')
        user = employee_collection.find_one({'email': email})  
        if user:
            statuscode=200
            message='read'
            body=str(user)
        else:
            statuscode=500
            message='id not found'
    except Exception as e:
        statuscode=500
        message='failed'

    response = {}
    response['statusCode'] = statuscode
    response['message'] = message
    response['body'] = body
    return response

@app.route('/update', methods=['POST']) 
@token_required
def update_user(current_user):
    data = request.json
    try:
        email=data.get('email', '')
        userid=data.get('userid', '')
        age=data.get('age', '')
        name=data.get('name', '')
        result = employee_collection.update_one({'email': email}, {'$set': {'userid': userid, 'age':age, 'name':name}}) 
        if result.modified_count > 0:
            statuscode=200
            message='updated'
        else:
            statuscode=500
            message='id not found'
    
    except Exception as e:
        statuscode=500
        message='failed'
    
    response = {}
    response['statusCode'] = statuscode
    response['message'] = message
    return response
 
@app.route('/delete', methods=['POST'])
@token_required
def delete_user(current_user):
    data = request.json
    try:
        email=data.get('email', '')
        result = employee_collection.delete_one({'email': email}) 

        if result.deleted_count > 0:
            statuscode=200
            message='inserted'
        else:
            statuscode=500
            message='id not found'
    except Exception as e:
        statuscode=500
        message='failed'
    
    response = {}
    response['statusCode'] = statuscode
    response['message'] = message
    return response


if __name__ == '__main__':
    app.run(port=8090, debug=True)
