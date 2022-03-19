# Overview

This is the 4th project at [Udacity](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011) Front End Web Developer Nanodegree program.

This project aims to build a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. When a user submits a URL of an article, the web page dispalys sentiment analysis returned from [meaningcloud API](https://www.meaningcloud.com/products/sentiment-analysis), based on the contents of the article.

## Gettging Started

Download the files or clone the repo on your local machine.

Run the following command to install all the dependencies listed in the package.json file:

```
npm install
```

Start the local server:

```
$ npm run build-prod
$ npm run start
```

The app will be running in your browser on [localhost:8081](http://localhost:8081)

# API Key

Visit [here](https://www.meaningcloud.com/developer/) and register for an account. You will get you an API key once you sign up.

At the root of the project, create a new file named .env.
Inside the file, add the following line. Replacing the stars with your personal API key.

API_KEY=\***\*\*\*\*\*\*\***\*\*\***\*\*\*\*\*\*\***

# Development mode

After completing the steps above, open a second terminal and start the dev server:

```
$ npm run build-dev
```

The development version of the app will be running in your browser on [localhost:8080](http://localhost:8080)

# Test

This project has test files to check if the functions are working correctly. Testing is done with Jest.

Run the following command to run the tests:

```
$ npm run test
```

The results will be displayed on the terminal.
