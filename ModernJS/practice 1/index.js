const apple = function(number) {
  return number * number;
}

const square = (number) => number * number;
console.log(square(5));

// APPLICATION
const jobs = [
  { id: 1, isActive: true},
  { id: 2, isActive: true},
  { id: 3, isActive: false},
];

const activeJobss = jobs.filter(function(job) {return job.isActive; });
const activeJobs = jobs.filter(job => job.isActive);


// Array Map()
const colors = ['red', 'green', 'blue'];
colors.map(function(color) {
  return '<li>' + color + '</li>'
})

const items = colors.map(color => `<li>${color}</li>`)
console.log(items)

// Object Destructuring 
const address = {
  street: 'phils',
  city: '',
  country: '',
}

// const street = address.street;
// console.log(street);

// Object Destructuring
const { street:st, city, country } = address;
console.log(st);

// SPREADING OPERATOR
const first = [1,2,3];
const second = [4,3,5];

const combined = first.concat(second);
const combineds = [...first, 'a', ...second, 'b']
console.log(combineds)

// // CLASSES
// class Person {
//   constructor(name) {
//     this.name = name;
//   }

//   walk() {
//     console.log("walk");
//   }
// }

// const person = new Person('Mosh');

// class Teacher extends Person{
//   constructor(name, degree) {
//     super(name);
//     this.degree = degree;
//   }

//   teach () {
//     console.log("teach");
//   }
// }

// const teacher = new Teacher('Josh', 'MSc');

// MODULES
import Teacher, { promote } from "./teacher.js";

// Default -> import ... from '';
// Named -> import { .. } from '';

const teacher = new Teacher('Josh', 'MSc');
teacher.teach();