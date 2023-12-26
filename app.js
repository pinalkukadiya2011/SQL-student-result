var mysql  = require('mysql');
const express = require('express')


var bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'student_result'
});
  
  connection.connect();


var app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }))



 
app.get('/',function(req,res){
    var insert = "select * from stu_res";
    connection.query(insert, function (error, results, fields) {
        if (error) throw error;
         res.render("index",{results});
      });
})
app.post('/' ,function(req,res){
  var name = req.body.name;
  var sub1 = parseInt(req.body.sub1);
  var sub2 = parseInt(req.body.sub2);
  var sub3 = parseInt(req.body.sub3);
  var sub4 = parseInt(req.body.sub4);
  var sub5 = parseInt(req.body.sub5);

  var total = sub1 + sub2 + sub3 + sub4 + sub5;
  var avg = total/5;
  var max;
  var min;
  if(sub1 > sub2 && sub1 > sub3 && sub1 > sub4 && sub1 > sub5){
    max = sub1
  }
  else if(sub2 > sub3 && sub2 > sub4 && sub2 > sub5 ){
    max = sub2
  }
  else if(sub3 > sub4 && sub3 > sub5 ){
    max = sub3
  }
  else if( sub4 > sub5 ){
    max = sub4
  }
  else{
    max = sub5
  }


  if(sub1 < sub2 && sub1 < sub3 && sub1 < sub4 && sub1 < sub5){
    min = sub1
  }
  else if(sub2 < sub3 && sub2 < sub4 && sub2 < sub5 ){
    min = sub2
  }
  else if(sub3 < sub4 && sub3 < sub5 ){
    min = sub3
  }
  else if( sub4 < sub5 ){
    min = sub4
  }
  else{
    min = sub5
  }

  var status;
  var temp=0;
  if(sub1<33){
    temp++;
  }
  if(sub2<33){
    temp++;
  }
  if(sub3<33){
    temp++;
  }
  if(sub4<33){
    temp++;
  }
  if(sub5<33){
    temp++;
  }
  if(sub1>33 && sub2>33 && sub3>33 && sub4>33 && sub5>33)
  {
    status="PASS";
  }
  else if(temp==3 || temp==2){
    status="ATKT";
  }
else{
  status="FAIL";
}

  
  var insert = "insert into stu_res (name,sub1,sub2,sub3,sub4,sub5,total,avg,max,min,status) values ('"+name+"','"+sub1+"','"+sub2+"','"+sub3+"','"+sub4+"','"+sub5+"','"+total+"','"+avg+"','"+max+"','"+min+"','"+status+"')";
  connection.query(insert, function (error, results, fields) {
      if (error) throw error;
       res.redirect("/");
    });
})
app.get('/delete/:r_no',function(req,res){
  var r_no = req.params.r_no;
  var delete1 = "delete from stu_res where r_no="+r_no;
  connection.query(delete1, function (error, results, fields) {
      if (error) throw error;
      res.redirect("/");
    });
})
app.get('/update/:r_no',function(req,res){
  var r_no = req.params.r_no;
  var update = "select * from stu_res where r_no="+r_no;
  connection.query(update, function (error, results, fields) {
      if (error) throw error;
      res.render("update",{results});
    });
})
app.post('/update/:r_no',function(req,res){
  var r_no = req.params.r_no;
  var name = req.body.name;
  var sub1 = parseInt(req.body.sub1);
  var sub2 = parseInt(req.body.sub2);
  var sub3 = parseInt(req.body.sub3);
  var sub4 = parseInt(req.body.sub4);
  var sub5 = parseInt(req.body.sub5);

  var total = sub1 + sub2 + sub3 + sub4 + sub5;
  var avg = total/5;

  var max;
  var min;
  if(sub1 > sub2 && sub1 > sub3 && sub1 > sub4 && sub1 > sub5){
    max = sub1
  }
  else if(sub2 > sub3 && sub2 > sub4 && sub2 > sub5 ){
    max = sub2
  }
  else if(sub3 > sub4 && sub3 > sub5 ){
    max = sub3
  }
  else if( sub4 > sub5 ){
    max = sub4
  }
  else{
    max = sub5
  }


  if(sub1 < sub2 && sub1 < sub3 && sub1 < sub4 && sub1 < sub5){
    min = sub1
  }
  else if(sub2 < sub3 && sub2 < sub4 && sub2 < sub5 ){
    min = sub2
  }
  else if(sub3 < sub4 && sub3 < sub5 ){
    min = sub3
  }
  else if( sub4 < sub5 ){
    min = sub4
  }
  else{
    min = sub5
  }
  

  var status;
var temp=0;
  if(sub1<33){
    temp++;
  }
  if(sub2<33){
    temp++;
  }
  if(sub3<33){
    temp++;
  }
  if(sub4<33){
    temp++;
  }
  if(sub5<33){
    temp++;
}
  if(sub1>33 && sub2>33 && sub3>33 && sub4>33 && sub5>33)
  {
    status="PASS";
  }
  else if(temp==3 || temp==2){
    status="ATKT";
  }
   else{
    status="FAIL";
   }
  

  
  var update = "update stu_res SET  name='"+name+"',sub1='"+sub1+"',sub2='"+sub2+"',sub3='"+sub3+"',sub4='"+sub4+"',sub5='"+sub5+"', total='"+total+"', avg='"+avg+"',max='"+max+"',min='"+min+"',status='"+status+"' WHERE r_no="+r_no;
  connection.query(update, function (error, results, fields) {
      if (error) throw error;
       res.redirect("/");
    });
})

app.get('/top',function(req,res){
  var top = "SELECT * FROM stu_res WHERE avg>33 AND status='PASS' ORDER BY avg DESC LIMIT 5 ";
  connection.query(top, function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.render("top",{results});
    });
})
app.get('/fail',function(req,res){
  var fail = "SELECT * FROM stu_res WHERE status='FAIL'";
  connection.query(fail, function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.render("top",{results});
    });
})
app.get('/pass',function(req,res){
  var pass = "SELECT * FROM stu_res WHERE status='PASS'";
  connection.query(pass, function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.render("top",{results});
    });
})
app.get('/atkt',function(req,res){
  var atkt = "SELECT * FROM stu_res WHERE status='ATKT'";
  connection.query(atkt, function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.render("top",{results});
    });
})





app.listen("3000");