# Finnplay Test Task for Front-End Developer

This project is a web application built with React on the front-end and Node.js on the back-end. It allows users to
filter and browse through a collection of games based on various criteria. The application features user authentication,
game filtering, and a responsive design optimized for different screen sizes.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running](#running)
- [Usage](#usage)
- [Contact](#contact)

## Features

- User Authentication
- Game Filtering by Providers, Groups, and Sorting Options
- Responsive Design
- Notifications for User Actions

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js LTS (v20.XX.X), npm, and yarn.
- You have installed a code editor like VS Code (Webstorm, Sublime).
- You have a terminal or command-line tool installed.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/tiwehub/finnplay-prod.git
```

2. Navigate to the project directory:

```bash
cd finnplay-prod
```

3. Install the dependencies for both the server and client:

```bash
yarn install
```

## Running

To start the Node.js server and client, follow these steps:

1. Start the server:

```bash
node --import ./register-esm-loader.js server/server.ts
```

2. Start the front-end:

```bash
yarn run dev
```

The server will start running on `http://localhost:5000`.  
The front-end will start running on `http://localhost:3000`.

## Usage

After starting both the server and client, open your browser and navigate to `http://localhost:3000` to access the
application.

You can log in with your credentials, filter games by providers and groups, and use the sorting options to arrange the
games as you prefer.

## Contact

If you have any questions or feedback, feel free to reach out:

- Email: [tiwehub@gmail.com](mailto:tiwehub@gmail.com)
- GitHub: [tiwehub](https://github.com/tiwehub)
