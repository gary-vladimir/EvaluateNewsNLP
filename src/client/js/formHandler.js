function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;

    let res = Client.checkForName(formText);

    //reciving api key from server side
    let key;
    fetch('http://localhost:8081/get_data')
        .then((res) => res.json())
        .then((data) => {
            key = data.key;
            proceed(res, key);
            if (res === true) {
                document.getElementById('inv').style.display = 'none';
                document.getElementById('loading').style.display = 'block';

                fetch(
                    `https://api.meaningcloud.com/sentiment-2.1?key=${key}&lang=en&url=${formText}`
                )
                    .then((res) => {
                        return res.json();
                    })
                    .then(function (data) {
                        document.getElementById(
                            'agreement'
                        ).innerHTML = `Agreement: "${data.agreement}"`;
                        document.getElementById(
                            'subjectivity'
                        ).innerHTML = `Subjectivity: "${data.subjectivity}"`;
                        document.getElementById(
                            'confidence'
                        ).innerHTML = `Confidence: "${data.confidence}"`;
                        document.getElementById(
                            'irony'
                        ).innerHTML = `Irony: "${data.irony}"`;
                        document.getElementById(
                            'score'
                        ).innerHTML = `Score: "${data.score_tag}"`;

                        document.getElementById('loading').style.display =
                            'none';
                    });
            } else {
                document.getElementById('inv').style.display = 'block';
            }
        });
}

function proceed(res, key) {
    if ((key != '') & (res === true)) {
        return true;
    } else {
        return false;
    }
}

export { handleSubmit, proceed };
