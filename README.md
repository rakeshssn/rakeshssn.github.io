# YOUTUBE ANALYTICS Dashboard - CAVINKARE

## Overview

### Who is the website for?
The current version of the website is for people who have an interest in the property market in South Dublin. 
This includes persons looking to buy or sell there home, property auctioneers or builders looking to flip a property.

### What does it do?
This website gives a graphical representation of YOUTUBE ingredient List in the form of an interactive data dashboard.  
It allows the user to filter on data points of interest to them. The user can select data in one chart to apply a filter to all charts on the dashboard. 


## Building the Website
### Obtaining the Dataset


### Displaying the Dataset  
The dataset is displayed as a dashboard of interactive charts. This was done using a mix of technologies.  
The website is styled with **Bootstrap**.  
The charts are drawn and made interactive using **D3.js**, **dc.js** and **Crossfilter.js**. 
**queue.js** is also utilised to ensure that the dataset is loaded before the browser creates the charts.

- [**Bootstrap**](https://getbootstrap.com/) - Front-end framework for faster and easier web development  
- [**D3.js**](https://d3js.org/) - JavaScript library for manipulating documents based on data using HTML, SVG, and CSS  
- [**dc.js**](https://dc-js.github.io/dc.js/) - Javascript charting library with native crossfilter support. . It leverages D3.js to render charts in CSS-friendly SVG format.
- [**Crossfilter.js**](http://square.github.io/crossfilter/) - JavaScript library for multidimensional filtering and aggregation of tabular data.

## Folders and Files Structure

- **./docs**  
    Contains documentation files to support the ReadMe
- **./static**
    - **/css**  
    Contain css styling files
    - **/images**  
    Contains images displayed on the website
    - **/js**  
    Contains all javascript files for the website
- **./index.html**

## Installation


## Deployment and Hosting
This website was deployed using apache server and MS visual code.

## Testing
This Application was tested manually across a range of browsers on multiple devices.  


## UX
This website has been developed to be used in desktop only.  
It was also thought that some of the charts may be difficult to interact with on a small screen.  
The visual aspect of this website was designed to be clean and simple.  

### Colour and Images

As desired and obtained for the sources.

### User Flow
The webpage is split into two halves. Using a full width image for the division.  

The first section of the dashboard is a set of pie charts and bar charts that the user clicks on to apply a filtered search to what they are looking for. Once the user has chosen their filters they scroll down to the second section.

Here thet will find several charts that give them information of the ingrediets available. Here is a short description of each chart: 

##### Claims Row chart

##### Average Ingredient views
Gives an average views for the filtered selection.

##### Bubble Chart (What is the Average House Price for an Area?)
This is a 4 dimensional chart, although only 3 dimensions are utilised.
This is a useful chart for getting a quick visual representation of the average house price of each area.  
1st dimension: Y axis, number of ingredients listed  
2nd dimension: X axis, average views count  
3rd dimension: bubble, ingredient area  

##### Table
Shows a table of the filtered properties.  
There is a link to view the video on www.youtube.com. 
