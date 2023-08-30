const axios = require('axios');

axios.get('https://content.guardianapis.com/search?order-by=newest&show-fields=byline%2Cthumbnail%2Cheadline%2CbodyText&api-key=5d82019f-d864-4447-b34d-1ecf955ea762')
    .then((response) => {
        // Uncomment the following line to print the whole response object
        // console.log(response.data);
        const { results } = response.data.response;
        //console.log(results);
        // Use map to loop through the results array and print each title
        results.map((article) => {
            console.log(article);
        });
    })
    .catch((error) => {
        console.error('Error fetching data from NY Times:', error);
    });