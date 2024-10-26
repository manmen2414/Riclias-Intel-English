const requestToGoogle = require("./RequestToGoogle");
const CSV = require("./csv");
const fs = require("fs");
console.clear();
console.log("Googleスプレッドシートからデータを問い合わせます...")

const stdin = (() => {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var lines = [];; //標準入力から受け取ったデータを格納する配列
    var reader = require('readline').createInterface({　//readlineという機能を用いて標準入力からデータを受け取る
        input: process.stdin,
        output: process.stdout
    });
    reader.on('line', (line) => {　//line変数には標準入力から渡された一行のデータが格納されている
        lines.push(line);　//ここで、lines配列に、標準入力から渡されたデータが入る
    });
    reader.on('close', () => {　//受け取ったデータを用いて処理を行う
        return lines.join("\n")
    })
})()

requestToGoogle().then((_data) => {
    const csv = CSV.makeFromCSV(_data);
    if (fs.existsSync("./data.csv"))
        fs.readFileSync("./data.csv")
    fs.writeFileSync("./data.csv", csv.toString());
    console.log("取得成功！")
}).catch(er => {
    console.error(er);
    console.log("取得に失敗しました...");
    if (fs.existsSync("./data.csv"))
        console.log("既存のデータを利用します。")
    else
        console.error("データがないため、翻訳を行えません。")
})

console.log(stdin)
console.log(stdin)