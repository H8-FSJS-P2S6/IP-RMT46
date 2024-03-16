const { Proof } = require("../models");

const cloud_name = process.env.cloud_name;
const api_key = process.env.api_key;
const api_secret = process.env.api_secret;

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

class ProofController {
  static async createProof(req, res,next){
	  try {
	  if (!req.file) throw { name: "CustomError", status: 400, message: "Image is required" };
	      
	        const mimetype = req.file.mimetype;
	        const data = Buffer.from(req.file.buffer).toString('base64');
	        const dataURI = `data:${mimetype};base64,${data}`;
	        
	        const result = await cloudinary.uploader.upload(dataURI, {
			          public_id: "poke",
			      });

	        const proof = await Proof.findByPk(req.params.id);
	        if (!proof) throw { name: "NotFound" };

	        await proof.create({ imgUrl: result.secure_url });
	        res.status(201).json({ message: `Image successfully created` });
    } catch (error) {
      next(error);
 }
  }}
module.exports = ProofController;
