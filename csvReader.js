async function getQuestionsFromCSV() {
    const RESPONSE = await fetch("questions.csv");
    const DATA = await RESPONSE.text();
    var parsedData = Papa.parse(DATA);
    parsedData.data.shift();
    console.log(parsedData.data);
    return parsedData.data;
}
