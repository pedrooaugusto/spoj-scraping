const request = require('request');
const cheerio = require('cheerio');
const NAMES = ['uc_pierry', 'uc_henrique', 'uc_brenda','uc_pedroaug',
		'uc_bruno', 'uc_yasmin', 'uc_ramon', 'uc_renatomoran',
		'uc_philipemosv', 'uc_luiz', 'uc_joicepaz', 'uc_brunolima'];
var BD = {
	arquivo : "dados.txt",
	ultimoUpdate : "2017-5-21 00:00:00",
	tempoMontar: 0,
	list_users : []
};
/*
	OBJ:
	{
		name_archive: 'data.txt',
		latest_update: '2017-5-21 00:00:00',
		time_loading: 21040,
		data: []
	}
*/
const scrap = {
	requisitar: function(i, callback, begin_time){
		console.log("here: "+i);
		request("http://br.spoj.com/users/"+NAMES[i]+"/", function (err, res, htm) {
			if(!err)
			{
				let user = {usuario: NAMES[i], numero_problemas : 0, problemas_solved: []};
				let $ = cheerio.load(htm);
				let listaProblemas = [];
				let table = $("#content table:first-of-type");
				table.find("tr").each(function (i, element) {
					$(element).find("td").each(function (i, a) {
						let txt = $(a).children().first().text();
						if(txt != "")
							listaProblemas.push({name : txt, url: "http://br.spoj.com/problems/"+txt+"/"});
					});
				});
				user.numero_problemas = listaProblemas.length;
				user.problemas_solved = listaProblemas;
				if(i <= (NAMES.length - 1)){
					BD.list_users.push(user);
					i+=1;
					scrap.requisitar(i, callback, begin_time);
				}
				else{
					BD.ultimoUpdate = new Date().toLocaleString();
					BD.tempoMontar = new Date().getTime() - begin_time;
					callback(BD);
				}
			}
		});
	},
	init: function (callback) {
		BD = {	
			arquivo : "dados.txt",
			ultimoUpdate : "2017-5-21 00:00:00",
			tempoMontar: 0,
			list_users : []
		};
		scrap.requisitar(0, callback, new Date().getTime());
	}
};
module.exports = {init: (callback)=> {return scrap.init(callback);}};