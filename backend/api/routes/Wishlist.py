from flask import jsonify, request
from flask_restx import Resource, reqparse
from api.models.sqlModel.User import User
from api.models.sqlModel.Minor import Minor
from api.models.sqlModel.Course import Course
from api.models.sqlModel.Wishlist import Wishlist
from flask.views import MethodView


# -------------------- Wishlist related --------------------
class WishlistView(Resource):
    def get(self):
        username = request.args.get("username")
        try:
            wishlistItems = [item.to_json() for item in Wishlist.get(username)]
            resp = jsonify({"wishlist": wishlistItems})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": e})
            resp.status_code = 400
            return resp

    def post(self):
        username = request.args.get("username")
        code = request.args.get("course_code")
        name = request.args.get("course_name")
        try:
            Wishlist.add_course(username, code, name)
            resp = jsonify({"wishlist": "Course added"})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": e})
            resp.status_code = 400
            return resp

    def remove(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", required=True)
        parser.add_argument("code", required=True)
        data = parser.parse_args()
        username = data["username"]
        code = data["code"]
        try:
            Wishlist.remove_course(username, code)
            resp = jsonify({"wishlist": "removed course"})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

# class UserWishlistMinorCheck(Resource):
#     def get(self):
#         username = request.args.get("username")
#         try:
#             wl = Wishlist.get(username)
#             courses = [c.code for c in wl.course]
#             check = Minor.check(courses)
#             resp = jsonify({"minorCheck": check})
#             resp.status_code = 200
#             return resp
#         except Exception as e:
#             resp = jsonify({"error": "something went wrong"})
#             resp.status_code = 400
#             return resp

#     def post(self):
#         parser = reqparse.RequestParser()
#         parser.add_argument("username", required=True)
#         data = parser.parse_args()
#         username = data["username"]
#         try:
#             wl = User.get(username)
#             courses = [c.code for c in wl.course]
#             check = Minor.check(courses)
#             resp = jsonify({"minorCheck": check})
#             resp.status_code = 200
#             return resp
#         except Exception as e:
#             resp = jsonify({"error": "something went wrong"})
#             resp.status_code = 400
#             return resp
