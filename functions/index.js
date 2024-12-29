const functions = require("firebase-functions");
const axios = require("axios");

exports.proxyPythonAPI = functions.https.onRequest(async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url:
        "https://python-backend-679194909576.us-central1.run.app",
      // Replace with your Python backend's URL
      data: req.body,
      headers: req.headers, // Forward headers if needed
    });
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error(
        "Error connecting to Python backend:",
        error.message,
    );
    res.status(500).send({
      error: "Unable to connect to backend",
    });
  }
});
