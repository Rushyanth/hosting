var express = require('express');
var router = express.Router();
var http = require('http');
var HashMap = require('hashmap');
var mysql = require('mysql');
var map = new HashMap();
var incorans=new HashMap();
var corans=new HashMap();
var json = require('json-object');
var map2 = new HashMap();
var qu={};
/* GET home page. */
router.get('/', function (req, res, next) {
    if(!req.session.que) req.session.que={};
    if(!req.session.corans) {
        corans=new HashMap();
        req.session.corans=corans;
    }
    var rn=req.session.rano;
    var correctans = req.session.cora;
    var a = parseInt(req.query.num);
    var n = a + 1;
    var ans = parseInt(req.query.q);
    map.set(a, ans);
    var key = map.keys();
    var value = map.values();
    if(!req.session.score) req.session.score =0;
    for (var i = 0; i < req.session.qlimit; i++) {
        if(i+1===a){
            map2.set(rn[i],ans);
            req.session.qu=map2;
            req.session.que[rn[i].toString()]=ans.toString();
            console.log(req.session.que);
            // qu[rn[i].toString()]=ans.toString();
            // req.session.que=qu;
        }
        if (a === key[i] && value[i] === correctans[i]) {
            console.log("correct");
            corans.set(a, correctans[i]);
            req.session.corans=corans;
            req.session.score=corans.count();
            console.log(req.session.corans);
        }
        else if(a === key[i] ){
            console.log("incorrect");
            incorans.set(a, correctans[i]);
            req.session.incorrectmap=incorans;
        }

    }
    res.redirect("/test?questionnumber=" + n);
});

module.exports = router;