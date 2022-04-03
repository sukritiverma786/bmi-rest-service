const express = require('express');
const app = express();
const port = process.env.port || 8000;

const StreamArray = require('stream-json/streamers/StreamArray');
const path = require('path');
const fs = require('fs');

//You'll get json objects here
//Key is an array-index here

app.get('/bmi', (req, res) => {
    const jsonStream = StreamArray.withParser();
    const filename = path.join(__dirname, 'weightApi.json');
    fs.createReadStream(filename).pipe(jsonStream.input);
    let count = 0;
    jsonStream.on('data', ({ key, value }) => {
        const w = value.WeightKg;
        const h = value.HeightCm;
        const h1 = h / 100;
        const squaredHeight = Math.round(h1 * h1 * 100) / 100;
        const BMI = Math.round(w / squaredHeight);
        if (BMI >= 25 && BMI <= 29.9) {
            count++;
        }
    });

    jsonStream.on('end', () => {
        res.send({ overweightCount: count });
    });
})

app.listen(port, () => {
    console.log(`server is running at ${port}`)
})

