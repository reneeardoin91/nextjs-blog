export default (req, res) => { // Export a default API route handler that receives the request and response objects.
  res.status(200).json({ text: 'Hello' }); // Send a successful JSON response containing the message 'Hello'.
}; // End the API route handler function.
