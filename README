I'll start by assuming you are a bellringer or know what bellringing is.


# Introduction
This is a little project to experiment with ways of presenting blue lines and method tutorials (that would traditionally be printed on paper) in a way that takes advantage of the interactivity of modern web browsers and touchscreen devices.


# How to help
If you find errors or have suggestions then raise a bug report here, or email me. Here is the list of current bugs and suggestions.

If you are inspired to write your own guide and contribute it back to the project then please do! If you have the technical knowledge to follow the instructions below then go for it. If you don't then just email me your ideas/tutorials as text and I'll convert them.


# Workflow
## Non-Github Workflow
If you don't want to use Github then just download a zipped copy of the project to work with, follow the rest of the instructions to set-up the development environment and create your page, then just email me anything you want to contribute. I'll add them here.

## Github Workflow
An introduction to what “fork”, “push”, “pull” and “merge” mean in the next sentence is available here. Fork this repository, follow the instructions below to set up the development environment, write pages, (and test them!) then push changes back to your fork and raise a pull request for me to look at and merge into this repository.

# Developing

## Set-Up Development Environment

The project uses [Gulp](http://gulpjs.com/) to build and package up the files for distribution. Install it (after installing [Node.js](https://nodejs.org)) as per the instructions on its website.

Run `npm install`in the top folder of the project to install all the dependencies used during the build process.


## Building during development for testing
Run `gulp` in the top directory of the project to build the HTML files and deposit them in the `/dist` folder. Open these files in your browser to test.

Running `gulp watch` will start a task that watches for changes to source files and rebuilds automatically.


## Writing Pages
Writing pages requires a basic understanding of HTML and Javascript. See the file `/src/Cambridge_Surprise_Minor.html`  for an examples.

Once you've created `/src/YourFile.html' add it to the list at the top of `/gulpfile.json` so that it is covered by the build process.


## Distributing
The files resulting from the Gulp tasks could be hosted online and accessed with a web browser. You could also use Android's WebView or iOS's UIWebView to load the pages within an app (don't forget to enable Javascript).

I'll maintain a built version of the current project in the `gh-pages` branch of this repository, which automatically publishes it online.

I'll also integrate the pages into my Android app at some point. I don't have the hardware to produce/test an iOS app, but the pages can be added to the home screen as web applications. If you are interested in creating a native iOS app for this then go ahead, and drop me an email with any issues.