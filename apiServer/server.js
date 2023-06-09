const express = require('express'); 
const app = express();
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'ls-414dd39cdb7215ba67853172200804032eca5c10.cjlhhn5kbuqa.ap-northeast-2.rds.amazonaws.com',
  user     : 'root',
  password : '00000000',
  database : 'dogListApi'
});

connection.connect();
app.get('/list', function (req, res) {
    let targetQuery = req.query;
    let column = ['date','location','idx','breed','age','dataFrom'];
    let targetKey = Object.keys(targetQuery);
    let selectQuery = 'SELECT * FROM dogList';
    let whereQuery = 'WHERE ';
    let whereFlag = false;
    for(let i = 0; i<targetKey.length;i++){
        if(column.includes(targetKey[i])){
            whereFlag = true
            console.log(targetKey[i],targetQuery[targetKey[i]])
            if(whereQuery.length>6){
                whereQuery += ' AND '
            }
            if(targetKey[i]==='idx'){
                whereQuery += targetKey[i] + '='
                whereQuery += targetQuery[targetKey[i]]
            }else{
                whereQuery += targetKey[i] + '='
                whereQuery += '"'+targetQuery[targetKey[i]]+'"'
            }
        };
    }
    if(whereFlag){
        selectQuery += " " + whereQuery;
    };
    
    connection.query(selectQuery, (error, rows, fields) => {
        if (error) throw error;
        console.log(rows);
        res.send(JSON.stringify(rows)); 
    });

}); 
// connection.end();
app.listen(2080, function() {
    console.log('listening on 2080')
})