const arr = require('../weightApi.json');

exports.isOverweight = function (num) {
    if (num >= 25 && num <= 29.9) {
        return true
    } else {
        return false
    }
}

exports.isOverweightCount = function () {
    let count = 0;
    arr.forEach(value => {
        const w = value.WeightKg;
        const h = value.HeightCm;
        const h1 = h / 100;
        const squaredHeight = Math.round(h1 * h1 * 100) / 100;
        const BMI = Math.round(w / squaredHeight);
        if (BMI >= 25 && BMI <= 29.9) {
            count++;
        }
    });
    return count;
}






