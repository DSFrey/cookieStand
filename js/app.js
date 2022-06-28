/*
  File: app.js
  Author: Daniel Frey
*/
'use strict';

//Global Variables
const storeLocations = [];
const hours = ['6 am','7 am','8 am','9 am','10 am','11 am','12 pm','1 pm','2 pm','3 pm','4 pm','5 pm','6 pm','7 pm','8 pm'];
const trafficModifier = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
const hourlyTotals = [];
let grandTotalSales = 0;
const salesTable = document.createElement('table');

/**
 * @param {string} locationName - Name of store location
 * @param {number} min - Minimum customers in an hour
 * @param {number} max - Maximum costomers in an hour
 * @param {number} avgSales - Average cookies sold to each customer
 */
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
    customersThisHour = Math.floor(Math.random()*(this.maxCustomers - this.minCustomers + 1) + this.minCustomers) * trafficModifier[i];
    this.customersByHour.push(customersThisHour);
  }
};
CreateLocation.prototype.generateSalesArray = function(){
  let cookiesSold;
  for (let i = 0; i < hours.length; i++) {
    cookiesSold = Math.round(this.avgCookieSale * this.customersByHour[i]);
    this.salesByHour.push(cookiesSold);
  }
};
CreateLocation.prototype.generateTotalSales = function(){
  for (let i = 0; i < hours.length; i++) {
    this.totalSales += this.salesByHour[i];
  }
};
CreateLocation.prototype.buildTableRow = function(){
  let locationRow = document.createElement('tr');
  let locationCell = document.createElement('th');
  locationCell.setAttribute('scope','row');
  locationCell.innerText = this.locationName;
  locationRow.appendChild(locationCell);
  for (let i = 0; i < hours.length; i++) {
    let salesCell = document.createElement('td');
    salesCell.innerText = this.salesByHour[i];
    locationRow.appendChild(salesCell);
  }
  let totalLocationSales = document.createElement('td');
  totalLocationSales.setAttribute('class','total');
  totalLocationSales.innerText = this.totalSales;
  locationRow.appendChild(totalLocationSales);
  salesTable.appendChild(locationRow);
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
calculateHourlyTotals();
renderSalesTable();
// let salesTable;
// let parentElement = document.getElementById('salesInfo');
// for (let i = 0; i < storeLocations.length; i++) {
//   salesTable = buildSalesDisplay(i);
//   parentElement.appendChild(salesTable);
// }
function calculateHourlyTotals(){

  for (let i = 0; i < hours.length; i++) {
    let subTotal = 0;
    for (let ii = 0; ii < storeLocations.length; ii++) {
      subTotal += storeLocations[ii].salesByHour[i];
    }
    hourlyTotals.push(subTotal);
    grandTotalSales += subTotal;
  }
}
function renderSalesTable(){
  let parentElement = document.getElementById('displayTable');
  buildHeaderRow();
  for (let i = 0; i < storeLocations.length; i++) {
    storeLocations[i].buildTableRow();
  }
  buildFootRow();
  parentElement.appendChild(salesTable);
}
function buildHeaderRow(){
  let tableFirstRow = document.createElement('thead');
  let locationHeader = document.createElement('th');
  locationHeader.setAttribute('scope','col');
  locationHeader.innerText = 'Location';
  tableFirstRow.appendChild(locationHeader);
  for (let i = 0; i < hours.length; i++) {
    let tableHeader = document.createElement('th');
    tableHeader.setAttribute('scope','col');
    tableHeader.innerText = hours[i];
    tableFirstRow.appendChild(tableHeader);
  }
  let totalCell = document.createElement('th');
  totalCell.setAttribute('scope','col');
  totalCell.innerText = 'Total';
  tableFirstRow.appendChild(totalCell);
  salesTable.appendChild(tableFirstRow);
}
function buildFootRow(){
  let tableTotalRow = document.createElement('tfoot');
  let hourlyTotalCell = document.createElement('th');
  hourlyTotalCell.setAttribute('scope','row');
  hourlyTotalCell.innerText = 'Total';
  tableTotalRow.appendChild(hourlyTotalCell);
  for (let i = 0; i < hourlyTotals.length; i++) {
    let tableTotals = document.createElement('th');
    tableTotals.setAttribute('class','total');
    tableTotals.innerText = hourlyTotals[i];
    tableTotalRow.appendChild(tableTotals);
  }
  let grandTotalCell = document.createElement('th');
  grandTotalCell.setAttribute('class','total');
  grandTotalCell.innerText = grandTotalSales;
  tableTotalRow.appendChild(grandTotalCell);
  salesTable.appendChild(tableTotalRow);
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
// function buildSalesDisplay(locationIndex){
//   //use the document object to create an article element
//   let article = document.createElement('article');
//   let h2 = document.createElement('h2');
//   h2.innerText = storeLocations[locationIndex].locationName;
//   article.appendChild(h2);
//   //sales list
//   let ul = document.createElement('ul');
//   for (let i = 0; i < hours.length; i++) {
//     let li = document.createElement('li');
//     li.innerText = `${hours[i]}: ${storeLocations[locationIndex].salesByHour[i]} cookies`;
//     ul.appendChild(li);
//   }
//   let li = document.createElement('li');
//   li.innerText = `Total: ${storeLocations[locationIndex].totalSales} cookies`;
//   ul.appendChild(li);
//   article.appendChild(ul);
//   return article;
// }
