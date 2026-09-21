from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = \
'mysql+pymysql://bloguser:blogpass@mysql:3306/blogdb'

db = SQLAlchemy(app)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    content = db.Column(db.Text)

@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()

    return jsonify([
        {
            "id": p.id,
            "title": p.title,
            "content": p.content
        } for p in posts
    ])

@app.route('/posts', methods=['POST'])
def create_post():
    data = request.json

    post = Post(
        title=data['title'],
        content=data['content']
    )

    db.session.add(post)
    db.session.commit()

    return jsonify({"message": "Post created"}), 201

@app.route('/health')
def health():
    return {"status": "UP"}

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(host="0.0.0.0", port=5000)
