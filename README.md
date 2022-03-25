# FileUpload

FileUpload is an app which lets a user store images on cloud storage.

Steps
1. Create a config.env file inside server folder and include
DB=mongodb+srv://yourid:yourpassword@cluster0.w0pvc.mongodb.net/filesafe?retryWrites=true&w=majority

PORT=Pornt number you wish to use

SECRET=your secret for hashing

2. Create a cloudinary.js file inside server folder and include

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:'name you chose',
    api_key:your api key,
    api_secret:'your api secret'
});

module.exports = {cloudinary}

3. Now do npm install for both client and server folders.
4 use nodemon server.js inside server folder and npm start inside client folder
