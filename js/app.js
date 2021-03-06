/*
  File: app.js
  Author: Daniel Frey
*/
'use strict';

//Global Variables
const storeLocations = [];
const hours = ['6 am','7 am','8 am','9 am','10 am','11 am','12 pm','1 pm','2 pm','3 pm','4 pm','5 pm','6 pm','7 pm','8 pm'];
const trafficModifier = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
let hourlyTotals = [];
let grandTotalSales = 0;
let salesTable = document.getElementById('displayTable');
const dataSubmission = document.getElementById('dataSubmission');

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
  this.customersByHour = [];
  let customersThisHour;
  for (let i = 0; i < hours.length; i++) {
    customersThisHour = Math.floor(Math.random()*(this.maxCustomers - this.minCustomers + 1) + this.minCustomers) * trafficModifier[i];
    this.customersByHour.push(customersThisHour);
  }
};
CreateLocation.prototype.generateSalesArray = function(){
  this.salesByHour = [];
  let cookiesSold;
  for (let i = 0; i < hours.length; i++) {
    cookiesSold = Math.round(this.avgCookieSale * this.customersByHour[i]);
    this.salesByHour.push(cookiesSold);
  }
};
CreateLocation.prototype.generateTotalSales = function(){
  this.totalSales = 0;
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

let seattle = new CreateLocation('Seattle',23,65,6.3);
storeLocations.push(seattle);
let tokyo = new CreateLocation('Tokyo',3,24,1.2);
storeLocations.push(tokyo);
let dubai = new CreateLocation('Dubai',11,38,3.7);
storeLocations.push(dubai);
let paris = new CreateLocation('Paris',20,38,2.3);
storeLocations.push(paris);
let lima = new CreateLocation('Lima',2,16,4.6);
storeLocations.push(lima);
initialize();

function initialize() {
  for (let i = 0; i < storeLocations.length; i++) {
    storeLocations[i].generateCustomersArray();
    storeLocations[i].generateSalesArray();
    storeLocations[i].generateTotalSales();
  }
  calculateHourlyTotals();
  renderSalesTable();
}

function calculateHourlyTotals(){
  hourlyTotals = [];
  grandTotalSales = 0;
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
  salesTable.innerHTML = '';
  buildHeaderRow();
  for (let i = 0; i < storeLocations.length; i++) {
    storeLocations[i].buildTableRow();
  }
  buildFootRow();
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

dataSubmission.addEventListener('submit',updateLocationData);
function updateLocationData(evt) {
  evt.preventDefault();
  let isNewLocation = true;
  let locationName = document.getElementById('locationName').value;
  let minCustomers = parseInt(document.getElementById('minCustomers').value);
  let maxCustomers = parseInt(document.getElementById('maxCustomers').value);
  let avgCookieSale = parseInt(document.getElementById('avgCookieSale').value);
  if(minCustomers > maxCustomers) {
    alert('Minimum customers cannot be greater than maximum customers');
    return;
  }
  for (let i = 0; i < storeLocations.length; i++) {
    if(storeLocations[i].locationName === locationName) {
      storeLocations[i].minCustomers = minCustomers;
      storeLocations[i].maxCustomers = maxCustomers;
      storeLocations[i].avgCookieSale = avgCookieSale;
      isNewLocation = false;
      break;
    }
  }
  if (isNewLocation) {
    let newLocation = new CreateLocation(locationName,minCustomers,maxCustomers,avgCookieSale);
    storeLocations.push(newLocation);
  }
  initialize();
}
