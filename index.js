const express = require('express');
const manage = require('./manageData');
const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.get('/', function (req, res) {
	res.render('index');
});
app.get('/json', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/json'});
	manage.loadDataBase(function (err, bd) {
		bd.list_users.sort((a, b)=>{
			return b.numero_problemas - a.numero_problemas;
		});
		res.write(JSON.stringify(bd, null, 1));
		res.end();
	});
});
app.listen(app.get('port'), function() {
	console.log('Rodando na porta ', app.get('port'));
});