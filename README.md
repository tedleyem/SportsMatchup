# NBA Matchups App

Compare any two NBA teams and get detailed head-to-head statistics, including win-loss records, season game logs, average points, and key performance metrics. Perfect for fans, analysts, and bettors looking for in-depth team matchup insights—similar to tools like Land of Basketball’s head-to-head game logs.

## Tech Stack

- Node 20.19.2 (frontend)
- Vite 7.1.2
- React 19.1.1
- Python 3.13 (backend)
- Docker

---

## NBA Matchups Contact Info

Email: contactNBAmatchups@gmail.com
IG: @theNBAmatchups
X: @theNBAmatchups

### Using npm (Without Docker)

```bash
# Move to matchups dir
cd matchups

# Install dependencies
npm install

# Run tests
npm test

# Run the app locally
npm run dev

# Backend Setup (be sure to have Python 3.13 installed)
# Move to backend dir 
cd backend 

# Activate virtual environment 
source venv/bin/activate 

# Install Flask and other requirements 
pip3 install -r requirements.txt 

# Run flask locally 
flask run --host=0.0.0.0 --port=5000"
```

### Using Docker Compose
Make sure Docker and Docker Compose are installed.

```bash
# Build and start the app with Docker Compose
docker-compose up --build -d

# To stop the app
docker-compose down
```


# Test API Endpoints 
* [http://127.0.0.1:5000/api/test](http://127.0.0.1:5000/api/test)

 
* [http://127.0.0.1:5000/api/test](http://127.0.0.1:5000/api/teams)

# CONTRIBUTORS
* [Fabian V](website)
* [Tedley M](https://ted.meralus.com)
