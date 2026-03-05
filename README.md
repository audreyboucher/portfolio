# Audrey Boucher's portfolio

In this repository, you'll find the code that's currently used on [my portfolio](https://www.audreyboucher.dev/).
This repository is meant as a small overview of the way I structure and code my React projects.

## Mockups

Additionally, the mockups are available on [Figma](https://www.figma.com/design/gg5eF6rQ0m0KwHf52zqwZq/Portfolio).
It's meant to showcase my skills as a UI/UX designer.

## To do

This is an unfinished project and here is still a lot of work to do:

### New content

- VAG Project:
  * Create mockups
  * Create new page

### Backend & Security

- Validate/sanitize contact payloads
- Enforce body size limits
- Return consistent error shapes for frontend handling
- Protect the form from robots

### Code improvements

- E2E Coverage:
  * Implement *Playwright*
  * Add core flows for home load, language switch & contact form submission
- CI/CD:
  * Add *GitHub Actions* pipelines for both frontend and backend on every PR

## Run the project locally

### Installation

```shell
$ npm install
$ npm --prefix ./server install
```

### Environment variables

In both the root folder and the ./server one, there is a `.env.example` file stating what environment variables are expected.
To run the project locally, rename it `.env.local` and adapt the variables in both of them with your own.

#### MongoDB

How to obtain the `MONGO_URI`:
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create/sign in to a project
- Create a cluster (free tier is fine)
- Create a database user (username + password) and keep the password
- In `Database > Clusters > Connect > Drivers`:
  * Choose the latest Node.js driver
  * Copy the connection string like: `mongodb+srv://<db_user>:<db_password>@portfolio.2qrigzj.mongodb.net/?appName=<app_name>`
  * Replace the password with the one previously stored
- Update the `MONGO_URI` env variable

#### Google App Password

The `EMAIL_USER` simply is your Gmail email address.
In order to use another mail client, update `createTransporter`'s `service` in [email.ts](./server/src/services/email.ts)
Here is the list of services that can be used: [Nodemailer's services](https://nodemailer.com/smtp/well-known-services#list-of-built-in-services)

How to obtain the `EMAIL_PASS` (with Google App Password):
- Open [Google Account Security](https://myaccount.google.com/security)
- Turn the 2-Step Verification on
- Go to [App Passwords](https://myaccount.google.com/apppasswords)
- Choose the app/device and click on `Generate`
- Update the `EMAIL_PASS` with the generated password

### Start

```shell
$ npm run dev
```

This action starts concurrently:
- the *React* project on [http://localhost:5173](http://localhost:5173)
- the server side (with *Express* & *MongoDB*) on [http://localhost:3000](http://localhost:3000)
- the *Storybook* on [http://localhost:6006](http://localhost:6006)

### Tests

There is a large coverage of unit test on the components, hooks and utility functions using *Vitest* & *React Testing Library*.
To run the tests, just launch the following command line:

```shell
$ npm run test
```

### Linter

In order to remain consistent throughout the project and avoid basic mistakes, I implemented a bunch of rules through *ESLint*.

```shell
$ npm run lint
```