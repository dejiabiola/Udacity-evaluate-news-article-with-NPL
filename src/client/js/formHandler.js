function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let input_url = document.getElementById('url').value

    console.log("::: Form Submitted :::")

    if (Client.validateUrl(input_url)) {
      postData(input_url)
      .then(function(data) {
        uiUpdate(data);
      })
    } else {
      console.log("email is not valid")
    }
    
    
}

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
  }
}

function uiUpdate(data) {
  const polarity = document.getElementById('polarity-div');
  const subjectivity = document.getElementById('subjectivity-div');
  const text = document.getElementById('text-div');

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

  text.innerHTML = `<h3 class="text">Text:</h3>
                    <p>${data.text}</p>
                    `
}

export { handleSubmit, postData, uiUpdate }
