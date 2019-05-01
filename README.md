# Memeary

Memeary is a website that takes in data from a database and displays that data in a organized and readable way. Memeary is used as an educational tool to help understand sequelize and working with a database. 

## Usage
 The Memes are listed one page so all the user needs to do is scroll down. Once at the bottom you are greeted with an option to smooth scroll back to the top of the page. 

## Create Meme

The user can create a Meme (located in the top right of the website) and this data is stored in the database to be used in the homepage. The data is then loaded onto the website and users can click on the Meme they just created to see the data of that Meme.

The Meme cards also show a `like` and `dislike` feature where the user can choose if they like the Meme or not. This data is only allowed to be pressed once and when pressed, it will be added to the database. 

Each new Meme created can also be deleted from the database with the simple `x` located in the cards of each Meme. 

## Technologies Utilized 

* NodeJs
* JavaScript
* MySql
* Sequelize
* DotEnv
* ExpressJs
* Handlebars
