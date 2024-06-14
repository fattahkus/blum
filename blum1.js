import fetch from "node-fetch";
import delay from "delay";
import fs from 'fs'
import moment from 'moment';
import { setTimeout } from 'timers/promises';

const getToken = (query) =>
  new Promise((resolve, reject) => {
    fetch("https://gateway.blum.codes/v1/auth/provider/PROVIDER_TELEGRAM_MINI_APP", {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,id;q=0.8",
        "content-type": "application/json",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Google Chrome\";v=\"112\", \"Chromium\";v=\"112\", \"Not=A?Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
      },
      referrer: "https://telegram.blum.codes/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `{\"query\":\"${query}\"}`,
      method: "POST",
      mode: "cors",
      credentials: "omit"
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

const RefreshToken = (bearer) =>
    new Promise((resolve, reject) => {
      fetch("https://gateway.blum.codes/v1/auth/refresh", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Chromium\";v=\"124\", \"Microsoft Edge\";v=\"124\", \"Not-A.Brand\";v=\"99\", \"Microsoft Edge WebView2\";v=\"124\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        body: JSON.stringify({
          refresh: bearer // Menghilangkan spasi di awal dan akhir token
        }),
        referrer: "https://telegram.blum.codes/",
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
const CheckBalanceClaim = (bearer) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/user/balance", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "sec-ch-ua": "\"Chromium\";v=\"124\", \"Microsoft Edge\";v=\"124\", \"Not-A.Brand\";v=\"99\", \"Microsoft Edge WebView2\";v=\"124\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrer: "https://telegram.blum.codes/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include"
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

    const ClickClaim = (bearer) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/farming/claim", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "sec-ch-ua": "\"Chromium\";v=\"124\", \"Microsoft Edge\";v=\"124\", \"Not-A.Brand\";v=\"99\", \"Microsoft Edge WebView2\";v=\"124\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrer: "https://telegram.blum.codes/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "POST",
        mode: "cors",
        credentials: "include"
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
const ClickFarm = (bearer) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/farming/start", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "sec-ch-ua": "\"Chromium\";v=\"124\", \"Microsoft Edge\";v=\"124\", \"Not-A.Brand\";v=\"99\", \"Microsoft Edge WebView2\";v=\"124\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrer: "https://telegram.blum.codes/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "POST",
        mode: "cors",
        credentials: "include"
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
const CheckClaimReferral = (bearer) =>
    new Promise((resolve, reject) => {
      fetch("https://gateway.blum.codes/v1/friends/balance", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "sec-ch-ua": "\"Google Chrome\";v=\"98\", \"Chromium\";v=\"98\", \"Not=A?Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": "\"iOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrer: "https://telegram.blum.codes/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include"
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
    const ClaimReferral = (bearer) =>
        new Promise((resolve, reject) => {
          fetch("https://gateway.blum.codes/v1/friends/claim", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
              "authorization": `Bearer ${bearer}`,
              "priority": "u=1, i",
              "sec-ch-ua": "\"Google Chrome\";v=\"98\", \"Chromium\";v=\"98\", \"Not=A?Brand\";v=\"24\"",
              "sec-ch-ua-mobile": "?1",
              "sec-ch-ua-platform": "\"iOS\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site"
            },
            referrer: "https://telegram.blum.codes/",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "POST",
            mode: "cors",
            credentials: "include"
          })
            .then((res) => res.json())
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        });
const getGameId = (bearer) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/game/play", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "sec-ch-ua": "\"Google Chrome\";v=\"98\", \"Chromium\";v=\"98\", \"Not=A?Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": "\"iOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrerPolicy: "no-referrer",
        body: null,
        method: "POST"
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
const claimGame = (bearer,gameId,points) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/game/claim", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "content-type": "application/json",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Microsoft Edge\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\", \"Microsoft Edge WebView2\";v=\"125\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrerPolicy: "no-referrer",
        body: `{\"gameId\":\"${gameId}\",\"points\":${points}}`,
        method: "POST"
      })
      .then((res) => res.clone().json().catch(() => res.text()))
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
(async () => {

  const query = ''

    while (true) {  
    try{

      const generateToken = await getToken(query)
        // get old token from file
        const bearer = generateToken.token.access
        // console.log(bearer)

        // get new token and replace old token on file
        const refreshToken = await RefreshToken(bearer)
        fs.truncate("token-elekate.txt", 0, function() {
          fs.writeFile("token-elekate.txt", refreshToken.refresh, function (err) {
              if (err) {
                  return console.log("Error writing file: " + err);
              }
          });
        });
        // console.log(refreshToken)
      
      const checkBalanceClaim = await CheckBalanceClaim(refreshToken.refresh)
      // console.log(checkBalanceClaim)
        const clickClaim = await ClickClaim(refreshToken.refresh)
        if(clickClaim.message){
          // console.log("Failed claim balance : "+clickClaim.message+"...")
          if(clickClaim.message == 'Need to start farm'){
            // console.log("Cant claim farm balance, "+clickClaim.message+"...")
              const clickFarm = await ClickFarm(refreshToken.refresh)
              console.log(`[${moment().format("DD/MM/YY HH:mm:ss")}] `+"Start Farm, "+clickFarm.startTime+"...")
              // console.log(clickFarm)
          }else{
            console.log(`[${moment().format("DD/MM/YY HH:mm:ss")}] `+"Cant claim farm balance, "+clickClaim.message+"...")
            console.log(`[${moment().format("DD/MM/YY HH:mm:ss")}] `+"Main Balance : "+checkBalanceClaim.availableBalance+" | Balance To Claim : ["+checkBalanceClaim.farming.balance+" / 57.6]")
            console.log("")
          }
  
          // claim balance from referral
          const checkClaimReferral = await CheckClaimReferral(refreshToken.refresh)
          if(checkClaimReferral.amountForClaim > 100){
            const claimReferral = await ClaimReferral(refreshToken.refresh)
            if(claimReferral.claimBalance){
              console.log(`[${moment().format("DD/MM/YY HH:mm:ss")}] `+`Success claim referral balance ${claimReferral.claimBalance}`)
            }else{
              console.log(`[${moment().format("DD/MM/YY HH:mm:ss")}] `+"Failed claim referral balance, "+claimReferral.message+"...")
            }
          }

          // play game and claim points
          const checkPlayGame = await CheckBalanceClaim(refreshToken.refresh)
          if(checkPlayGame.playPasses > 0){
            const gameId = await getGameId(refreshToken.refresh)
            if(gameId.gameId){
              console.log(`[${moment().format("DD/MM/YY HH:mm:ss")}] `+`Success get GameId : ${gameId.gameId}`)
              // random delay in seconds
              let randPoints = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
              const GameId = gameId.gameId
                let getclaimGame = await claimGame(refreshToken.refresh,GameId,randPoints)
                  if(getclaimGame == 'OK'){
                    console.log(`[${moment().format("DD/MM/YY HH:mm:ss")}] `+`Success claim game balance...`)
                  }else if(getclaimGame.message == 'game session not found'){
                    console.log(`[${moment().format("DD/MM/YY HH:mm:ss")}] `+`Game ended, success claim game balance...`)
                  }else if(getclaimGame.message == 'game session not finished'){
                    console.log(`[${moment().format("DD/MM/YY HH:mm:ss")}] `+`Trying to claim game balance, please wait...`)
                      let gameResult;
                      var stop = false;
                      setTimeout(() => { stop = true; }, 60 * 1000);
                      do {
                          let randPoints = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
                          let getclaimGames = await claimGame(refreshToken.refresh,gameId.gameId,randPoints)
                          // console.log(`claimGames : `,getclaimGames)
                          gameResult = await getclaimGames.message;
                          await delay(1000)
                          if (stop) break;
                      } while (gameResult != 'game session not found' && gameResult != 'OK');

                      if(gameResult == 'game session not found' || gameResult == 'OK'){
                        console.log(`[${moment().format("DD/MM/YY HH:mm:ss")}] `+`Success claim game balance...`)
                      }
                  }else{
                    console.log(`[${moment().format("DD/MM/YY HH:mm:ss")}] `+`Game error`+getclaimGame+`...`)
                  }
            }else{
              console.log(`[${moment().format("DD/MM/YY HH:mm:ss")}] `+"Failed get GameId, ",gameId.message+"...")
            }
          }
        }else{
          console.log(`[${moment().format("DD/MM/YY HH:mm:ss")}] `+"Success claim main balance...")
          console.log(`[${moment().format("DD/MM/YY HH:mm:ss")}] `+"Main Balance : "+checkBalanceClaim.availableBalance+" | Balance To Claim : ["+checkBalanceClaim.farming.balance+" / 57.6]")
          console.log("")
        }
      await delay(5000) // delay 1 minutes
    } catch (e) {
        console.log(e)
        console.log('')
    }
    }
})();