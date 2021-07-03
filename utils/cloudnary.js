const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDNARY_API_KEY,
    api_secret:process.env.CLOUDNARY_API_SECRET,
});

exports.uploads=(file,folder)=>{
    return new Promise(resolve=>{
        cloudinary.uploader.upload(file,(result)=>{
            resolve({
                url:result.url,
                id:result.id
            })
        },{
            resource_type:"auto",
            folder:folder
        })
    })
}
