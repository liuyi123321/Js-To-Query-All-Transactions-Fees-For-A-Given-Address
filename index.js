const express = require('express');
const app = express();

// ...

 let server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Your App is running at http://%s:%s', host, port);
});
const superagent= require('superagent');
require('superagent-proxy')(superagent)
var proxies = 'http://127.0.0.1:1087';
let tranall = []; //all transactions
let sum = 0;
let Count = 0;

apikey ='R5JSKSAAIH3QWPFAFQKBSFVUZ1QGXNZPK1'
myAddr ='0x4f7AD7F6379C34Ab6E662aa031688Ab83CBE358A'
url = 'https://api.etherscan.io/api?module=account&action=txlist&address='+myAddr+'&startblock=0&endblock=99999999&offset=10&sort=asc&apikey='+apikey
console.log("url:"+url)
superagent.get(url).proxy(proxies).end((err, res) => {
  if (err) {
    console.log(`fail - ${err}`)
  } else {
   console.log("success")
   tranall = getalltransactions(res)
   for (let tx of res.body.result){
        console.log("H_______________:")
        console.log(tx)
        Count = Count+1
        console.log(Number(tx.gasUsed)*Number(tx.gasPrice))
        sum = sum +Number(tx.gasUsed)*Number(tx.gasPrice)
   }
   console.log("=======")
   console.log("total tx fee:"+sum+" wei\ntotal tax number: "+Count)
   console.log("end")
  }
}); 
let getalltransactions = (res)=>{
    return res.body.result
};
app.get('/', async (req, res, next) => {
    res.send({
        "Sum tx fee is : ":sum,
        'total number of tx : ':Count,
        "all transactions :":tranall,
    });
  });
