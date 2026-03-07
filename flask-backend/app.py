from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = "AIzaSyAYiqp66N6jz_usFlwKoN6hFaIFSkEQUZI"

@app.route("/")
def home():
    return "AI Meeting Backend Running"

@app.route("/summarize", methods=["POST"])
def summarize():

    data = request.json
    transcript = data.get("text", "")

    prompt = f"""
You are an AI meeting assistant.
Analyze the following meeting transcript and generate:

1.A short summary
2.Action items
3.key decisions

Format clearly like this:
 
Summary:
...
Action Items:
-item
-item

key Decisions:
-decision
-decision

Transcript:
{transcript}
"""

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    payload = {
        "contents":[
            {
                "parts":[
                    {"text": prompt}
                ]
            }
        ]
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        result = response.json()
        summary = result["candidates"][0]["content"]["parts"][0]["text"]
        return jsonify({"summary": summary})

    else:
        print(response.text)
        return jsonify({"summary": "AI could not generate summary"})


if __name__ == "__main__":
    app.run(port=5000, debug=True)