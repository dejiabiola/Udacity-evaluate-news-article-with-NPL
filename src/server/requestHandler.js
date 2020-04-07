const aylien = require('aylien_textapi');




function getArticle(req,res) {
  // Set aylien API credentials
  var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });


  textapi.sentiment({
    url: req.body.url
    }, 
    function(error, response) {
      res.send(response);
    }
  );
}






exports.getArticle = getArticle;