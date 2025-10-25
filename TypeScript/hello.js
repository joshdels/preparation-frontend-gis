function greet(name) {
    return "Hello, ".concat(name, "!");
}
var message = greet("world");
console.log(message);
var decimal = 6;
console.log(decimal);
// Arrays
var names = [];
names.push("Dylan");
names.push("1");
var head = names[0];
console.log(head);
// Tuples
var ourTuples;
ourTuples = [5, false, "coding was is fun"];
console.log(ourTuples);
var graph = [55.2, 41.3];
console.log(graph);
//Objects
var car = {
    type: "Toyota",
    model: "Carolla",
    year: 2009,
};
console.log(car);
// Funcitons
function getTime() {
    return new Date().getTime();
}
function printHello() {
    console.log('Hello!');
}
// functions with params
function multiple(a, b) {
    if (a === void 0) { a = 10; }
    return a * (b || 0); // if optional use ? then (b || 0) its result
}
// Named parameter
function divide(_a) {
    var dividend = _a.dividend, divisor = _a.divisor;
    return dividend / divisor;
}
//Alias parameters
var x = 'hello';
console.log(x.length);
// Classes
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    return Person;
}());
var person = new Person("Jane");
console.log(person.getName());

// Generic
function createPair<S, T>(v1: S, v2: T): [S, T] {
  return [v1, v2];
}
console.log(createPair<string, number>('hello', 42)); // ['hello', 42]
