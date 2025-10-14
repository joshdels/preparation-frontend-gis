// // 1. Zoom Level
// let zoom = 12;
// zoom = 15;
// console.log(15);

// // 2. Debug
// let center = [125.6, 8,9];
// center = [120.5, 7.3];
// console.log(center);

// // 3. Functions
// function areaOfSquare(side) {
//   return side * side
// };

// console.log(areaOfSquare(10));

// const areaOfSquareNew = (side) => { return side * side };
// console.log(areaOfSquareNew(100));
// // const areaOfSquareArrow = (side) => side * side;
// // console.log(areaOfSquareArrow(5));

// // 4. Debug function scope
// function showCoords() {
//   let lat = 7.3;
//   let lon;
//   if (true) {
//     lon = 125.6;
//   }
//   console.log(lat, lon)
// }

// showCoords();

// // 5. Arrays, Object and DOM
// const rivers = [
//   { name: "Cagayan", length: 505 },
//   { name: "Agusan", length: 350 }
// ];

// const longRivers = rivers.filter((river) => {
//   return river.length > 500
// }); // this is acceptable answer

// console.log(longRivers)

// const longRiver = rivers.filter(river => river.length > 500 );
// console.log(longRiver); // this is long 

// // 6. Debug Object Access
// const city = { name: "Davao", lat: 7.07, lon: 125.6}
// const {name, lat, lon} = city
// console.log(lat, lon)

// // 7. ASYNCHRONOUS JAVASCRIPT
// fetch("https://jsonplaceholder.typicode.com/posts/1")
//   .then(response => response.json())
//   .then(data => console.log(data));

// //  8. DEBUG ASYNC FUNCTION
// async function getData() {
//   const res = fetch("https://jsonplaceholder.typicode.com/posts/1");
//   const data = (await res).json();
  
//   console.log(data);
// }
// getData();

//  8. DEBUG ASYNC FUNCTION # Im very new to this asynchronous, what is this await??? and Promise
// async function getData() {
//   const res = await
//   fetch("https://jsonplaceholder.typicode.com/posts/1");
//   const data = await res.json();
  
//   console.log(data);
// }
// getData();

// // 9 ES6 Features Destructuring
// const coords = {lat: 7.3, lon: 125.6};
// const { lat, lon } = coords
// console.log(lat,lon)

// Spread Operator
// const baseLayers = ['osm'];
// const overlayLayers = ['rivers', 'roads'];
// const combined = [...baseLayers, ...overlayLayers];
// console.log(combined);

// 10 BROWSER & DOM API
// Button Event



