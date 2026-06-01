from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)   # allow frontend requests

# Home route (just to test server)
@app.route('/')
def home():
    return "Flask Server Running ✅"

# Database Config
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'shirisha744'   # 🔥 change this
app.config['MYSQL_DB'] = 'student_portal'

mysql = MySQL(app)

# LOGIN API
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # get values from frontend
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')

    cur = mysql.connection.cursor()

    query = "SELECT * FROM user WHERE username=%s AND password=%s AND role=%s"
    cur.execute(query, (username, password, role))

    user = cur.fetchone()
    cur.close()

    if user:
        return jsonify({
            "status": "success",
            "role": role
        })
    else:
        return jsonify({
            "status": "fail",
            "message": "Invalid credentials"
        })
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')
    role = data.get('role')

    cur = mysql.connection.cursor()
    cur.execute(
        "INSERT INTO user (username, password, role) VALUES (%s, %s, %s)",
        (username, password, role)
    )
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "Registered Successfully ✅"})
# RUN SERVER
if __name__ == '__main__':
    app.run(debug=True)
