const expect = require("chai").expect;
const emp = require("../data");

describe("Employee", () => {
    it("returns requested employee", () => {
      const result = emp.get("Jiyun Noh");
      expect(result).to.deep.equal({name: "Jiyun Noh", age:26, company : 'Disney', position : 'Web Developer'});
    });
    
    it("fails to return an invalid employee", () => {
        const result = emp.get("Fake");
        expect(result).to.be.undefined;
    });

    it("adds a new employee", () => {
        const result = emp.add({name: "Harry Potter", age:34, company : 'Hogwarts', position : 'Professor'});
        expect(result.added).to.be.true;
    });
      
    it("fails to add an existing employee", () => {
        const result = emp.add({name: "Jiyun Noh", age:26, company : 'Disney', position : 'Web Developer'});
        expect(result.added).to.be.false;
    });

    it("deletes an existing employee", () => {
        const result = emp.delete("Jiyun Noh");
        expect(result.deleted).to.be.true;
    });
      
    it("fails to delete an invalid employee", () => {
        const result = emp.delete("Jennie");
        expect(result.deleted).to.be.false;
    });

});