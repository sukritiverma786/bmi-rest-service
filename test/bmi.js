const chai = require('chai')
const expect = chai.expect

const validator = require('./validator')

describe("validator is()", () => {

    it("should return true for a number in between 25 and 29.9", () => {
        expect(validator.isOverweight(28)).to.be.true
    })

    it("should return false when the number is less than or equal to 24.9", () => {
        expect(validator.isOverweight(20)).to.be.false
    })

    it("should return false when the number is greater than or equal to 30", () => {
        expect(validator.isOverweight(30)).to.be.false
    })

    it("should return count 2", () => {
        expect(validator.isOverweightCount()).to.eql(2);
    })
})