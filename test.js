function Person(birthYear) {
    this.birthYear = birthYear;
    this.calcAge = function () {
        return 2021 - this.birthYear;
    };
}

const man = new Person(27);
const woman = new Person(25);

console.log(man.calcAge === woman.calcAge); // false

function Person(birthYear) {
    this.birthYear = birthYear;
}

Person.prototype.calcAge = function () {
    return 2020 - this.birthYear;
};

const man = new Person(27);
const woman = new Person(25);

console.log(man.calcAge === woman.calcAge); // true
