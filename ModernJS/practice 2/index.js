// ARROW FUNCTION
export default function doSomethings() {
  // Logic
};
export const doSomething = () =>  console.log("Helloo");
doSomething();

// TERTIANARY ITERATORS
// let age = 16;
// let name = age > 10 || "Pedro";
// let names = age > 10 ? "Pedro" : "Jack" // if -> ? then : -> else

// OBJECT DESTRUCTURING
const person = {
  name: "Pedro",
  age: 28,
  isMarried: false,
};

// const {namea, agea, isMarried} = person;
// SPREAD OPERATOR
const person2 = {...person, name: "Jack"};
console.log(person2);
const names = ["Pedroo", "Jack", "Jessica"];
const names2 = [...names, "Joel"];
console.log(names2);

// ARRAY FUNCTIONS  
// .map()
names.map((name) => {
  return  `<h1> ${name} </h1>`
});

//.filter()
let number = ["Pedro", "Jack", "Jessica", "Pedro", "Pedro"];
const app = names.filter((name) => {
  return name !== "Pedro"
})

console.log(number);
console.log(app);

// ASYNC + AWAIT + FETCH
