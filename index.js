const express = require('express');
const manage = require('./manageData');
const app = express();

app.set('port', (process.env.PORT || 5000));
app.get('/', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	manage.loadDataBase(function (err, bd) {
		displayData(bd, res);
	});
});
app.get('/json', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	manage.loadDataBase(function (err, bd) {
		res.write("<pre>"+JSON.stringify(bd, null, 1)+"</pre>");
		res.end();
	});
});
app.listen(app.get('port'), function() {
	console.log('Rodando na porta ', app.get('port'));
});



/* front end quebra galho */
function displayData (data, res) {
	data.list_users.sort((a, b)=>{
		return b.numero_problemas - a.numero_problemas;
	});
	res.write("<html><meta charset='utf-8'><body>");
		res.write("<h2>UC_Rank: br.spoj.com</h2>");
		res.write("<h4>Arquivo: <a href='/json'>"+data.arquivo+"</a></h4>");
		res.write("<h4>Ultima Atualizacao: "+data.ultimoUpdate+" proxíma em 6 horas</h4>");
		res.write("<h4>Tempo de Load: "+data.tempoMontar+"ms</h4>");
		res.write("<h4>Total listados: "+data.list_users.length+"</h4>");
		for (let i = 0; i < data.list_users.length; i++) {
			if(i == 0)
				res.write("<details open>");
			else
				res.write("<details>");
			res.write("<summary>"+(i+1)+"º - "+data.list_users[i].usuario+" - "+data.list_users[i].numero_problemas+" problemas resolvidos</summary>");
			res.write("<ul type='none'>");
				for (let j = 0; j < data.list_users[i].problemas_solved.length; j++) {
					res.write("<li><a href='"+data.list_users[i].problemas_solved[j].url+"'>"+data.list_users[i].problemas_solved[j].name+"</a></li>");
				};
			res.write("</ul>");
			res.write("</details><br>");
	}
	res.write("</body><p>Created by Pedro Augusto</p><a href='https://github.com/pedrooaugusto/spoj-scraping'>GITHUB</a></html>");
	res.end();
}