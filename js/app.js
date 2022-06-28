/*
  File: app.js
  Author: Daniel Frey
*/
'use strict';

//Global Variables
const storeLocations = [];
const hours = ['6 am','7 am','8 am','9 am','10 am','11 am','12 pm','1 pm','2 pm','3 pm','4 pm','5 pm','6 pm','7 pm'];

// generateLocationsArray();
function CreateLocation(locationName, min, max, avgSales){
  this.locationName = locationName;
  this.minCustomers = min;
  this.maxCustomers = max;
  this.avgCookieSale = avgSales;
  this.customersByHour = [];
  this.salesByHour = [];
  this.totalSales = 0;
}
CreateLocation.prototype.generateCustomersArray = function(){
  let customersThisHour;
  for (let i = 0; i < hours.length; i++) {
    customersThisHour = Math.floor(Math.random()*(this.maxCustomers - this.minCustomers + 1) + this.minCustomers);
    this.customersByHour.push(customersThisHour);
  }
};
CreateLocation.prototype.generateSalesArray = function(){
  let cookiesSold;
  for (let i = 0; i < hours.length; i++) {
    cookiesSold = Math.floor(this.avgCookieSale * this.customersByHour[i]);
    this.salesByHour.push(cookiesSold);
  }
};
CreateLocation.prototype.generateTotalSales = function(){
  for (let i = 0; i < hours.length; i++) {
    this.totalSales += this.salesByHour[i];
  }
};

const seattle = new CreateLocation('Seattle',23,65,6.3);
storeLocations.push(seattle);
const tokyo = new CreateLocation('Tokyo',3,24,1.2);
storeLocations.push(tokyo);
const dubai = new CreateLocation('Dubai',11,38,3.7);
storeLocations.push(dubai);
const paris = new CreateLocation('Paris',20,38,2.3);
storeLocations.push(paris);
const lima = new CreateLocation('Lima',2,16,4.6);
storeLocations.push(lima);

for (let i = 0; i < storeLocations.length; i++) {
  storeLocations[i].generateCustomersArray();
  storeLocations[i].generateSalesArray();
  storeLocations[i].generateTotalSales();
}
let salesTable;
let main = document.getElementById('salesInfo');
for (let i = 0; i < storeLocations.length; i++) {
  salesTable = buildSalesDisplay(i);
  main.appendChild(salesTable);
}

