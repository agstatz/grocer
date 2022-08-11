# Grocer

Search meals, order ingredients fast and simple using grocer, a one stop shop for getting the groceries you need fast.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), among other dependencies.

## Development Instructions

In the project directory, to load necessary dependencies for local development, do as follows:

`cd .\react-electron\`

`yarn install`

To start up a development instance, enter the following commands

`cd react-electron`

`yarn electron:serve`

To package a distributable application, enter the following commands.
This obviously may take a while to run.

`cd react-electron`

`yarn electron:build`

## Additional Notes

This project uses Google Sheets API as a backend since the project is relatively small in scope.
If you wish to use your own google sheet as a database, look into [sheet.best](https://sheet.best),
as well as the google sheet used in the project in order to format everything correctly.
