
const express = require('express');
const app = express();
const port = 8000;

const StreamArray = require('stream-json/streamers/StreamArray');
const path = require('path');
const fs = require('fs');

//You'll get json objects here
//Key is an array-index here

app.get('/bmi', (req, res) => {
    const jsonStream = StreamArray.withParser();
    const filename = path.join(__dirname, 'weightApi.json');
    console.log(filename, 'filename')
    fs.createReadStream(filename).pipe(jsonStream.input);
    let count = 0;
    jsonStream.on('data', ({ key, value }) => {
        console.log(key, value.WeightKg);
        w = value.WeightKg;
        h = value.HeightCm;
        h1 = h / 100;
        BMI = w / h1;
        if (BMI >= 25 && BMI <= 29.9) {
            count++;
        }
        console.log(count);
    });

    jsonStream.on('end', () => {
        console.log('All done', count);
        res.send({ count: count });
    });
})


app.listen(port, () => {
    console.log(`server is running at ${port}`)
})

