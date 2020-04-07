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

  polarity.innerHTML = `<p class="polarity"><strong>Polarity:</strong> ${data.polarity}</p>
                        <p class="polarity-confidence"><strong>Confidence:</strong> ${data.polarity_confidence}</p>
                        `

  subjectivity.innerHTML = `<p class="subjectivity"><strong>Subjectivity:</strong> ${data.subjectivity}</p>
                        <p class="subjectivity-confidence"><strong>Confidence:</strong> ${data.subjectivity_confidence}</p>
                        `

  text.innerHTML = `<p class="text"><strong>Text:</strong> ${data.text}</p>`
}

export { handleSubmit, postData }
