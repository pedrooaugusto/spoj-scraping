const fs = require('fs');
const  scrap = require('./scrap');
const manipulate = {
	isUpToDate : function (data) {
		let past = data.ultimoUpdate;
		return ((new Date() - new Date(past))/(1000*60*60)) < 0;
	},
	loadDataBase : function (callback) {
		fs.readFile(__dirname+'/public/data/dados.txt', 'utf-8', function(err, data){
			if(!err){
				let bd = JSON.parse(data);
				if(manipulate.isUpToDate(bd)){
					callback(err, bd);
				}
				else{
					scrap.init(function (BD) {
						manipulate.saveDataBase(BD, {BD: BD, callback: callback});
					});
				}
			}
			else
				throw err;
		});
	},
	saveDataBase : function (data, params) {
		fs.writeFile(__dirname+'/public/data/dados.txt', JSON.stringify(data), function(err) {
    		if(err) {
        		return console.log(err);
    		}
    		else{
    			params.callback(null, params.BD);
    		}
		});
	}

}
module.exports = manipulate;