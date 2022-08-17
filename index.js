addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// Basic request handler. Ensures request is a POST request and parses the message body and sender phone number
async function handleRequest(request) {
  if (request.method !== 'POST') {
    return simpleMessage(200, 'Error: not a POST')
  } 
  
  const reqBody = await request.formData();
  let body = reqBody.get("Body");
  let from = reqBody.get("From");
  return twilioWebhookHandler(from, body);
}

// Forwards the message to the user if it's from a different phone number
async function twilioWebhookHandler(from, body) {
  // Parse the text from the incoming request and log to console
  if (from !== MY_NUM) {
    return sendMessage(MY_NUM, body);
  } else {
    // User sends phone number at start of message followed by a semicolon
    let recip = body.substring(0, body.indexOf(';'));
    
    //Basic check to ensure length of phone number is valid
    if (recip.length < 10 || recip.length > 12) {
      return sendMessage(MY_NUM, "invalid phone number specified")
    }
    
    let msg = body.substring(body.indexOf(' ') + 1);
    return sendMessage(recip, msg);
  }
}

//Return a simple JSON response with status code and message
function simpleMessage(statusCode, message) {
  let resp = {
    message: message,
    status: statusCode
  };
  
  return new Response(JSON.stringify(resp), {
    headers: { 'Content-Type': 'application/json'},
    status: statusCode
  });
}


//Sends a new message to the specified number
async function sendMessage(numTo, message) {
  const requestURL = "https://api.twilio.com/2010-04-01/Accounts/" + ACCOUNT_SID + "/Messages.json";
  
  let encoded = new URLSearchParams();
  encoded.append('To', numTo);
  encoded.append('From', TWILIO_NUM);
  encoded.append('Body', message);
  
  let token = btoa(ACCOUNT_SID + ':' + AUTH_TOKEN);

  const request = {
    body: encoded,
    method: 'POST',
    headers: {
      'Authorization': `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }; 
  
  let result = await fetch(requestURL, request);
  let responseOptions = { 
    status: 200,
    headers: { 'Content-Type': 'text/html'}
   };
  return new Response('<Response></Response>', responseOptions);
}