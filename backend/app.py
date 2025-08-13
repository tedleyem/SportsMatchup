from flask import Flask, jsonify, render_template_string
import http.client
import json
from dotenv import load_dotenv
import os

# Load variables from .env file
load_dotenv()

app = Flask(__name__)

# Define API headers directly
# SECURITY WARNING 
# These are free API strings from RapidAPI 
# https://rapidapi.com/api-sports/api/api-nba/playground/apiendpoint_f97c89e8-3b1f-4a34-b5b0-79725963b3c8 
# Placing secrets in plain text to share on github is bad practice 
# but this is for testing and development purposes and the public api information
# can be found in the link above. 
#headers = {
#    'X-RapidAPI-Key': '2a4ff8e817msh29f1a76b1f56ec9p13eb64jsn5a2da6223d74',
#    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
#}
headers = {
    'X-RapidAPI-Key': os.getenv('PUBLIC_RAPIDAPI_KEY'),
    'X-RapidAPI-Host': os.getenv('PUBLIC_RAPIDAPI_HOST')
}

# ASCII art of Neo
neo_art = """
⠀⠀⠀⠀⠀⠀⢀⣤⣶⣶⣶⣶⣦⣤⣀⠀⠀⠀⠀⠀
⠀⠀⢀⣤⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀
⠀⢠⣿⣿⣿⣿⣿⠿⣿⣿⣿⣿⠿⠿⢿⣿⣿⣷⡀⠀
⠀⢸⣿⡿⠋⠁⠀⠀⠀⠉⠉⠀⠀⠀⠀⠈⢹⣿⡇⠀
⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀
⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀
⠀⢸⣿⣠⣴⣶⣶⣶⣦⣀⣀⣴⣶⣶⣶⣤⣄⣿⡇⡀
⣿⣿⣿⠻⣿⣿⣿⣿⣿⠟⠻⣿⣿⣿⣿⣿⠟⣿⣿⣿
⣿⣿⣿⠀⠈⠉⠛⠋⠉⠀⠀⠉⠙⠛⠉⠁⠀⣿⣿⣿
⠙⢿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡿⠃
⠀⠸⣿⣧⠀⠀⠀⢀⣀⣀⣀⣀⡀⠀⠀⠀⣼⣿⠇⠀
⠀⠀⠙⢿⣷⣄⠀⠈⠉⠉⠉⠉⠁⠀⣠⣾⡿⠃⠀⠀
⠀⠀⠀⢸⣿⣿⣷⣤⣀⣀⣀⣀⣤⣾⣿⣿⡅⠀⠀⠀
⠀⠀⢰⣿⣿⣿⣿⣿⣿⡿⠿⢿⣿⣿⣿⣿⣿⡄⠀⠀
⠀⠀⠻⠿⠿⠿⠿⠿⠿⠷⠴⠿⠿⠿⠿⠿⠿⠇⠀⠀
"""

# Basic HTML template for the main page
template = """
<!DOCTYPE html>
<html>
<head>
    <title>What if I told you</title>
    <style>
        body {
            background-color: black;
            color: #00FF00;
            font-family: 'Courier New', monospace;
            text-align: center;
            margin-top: 50px;
        }
        pre {
            display: inline-block;
            text-align: left;
        }
        .links {
            margin-top: 20px;
        }
        .links a {
            color: #00FF00;
            margin: 0 15px;
            text-decoration: none;
            font-size: 18px;
        }
        .links a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <pre>{{ neo_art }}</pre>
    <p>Just take the blue pill</p>
    <div class="links">
        <a href="/api/test">API TEST</a>
        <a href="/api/teams">API TEAMS</a>
        <a href="/api/seasons">SEASONS</a>
        <a href="/api/games">GAMES</a>
        <a href="/api/standings">STANDINGS</a>
    </div>
</body>
</html>
"""

@app.route('/')
def index():
    return render_template_string(template, neo_art=neo_art)

