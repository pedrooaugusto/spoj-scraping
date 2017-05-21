var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

var list_users = [];
const names = 
	['uc_pierry', 'uc_henrique', 'uc_brenda'];/*,'uc_pedroaug',
		'uc_bruno', 'uc_yasmin', 'uc_ramon', 'uc_renatomoran',
		'uc_philipemosv', 'uc_luiz', 'uc_joicepaz'];*/
function showData(resp, totalTime) {
	list_users.sort((a, b)=>{
		return b.numero_problemas - a.numero_problemas;
	});
	resp.write("<html><meta charset='utf-8'><body>");
	for (let i = 0; i < list_users.length; i++) {
		resp.write("<details>");
		resp.write("<summary>"+(i+1)+"º - "+list_users[i].usuario+" - "+list_users[i].numero_problemas+" problemas resolvidos</summary>");
		resp.write("<ul type='none'>");
		for (let j = 0; j < list_users[i].problemas_solved.length; j++) {
			resp.write("<li><a href='"+list_users[i].problemas_solved[j].url+"'>"+list_users[i].problemas_solved[j].name+"</a></li>");
		};
		resp.write("</ul>");
		resp.write("</details><br>");
	};
	resp.write("<h3>Total Time: "+totalTime+" ms</h3>");
	resp.write("</body></html>");
	resp.end();
}
function requisitar(i, resp, begin_time) {
	request("http://br.spoj.com/users/"+names[i]+"/", function (err, res, htm) {
		if(!err){
			let user = {usuario: names[i], numero_problemas : '', problemas_solved: []};
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
			if(i <= (names.length - 1)){
				list_users.push(user);
				i+=1;
				requisitar(i, resp, begin_time);
			}
			else{
				showData(resp, (new Date().getTime() - begin_time));
			}
		}
	});
}
app.set('port', (process.env.PORT || 5000));
app.get('/', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	list_users = [];
	requisitar(0, res, new Date().getTime());
	//res.write("<h1>Hello</h1>");
	//res.end();
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});