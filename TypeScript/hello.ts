function greet(name: string): string {
  return `Hello, ${name}!`;
}

const message: string = greet("world");
console.log(message);

let decimal: number = 6;
console.log(decimal);

// Arrays
const names: string[] = [];
names.push("Dylan");
names.push("1");
let head: string = names[0];
console.log(head);

// Tuples
let ourTuples : [number, boolean, string];
ourTuples = [5, false, "coding was is fun"];
console.log(ourTuples)

const graph: [x: number, y: number ] = [55.2, 41.3]
console.log(graph)

//Objects
const car: {type: string, model: string, year: number} = {
  type: "Toyota",
  model: "Carolla",
  year: 2009,
};

console.log(car);

// Funcitons
function getTime(): number {
  return new Date().getTime();
}

function printHello(): void {
  console.log('Hello!');
}

// functions with params
function multiple(a: number = 10, b?: number): number {
  return a * (b || 0); // if optional use ? then (b || 0) its result
}

// Named parameter
function divide({ dividend, divisor} : { dividend: number, divisor: number}) {
  return dividend / divisor
}

//Alias parameters
let x: unknown = 'hello';
console.log((x as string).length)

// Classes
class Person {
  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}

const person = new Person("Jane");
console.log(person.getName());

