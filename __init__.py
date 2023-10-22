from flask import Flask, render_template, send_file
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('your_database.db')  # Replace with your desired database name
    cursor = conn.cursor()

    # Create tables and perform other database initialization steps
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT
        )
    ''')

    # Add more tables and initialization steps as needed

    conn.commit()
    conn.close()

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/', methods=['POST'])
def login_post():
    username = request.form['Username']
    password = request.form['password']

    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, password))

    conn.commit()
    conn.close()

    return redirect('/start')  # Redirect to a dashboard page after successful login

@app.route('/start')
def start():
    return send_file('start.html')

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
