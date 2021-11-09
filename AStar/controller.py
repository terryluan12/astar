# this is the controller

from flask import jsonify, request
from flask_restful import Resource, reqparse
from config import app
from model import *

@app.route("/")
def app_connect():
    return "A-Star"

# -------------------- User related --------------------
class UserRegistration(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        parser.add_argument('password', required=True)
        data = parser.parse_args()
        username = data['username']
        password = data['password']
        
        if User.objects(username=username):
            resp = jsonify({'message': 'Username already exists'})
            resp.status_code = 409
            return resp
        
        try:
            User.create(username, password)
            resp = jsonify({})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': e})
            resp.status_code = 400
            return resp

class UserUpdatePwd(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        parser.add_argument('password', required=True)
        data = parser.parse_args()
        username = data['username']
        password = data['password']

        try:
            User.create(username, password)
            resp = jsonify({})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': e})
            resp.status_code = 400
            return resp

class UserLogin(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        parser.add_argument('password', required=True)
        data = parser.parse_args()
        username = data['username']
        password = data['password']

        try:
            if User.verify_password(username, password):
                resp = jsonify({})
                resp.status_code = 200
                return resp
            else:
                resp = jsonify({'message': 'Login failed'})
                resp.status_code = 401
                return resp
        except Exception as e:
            resp = jsonify({'error': e})
            resp.status_code = 400
            return resp
# ------------------------------------------------------------

# -------------------- Course related --------------------
class ShowCourse(Resource):
    def get(self):
        code = request.args.get('code')

        if not Course.objects(code=code):
            resp = jsonify({'message': f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp

        try:
            resp = jsonify({'course': Course.get(code)})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': e})
            resp.status_code = 400
            return resp

    
class SearchCourse(Resource):
    def get(self):
        input = request.args.get('input')



    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('input', required=True)
        data = parser.parse_args()
        input = data['input']