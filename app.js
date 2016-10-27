/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');


app.use(bodyParser.json()); // support json encoded bodies


var dictionary;
var words = {};
var map = {};
fs.readFile('dictionary.json', 'utf8', function (err, data) {
    if (err) throw err;
    dictionary = JSON.parse(data);
    for(var word in dictionary){
        if(words[word.length]){
            words[word.length].push(word);
        }
        else{
            words[word.length] = [];
            words[word.length].push(word);;
        }
    }
    //createMap();
});

fs.readFile('map.json', 'utf8', function (err, data) {
    if (err) throw err;
    map = JSON.parse(data);
});

String.prototype.match = function(value){
    var count=0
    for(var i=0;i<this.length;i++){
        if(this[i]!=value[i])
            count++;
    }
    return count;
};

function findPossible(word,callback) {
    var length = word.length;
    var row = map[length][word];
    callback(row);

}



function createMap() {
    for(var i in words){
        map[i]={};
        var row = words[i];
        for(var j in row){
            var word = row[j];
            for(k=j;k<row.length;k++){
                var word2 = row[k];
                if(word.match(word2)==1){
                    if(map[i][word]){
                        map[i][word].push(word2);
                    }
                    else{
                        map[i][word]=[];
                        map[i][word].push(word2);
                    }

                    if(map[i][word2]){
                        map[i][word2].push(word);
                    }
                    else{
                        map[i][word2]=[];
                        map[i][word2].push(word);
                    }


                }
            }
        }
    }
}

var stack = [];
function findLedder(word1,word2,callback){
    stack.push(word1);
    findPossible(word1,function (row) {
        var index = row.indexOf(word2);
        if(row[index]){
            callback(stack);
        }
        else{
            for(var i in row){
                var temp = row[i];
                if(!stack[temp]){
                    setTimeout(findLedder,10,temp,word2,callback);
                }
            }
        }

    })
}

setTimeout(findLedder,4000,"COLD","WARM",function (data) {
    console.log(data);
});







app.use(express.static(__dirname + '/public'));


var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
    console.log("server starting on " + appEnv.url);
});




