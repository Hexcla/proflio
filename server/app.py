from flask import Flask, send_from_directory, jsonify, request
from pathlib import Path
import json, time

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR
DATA_FILE = STATIC_DIR / 'data' / 'projects.json'
LOGS_DIR = STATIC_DIR / 'logs'
LOGS_DIR.mkdir(exist_ok=True)

app = Flask(__name__, static_folder=str(STATIC_DIR), static_url_path='')


@app.get('/')
def root():
    return send_from_directory(STATIC_DIR, 'index.html')


@app.get('/api/projects')
def api_projects():
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            projects = json.load(f)
    except Exception:
        projects = []
    return jsonify(projects)


@app.post('/api/contact')
def api_contact():
    data = request.get_json(silent=True) or {}
    entry = {
        'name': data.get('name',''),
        'email': data.get('email',''),
        'phone': data.get('phone',''),
        'message': data.get('message',''),
        'ts': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
    }
    # Append to local log file
    log_path = LOGS_DIR / 'hire_requests.jsonl'
    with open(log_path, 'a', encoding='utf-8') as f:
        f.write(json.dumps(entry, ensure_ascii=False) + '\n')
    return jsonify({'ok': True})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


