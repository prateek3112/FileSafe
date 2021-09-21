const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:'prateek3112',
    api_key:659695968646242,
    api_secret:'xR8F39ylM78H6f8-6RXWGD0smzY'
});

module.exports = {cloudinary}