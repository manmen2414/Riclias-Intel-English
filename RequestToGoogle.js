
require("dotenv").config();
const https = require("https")
const SCRIPT_ID = process.env.SCRIPT_ID
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
/**
 * main関数
 */
async function main() {
    return new Promise(async (resolve, reject) => {
        try {
            // アクセストークンを取得する(Promise)
            const accessToken = await getAccessToken().then(function (res) {
                return res
            }).catch(reject)

            // GASを実行
            const url = `https://script.googleapis.com/v1/scripts/${SCRIPT_ID}:run`;
            const data = JSON.stringify({
                function: 'myFunction'
            });
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            let chunks = "";
            const reque = https.request(url, options, res => {
                res.on('data', (chunk) => {
                    chunks += chunk;
                });
                res.on("end", () => {
                    const response = JSON.parse(chunks)
                    if ("error" in response)
                        reject(response.error + ": " + response.details.errorMessage)
                    else {
                        resolve(response.response.result)
                    }
                })
            });
            reque.write(data)
            reque.end()
        } catch (e) {
            reject(e)
        }
    })
}
/**
 * アクセストークンを取得する関数
 * @return string
 */
async function getAccessToken() {
    return new Promise(function (resolve, reject) {
        try {
            const data = JSON.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                refresh_token: REFRESH_TOKEN,
                grant_type: 'refresh_token',
            });
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const reque = https.request("https://oauth2.googleapis.com/token", options, (res) => {
                // console.log(res)
                res.on('data', (chunk) => {
                    let access_token = JSON.parse(chunk.toString())
                    resolve(access_token.access_token)
                })
            }).on("error", reject)
            reque.write(data)
            reque.end()
        } catch (ex) {
            reject(ex)
        }
    })
}
module.exports = main;