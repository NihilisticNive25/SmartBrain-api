const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: 'acf78668648841b79c3d305cdd4eb748'
});

var exports = module.exports = {};

exports.handleApiCall = (req,res) => {
	console.log('img url', req.body.input)
	app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input)
   .then(data => {
   	 res.json(data)
   })
   .catch(err => res.status(400).json(err))
}

exports.handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id' , '=' , id)
	.increment(	'entries' , 1)
	.returning('*')
	.then(entries => {
		if(entries){
			db.select('entries').from('users').where({ id }).then(data => {
				res.json(data[0].entries);
			})
		}
	})
	.catch(err => res.status(400).json('unable to get entries'))
}