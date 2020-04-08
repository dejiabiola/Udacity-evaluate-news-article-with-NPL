// Declare global variables
const errorDiv = document.getElementById('error-div');
const polarity = document.getElementById('polarity-div');
const subjectivity = document.getElementById('subjectivity-div');
const text = document.getElementById('text-div');

function handleSubmit(event) {
    event.preventDefault();

    

    // check what text was put into the form field
    let input_url = document.getElementById('url').value;

    console.log("::: Form Submitted :::")

    if (!input_url.length) {
      errorDiv.innerHTML = `<p class="error-text">You have not entered a URL</p>`
      errorDiv.style.visibility = 'visible';
      return;
    }
    if (Client.validateUrl(input_url)) {

      // Hide error messages
      errorDiv.style.visibility = 'hidden';
      
      // Clear previous form results and tell users that new results are loading
      polarity.innerHTML = `<h3 class="polarity">Loading...Please wait...</h3>`;
      subjectivity.innerHTML = "";
      text.innerHTML = "";
      
      
      // Call postdata passing in the input url
      postData(input_url)
      .then(function(data) {
        // Call uiUpdate once data has been sent back from server
        uiUpdate(data);
      })
    } else {
      // Display error message 
      errorDiv.innerHTML = `<p class="error-text">You have entered an invalid URL. Please try again</p>`
      errorDiv.style.visibility = 'visible';
    }
    
    
}

// Make post request to server passing in the url
const postData = async function(url = '') {
  
  const response = await fetch('http://localhost:8080/article', {
    method: 'POST', 
    credentials: 'same-origin', 
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({"url": url})
  });
  try {
    const dataObject = await response.json();
    return dataObject;
  } catch(error) {
    console.log('error', error);
    errorDiv.innerHTML = `<p class="error-text">An error was encountered. Try a different url</p>`
  }
}


// Update the results on the UI
function uiUpdate(data) {

  polarity.innerHTML = `<h3 class="polarity">Polarity:</h3>
                        <p>${data.polarity}</p>
                        <h4 class="polarity-confidence">Polarity Confidence:</h4>
                        <p>${data.polarity_confidence}</p>
                        `

  subjectivity.innerHTML = `<h3 class="subjectivity">Subjectivity:</h3>
                            <p>${data.subjectivity}</p>
                            <h4 class="subjectivity-confidence">Subjectivity Confidence:</h4>
                            <p>${data.subjectivity_confidence}</p>
                            `

  text.innerHTML = `<h3 class="text">Article:</h3>
                    <p>${data.text}</p>
                    `
}

export { handleSubmit, postData, uiUpdate }