@app.route("/api/test", methods=["GET"])
def get_nba_teams():
    """
    API Endpoint to return a list of NBA team IDs, names, and logos in JSON response.
    """
    teams = [
        {"id": "ATL", "name": "Atlanta Hawks", "image": "https://upload.wikimedia.org/wikipedia/en/2/24/Atlanta_Hawks_logo.svg"},
        {"id": "BOS", "name": "Boston Celtics", "image": "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg"},
        {"id": "BKN", "name": "Brooklyn Nets", "image": "https://upload.wikimedia.org/wikipedia/en/4/40/Brooklyn_Nets_primary_icon_logo_2024.svg"},
        {"id": "CHA", "name": "Charlotte Hornets", "image": "https://upload.wikimedia.org/wikipedia/en/c/c4/Charlotte_Hornets_%282014%29.svg"},
        {"id": "CHI", "name": "Chicago Bulls", "image": "https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg"},
        {"id": "CLE", "name": "Cleveland Cavaliers", "image": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cleveland_Cavaliers_logo.svg"},
        {"id": "DAL", "name": "Dallas Mavericks", "image": "https://upload.wikimedia.org/wikipedia/en/9/97/Dallas_Mavericks_logo.svg"},
        {"id": "DEN", "name": "Denver Nuggets", "image": "https://upload.wikimedia.org/wikipedia/en/7/76/Denver_Nuggets.svg"},
        {"id": "DET", "name": "Detroit Pistons", "image": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Logo_of_the_Detroit_Pistons.svg"},
        {"id": "GSW", "name": "Golden State Warriors", "image": "https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg"},
        {"id": "HOU", "name": "Houston Rockets", "image": "https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Rockets.svg"},
        {"id": "IND", "name": "Indiana Pacers", "image": "https://upload.wikimedia.org/wikipedia/en/1/1b/Indiana_Pacers.svg"},
        {"id": "LAC", "name": "Los Angeles Clippers", "image": "https://upload.wikimedia.org/wikipedia/en/e/ed/Los_Angeles_Clippers_%282024%29.svg"},
        {"id": "LAL", "name": "Los Angeles Lakers", "image": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg"},
        {"id": "MEM", "name": "Memphis Grizzlies", "image": "https://upload.wikimedia.org/wikipedia/en/f/f1/Memphis_Grizzlies.svg"},
        {"id": "MIA", "name": "Miami Heat", "image": "https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg"},
        {"id": "MIL", "name": "Milwaukee Bucks", "image": "https://upload.wikimedia.org/wikipedia/en/4/4a/Milwaukee_Bucks_logo.svg"},
        {"id": "MIN", "name": "Minnesota Timberwolves", "image": "https://upload.wikimedia.org/wikipedia/en/c/c2/Minnesota_Timberwolves_logo.svg"},
        {"id": "NOP", "name": "New Orleans Pelicans", "image": "https://upload.wikimedia.org/wikipedia/en/0/0d/New_Orleans_Pelicans_logo.svg"},
        {"id": "NYK", "name": "New York Knicks", "image": "https://upload.wikimedia.org/wikipedia/en/2/25/New_York_Knicks_logo.svg"},
        {"id": "OKC", "name": "Oklahoma City Thunder", "image": "https://upload.wikimedia.org/wikipedia/en/5/5d/Oklahoma_City_Thunder.svg"},
        {"id": "ORL", "name": "Orlando Magic", "image": "https://upload.wikimedia.org/wikipedia/en/1/10/Orlando_Magic_logo.svg"},
        {"id": "PHI", "name": "Philadelphia 76ers", "image": "https://upload.wikimedia.org/wikipedia/en/0/0e/Philadelphia_76ers_logo.svg"},
        {"id": "PHX", "name": "Phoenix Suns", "image": "https://upload.wikimedia.org/wikipedia/en/d/dc/Phoenix_Suns_logo.svg"},
        {"id": "POR", "name": "Portland Trail Blazers", "image": "https://upload.wikimedia.org/wikipedia/en/2/21/Portland_Trail_Blazers_logo.svg"},
        {"id": "SAC", "name": "Sacramento Kings", "image": "https://upload.wikimedia.org/wikipedia/en/c/c7/SacramentoKings.svg"},
        {"id": "SAS", "name": "San Antonio Spurs", "image": "https://upload.wikimedia.org/wikipedia/en/a/a2/San_Antonio_Spurs.svg"},
        {"id": "TOR", "name": "Toronto Raptors", "image": "https://upload.wikimedia.org/wikipedia/en/3/36/Toronto_Raptors_logo.svg"},
        {"id": "UTA", "name": "Utah Jazz", "image": "https://upload.wikimedia.org/wikipedia/en/7/77/Utah_Jazz_logo_2025.svg"},
        {"id": "WAS", "name": "Washington Wizards", "image": "https://upload.wikimedia.org/wikipedia/en/0/02/Washington_Wizards_logo.svg"},
    ]
    return jsonify(teams)

@app.route("/api/teams", methods=["GET"])
def get_teams():
    conn = http.client.HTTPSConnection("PUBLIC_RAPIDAPI_HOST")
    conn.request("GET", "/teams", headers=headers)
    res = conn.getresponse()
    data = res.read()
    conn.close()
    return jsonify(json.loads(data.decode("utf-8")))

@app.route("/api/seasons", methods=["GET"])
def get_seasons():
    conn = http.client.HTTPSConnection("PUBLIC_RAPIDAPI_HOST")
    conn.request("GET", "/seasons", headers=headers)
    res = conn.getresponse()
    data = res.read()
    conn.close()
    return jsonify(json.loads(data.decode("utf-8")))

@app.route("/api/games", methods=["GET"])
def get_games():
    conn = http.client.HTTPSConnection("PUBLIC_RAPIDAPI_HOST")
    conn.request("GET", "/games?date=2024-12-25", headers=headers)
    res = conn.getresponse()
    data = res.read()
    conn.close()
    return jsonify(json.loads(data.decode("utf-8")))

@app.route("/api/standings", methods=["GET"])
def get_standings():
    conn = http.client.HTTPSConnection("PUBLIC_RAPIDAPI_HOST")
    conn.request("GET", "/standings?league=standard&season=2024", headers=headers)
    res = conn.getresponse()
    data = res.read()
    conn.close()
    return jsonify(json.loads(data.decode("utf-8")))

if __name__ == "__main__":
    app.run(debug=True)