from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS # for flask+react

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='mysql://root:''@localhost/flaskdb' # to use and track Open Server Panel - PhpMyAdmin
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False # then - from app import app, db - app.app_context().push() - db.create_all()
cors = CORS(app)

db = SQLAlchemy(app)
ma = Marshmallow(app) 

class Posts(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    date = db.Column(db.DateTime, default = datetime.datetime.now)
    completed = db.Column(db.Boolean, default=False)
    def __init__(self, title, body):
        self.title = title
        self.body = body
class PostSchema(ma.Schema):
    class Meta:
        fields = ('id','title','body','date','completed')

Post_schema = PostSchema()
Posts_schema = PostSchema(many=True)

@app.route('/get', methods=['GET'])
def get_Posts():
    all_Posts = Posts.query.all()
    results = Posts_schema.dump(all_Posts)
    return jsonify(results)

@app.route('/get/<id>/', methods=['GET'])
def post_info(id):
    Post = Posts.query.get(id)
    return Post_schema.jsonify(Post)

@app.route('/add', methods=['POST'])
def add_Post():
    title = request.json['title']
    body = request.json['body']
    posts = Posts(title, body)
    db.session.add(posts)
    db.session.commit()
    return Post_schema.jsonify(posts)
    
@app.route('/delete/<id>/', methods=['DELETE'])
def Post_delete(id):
    Post = Posts.query.get(id)
    db.session.delete(Post)
    db.session.commit()
    return Post_schema.jsonify(Post)

@app.route('/update/<id>/', methods=['PUT'])
def update_Post(id):
    Post = Posts.query.get(id)
    title = request.json['title']
    body = request.json['body']
    Post.title = title
    Post.body = body
    db.session.commit()
    return Post_schema.jsonify(Post)

@app.route('/complete/<id>/', methods=['PUT'])
def complete_post(id):
    Post = Posts.query.get(id)
    Post.completed = not Post.completed
    db.session.commit()
    return Post_schema.jsonify(Post)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)