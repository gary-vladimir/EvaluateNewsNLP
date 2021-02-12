function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;

    let res = Client.checkForName(formText);

    const key = '';

    console.log('::: Form Submitted :::');
    if (res === true) {
        document.getElementById('inv').style.display = 'none';
        document.getElementById('loading').style.display = 'block';
        fetch(
            `https://api.meaningcloud.com/sentiment-2.1?key=${key}&lang=en&...&url=${formText}`
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

                document.getElementById('loading').style.display = 'none';
            });
    } else {
        document.getElementById('inv').style.display = 'block';
    }
}

export { handleSubmit };