// function generateLocationsArray(){
//   let seattle = {
//     locationName: 'Seattle',
//     minCustomers: 23,
//     maxCustomers: 65,
//     avgCookieSale: 6.3,
//     customersByHour: [],
//     salesByHour: [],
//     totalSales: 0,
//     generateCustomersArray: function(){
//       let customersThisHour;
//       for (let i = 0; i < hours.length; i++) {
//         customersThisHour = Math.floor(Math.random()*(this.maxCustomers - this.minCustomers + 1) + this.minCustomers);
//         this.customersByHour.push(customersThisHour);
//       }
//     },
//     generateSalesArray: function(){
//       let cookiesSold;
//       for (let i = 0; i < hours.length; i++) {
//         cookiesSold = Math.floor(this.avgCookieSale * this.customersByHour[i]);
//         this.salesByHour.push(cookiesSold);
//       }
//     },
//     generateTotalSales: function(){
//       for (let i = 0; i < hours.length; i++) {
//         this.totalSales += this.salesByHour[i];
//       }
//     }
//   };
//   let tokyo = {
//     locationName: 'Tokyo',
//     minCustomers: 3,
//     maxCustomers: 24,
//     avgCookieSale: 1.2,
//     customersByHour: [],
//     salesByHour: [],
//     totalSales: 0,
//     generateCustomersArray: function(){
//       let customersThisHour;
//       for (let i = 0; i < hours.length; i++) {
//         customersThisHour = Math.floor(Math.random()*(this.maxCustomers - this.minCustomers + 1) + this.minCustomers);
//         this.customersByHour.push(customersThisHour);
//       }
//     },
//     generateSalesArray: function(){
//       let cookiesSold;
//       for (let i = 0; i < hours.length; i++) {
//         cookiesSold = Math.floor(this.avgCookieSale * this.customersByHour[i]);
//         this.salesByHour.push(cookiesSold);
//       }
//     },
//     generateTotalSales: function(){
//       for (let i = 0; i < hours.length; i++) {
//         this.totalSales += this.salesByHour[i];
//       }
//     }
//   };
//   storeLocations.push(tokyo);
//   let dubai = {
//     locationName: 'Dubai',
//     minCustomers: 11,
//     maxCustomers: 38,
//     avgCookieSale: 3.7,
//     customersByHour: [],
//     salesByHour: [],
//     totalSales: 0,
//     generateCustomersArray: function(){
//       let customersThisHour;
//       for (let i = 0; i < hours.length; i++) {
//         customersThisHour = Math.floor(Math.random()*(this.maxCustomers - this.minCustomers + 1) + this.minCustomers);
//         this.customersByHour.push(customersThisHour);
//       }
//     },
//     generateSalesArray: function(){
//       let cookiesSold;
//       for (let i = 0; i < hours.length; i++) {
//         cookiesSold = Math.floor(this.avgCookieSale * this.customersByHour[i]);
//         this.salesByHour.push(cookiesSold);
//       }
//     },
//     generateTotalSales: function(){
//       for (let i = 0; i < hours.length; i++) {
//         this.totalSales += this.salesByHour[i];
//       }
//     }
//   };
//   storeLocations.push(dubai);
//   let paris = {
//     locationName: 'Paris',
//     minCustomers: 20,
//     maxCustomers: 38,
//     avgCookieSale: 2.3,
//     customersByHour: [],
//     salesByHour: [],
//     totalSales: 0,
//     generateCustomersArray: function(){
//       let customersThisHour;
//       for (let i = 0; i < hours.length; i++) {
//         customersThisHour = Math.floor(Math.random()*(this.maxCustomers - this.minCustomers + 1) + this.minCustomers);
//         this.customersByHour.push(customersThisHour);
//       }
//     },
//     generateSalesArray: function(){
//       let cookiesSold;
//       for (let i = 0; i < hours.length; i++) {
//         cookiesSold = Math.floor(this.avgCookieSale * this.customersByHour[i]);
//         this.salesByHour.push(cookiesSold);
//       }
//     },
//     generateTotalSales: function(){
//       for (let i = 0; i < hours.length; i++) {
//         this.totalSales += this.salesByHour[i];
//       }
//     }
//   };
//   storeLocations.push(paris);
//   let lima = {
//     locationName: 'Lima',
//     minCustomers: 2,
//     maxCustomers: 16,
//     avgCookieSale: 4.6,
//     customersByHour: [],
//     salesByHour: [],
//     totalSales: 0,
//     generateCustomersArray: function(){
//       let customersThisHour;
//       for (let i = 0; i < hours.length; i++) {
//         customersThisHour = Math.floor(Math.random()*(this.maxCustomers - this.minCustomers + 1) + this.minCustomers);
//         this.customersByHour.push(customersThisHour);
//       }
//     },
//     generateSalesArray: function(){
//       let cookiesSold;
//       for (let i = 0; i < hours.length; i++) {
//         cookiesSold = Math.floor(this.avgCookieSale * this.customersByHour[i]);
//         this.salesByHour.push(cookiesSold);
//       }
//     },
//     generateTotalSales: function(){
//       for (let i = 0; i < hours.length; i++) {
//         this.totalSales += this.salesByHour[i];
//       }
//     }
//   };
//   storeLocations.push(lima);
// }
function buildSalesDisplay(locationIndex){
  //use the document object to create an article element
  let article = document.createElement('article');
  let h2 = document.createElement('h2');
  h2.innerText = storeLocations[locationIndex].locationName;
  article.appendChild(h2);
  //sales list
  let ul = document.createElement('ul');
  for (let i = 0; i < hours.length; i++) {
    let li = document.createElement('li');
    li.innerText = `${hours[i]}: ${storeLocations[locationIndex].salesByHour[i]} cookies`;
    ul.appendChild(li);
  }
  let li = document.createElement('li');
  li.innerText = `Total: ${storeLocations[locationIndex].totalSales} cookies`;
  ul.appendChild(li);
  article.appendChild(ul);
  return article;
}
