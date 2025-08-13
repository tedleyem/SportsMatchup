from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

# RapidAPI configuration
RAPID_API_KEY = 'your-rapidapi-key'  # Replace with your RapidAPI key
RAPID_API_HOST = 'api-host-from-rapidapi'  # Replace with the API host (e.g., 'api-football-v1.p.rapidapi.com')
RAPID_API_URL = 'https://api-host-from-rapidapi/v3/endpoint'  # Replace with the specific endpoint

@app.route('/api/data', methods=['GET'])
def get_rapidapi_data():
    try:
        # Get query parameters from the request (optional)
        query_param = request.args.get('param', '')

        # Set up headers for RapidAPI
        headers = {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': RAPID_API_HOST
        }

        # Optional: Add query parameters for the RapidAPI request
        params = {
            'param': query_param  # Adjust based on the API's required parameters
        }

        # Make the request to RapidAPI
        response = requests.get(RAPID_API_URL, headers=headers, params=params)

        # Check if the request was successful
        if response.status_code == 200:
            data = response.json()
            return jsonify({
                'status': 'success',
                'data': data
            }), 200
        else:
            return jsonify({
                'status': 'error',
                'message': f'RapidAPI request failed with status {response.status_code}',
                'details': response.text
            }), response.status_code

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': 'An error occurred',
            'details': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)