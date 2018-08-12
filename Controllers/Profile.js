var exports = module.exports = {};

 exports.handleProfile = (req, res, db) => {
 const {id} = req.params;
	
	db.select('*').from('users').where({ id }).then(data => {
		if(data.length){
			res.json(data);
		}
		else{
			res.status(400).json('no such user');
		}
	}).catch(err => res.status(400).json('error getting user'))
}