### Min Kyu Jeon Take-Home Project

I built the MVP for this project! 

## How to set the project up:
From the root folder run `npm install`. 
- HOWEVER, one thing I ran into was that I was getting errors here. 
- I found out that the older version of `sqlite3` was causing errors on install (403 errors because there were some access restrictions on the install link). 
- What I did to fix this was change the version in `package.json` to `"sqlite3": "5.1.1" ` . 
- I then regenerated the `package-lock.json` by running `npm i --package-lock-only` and then `npm install`.
- No errors this time!

Now that that's done, run `cd comment-app` and run `npm install` to set up the react app.

## How to run the project
I modified the `npm start` script so we should be good with this one step.
- Run `npm run dev` in the root folder (`front-end-hw`). 

Navigate to http://localhost:3000/ and you should see the app! 

# Front-end Choose Your Own Adventure Take-Home

Design and build a comments feed that displays all comments and notifies a user in real-time when new comments are added.

Here is the data schema for a Comment:
* id: INTEGER
* name: TEXT
* created: DATETIME
* message: TEXT

Here are the API endpoints:
* Create a comment: /createComment (POST)
* Retrieve all comments: /getComments (GET)
* Retrieve a comment: /getComment (GET)
* Delete all comments: /deleteComments (DELETE)
  * This is useful for purging data

This is a basic wireframe, you can change the layout. While you won't be screened as a product designer, make sure you build a good user experience. If you decide to use a third-party design system, be prepared to discuss your decision.

![Basic wireframe](wireframe.png)

Please write unit tests and handle errors where you see fit.

## Engineering Style

We do not expect you to have expertise in all the topics that encapsulate front-end web development. We recognize that some folks are specialists and others are generalists!

### Specialist

If there's a particular topic you enjoy, you can focus your assignment solution on that!

Some examples include:
* Performance optimizations
* Accessibility
* Integration testing

### Generalist

If you're a generalist, you can focus more on building the minimum viable product described above with the wireframe!

## Interview Details

We have already set up an API client for a Node Express server that stores comments in SQLite.

You have the option of doing the assignment with or without a front-end JS framework.

If you decide to use a framework, we recommend the following boilerplates:
* [facebook/create-react-app](https://github.com/facebook/create-react-app)
* [vuejs/vue-cli](https://github.com/vuejs/vue-cli)
* [angular/angular-cli](https://github.com/angular/angular-cli)
* [ember-cli/ember-cli](https://github.com/ember-cli/ember-cli)

Be prepared to have a discussion about your implementation. Here are some example discussion questions:
* How can you optimize fetching new comments in real-time?
* Are there any restrictions we should place on the comment input?

We recommend spending up to four hours on this assignment. If you don't get every piece you hoped completed done in the timeframe, that's alright! We'll be having an hour long discussion on your thought processes and where you might spend more time, and that discussion is a key part of our evaluation!

## Usage

### Run in Development

```
$ npm install
$ npm run dev
```
