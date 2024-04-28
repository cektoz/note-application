# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Note Application

This is a simple note-taking application built using React for the frontend and Node.js with Express for the backend. It allows users to create, read, update, and delete notes.


## Features

**Create Note:** Users can create a new note by providing a title and content.  <br />
**View Notes:** Users can view a list of all notes with their titles, content, and creation dates. <br />
**Update Note:** Users can edit the title and content of an existing note. <br />
**Delete Note:** Users can delete a note they no longer need. <br />

## Technologies Used

**Frontend:** React, React Router DOM, Material-UI  <br />
**Backend:** Node.js, Express, Sequelize (ORM for PostgreSQL)  <br />
**Database:** PostgreSQL  <br />
**HTTP Requests:** Axios  <br />

### Running the program

```
git clone https://github.com/cektoz/note-application.git
cd note-application
```

```
npm install
```

in the terminal run the server.js with nodemon

```
nodemon backend/server.js 
```
http://localhost:4000

open a new terminal and start the app

```
npm start
```
Local:   http://localhost:5173/



