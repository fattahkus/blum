import fetch from "node-fetch";
import delay from "delay";
import fs from "fs";
import { Twisters } from "twisters";
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
    
const userCheck = (bearer) =>
    new Promise((resolve, reject) => {
        fetch("https://gateway.blum.codes/v1/user/me", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              "authorization": `Bearer ${bearer}`,
              "priority": "u=1, i",
              "sec-ch-ua": "\"Microsoft Edge\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\", \"Microsoft Edge WebView2\";v=\"125\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site"
            },
            referrerPolicy: "no-referrer",
            body: null,
            method: "GET"
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
const dailyRewards = (bearer) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/daily-reward?offset=-420", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "sec-ch-ua": "\"Microsoft Edge\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\", \"Microsoft Edge WebView2\";v=\"125\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrerPolicy: "no-referrer",
        body: null,
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
    const readFileToJSON = (path) => {
        return JSON.parse(fs.readFileSync(path, "utf8"));
      };
(async () => {
  // var username;
    const queryList = readFileToJSON("./blum.json");
    const twisters = new Twisters();

    while (true) {  
        await Promise.all(
            queryList.map(async (query) => {
                try{
                  const generateToken = await getToken(query)
                    // get old token from file
                    const bearer = generateToken.token.access
                    // console.log(bearer)
            
                    // get new token and replace old token on file
                    const refreshToken = await RefreshToken(bearer)
                    const userDetails = await userCheck(refreshToken.refresh)
                    var username = userDetails.username
                  
                  const checkBalanceClaim = await CheckBalanceClaim(refreshToken.refresh)
                    const clickClaim = await ClickClaim(refreshToken.refresh)
                    if(clickClaim.message){
                      // console.log(checkBalanceClaim)
                      const dailyrewards = await dailyRewards(refreshToken.refresh)
                      if(dailyrewards == 'OK'){
                        twisters.put(username, {
                          text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Success claim daily rewards...`});
                      }else if(dailyrewards.message == 'same day' || dailyrewards.message == 'Not Found'){
                        twisters.put(username, {
                          text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Failed claim daily rewards...`});
                      }else{
                        twisters.put(username, {
                          text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | ${dailyrewards.message}...`});
                      }
                      // console.log("Failed claim balance : "+clickClaim.message+"...")
                      if(clickClaim.message == 'Need to start farm'){
                        // console.log("Cant claim farm balance, "+clickClaim.message+"...")
                          const clickFarm = await ClickFarm(refreshToken.refresh)
                          twisters.put(username, {
                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Start Farm, ${clickFarm.startTime}`});
                      }else{
                        // twisters.put(username, {
                        //   text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Cant claim farm balance, ${clickClaim.message}...`});
                          twisters.put(username, {
                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Balance To Claim : [${checkBalanceClaim.farming.balance}/ 57.6]`});
                      }
              
                      // claim balance from referral
                      const checkClaimReferral = await CheckClaimReferral(refreshToken.refresh)
                      if(checkClaimReferral.amountForClaim > 100){
                        const claimReferral = await ClaimReferral(refreshToken.refresh)
                        if(claimReferral.claimBalance){
                            twisters.put(username, {
                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Success claim referral balance ${claimReferral.claimBalance}`});
                        }else{
                            twisters.put(username, {
                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Failed claim referral balance ${claimReferral.message}`});
                        }
                      }
            
                      // play game and claim points
                      const checkPlayGame = await CheckBalanceClaim(refreshToken.refresh)
                      if(checkPlayGame.playPasses > 0){
                        const gameId = await getGameId(refreshToken.refresh)
                        if(gameId.gameId){
                            twisters.put(username, {
                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Success get GameId : ${gameId.gameId}`});
                          // random delay in seconds
                          let randPoints = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
                          const GameId = gameId.gameId
                            let getclaimGame = await claimGame(refreshToken.refresh,GameId,randPoints)
                              if(getclaimGame == 'OK'){
                                twisters.put(username, {
                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Success claim game balance...`});
                              }else if(getclaimGame.message == 'game session not found'){
                                twisters.put(username, {
                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Game ended, success claim game balance...`});
                              }else if(getclaimGame.message == 'game session not finished'){
                                twisters.put(username, {
                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Trying to claim game balance, please wait...`});
            
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
                                twisters.put(username, {
                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Success claim game balance...`});
                                  }
                              }else{
                                twisters.put(username, {
                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Game error : ${getclaimGame}`});
                              }
                        }else{
                            twisters.put(username, {
                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Failed get GameId : ${gameId.message}`});
                        }
                      }
                    }else{
                        twisters.put(username, {
                          text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Success claim main balance : [${checkBalanceClaim.farming.balance}/ 57.6]`});
                    }
                } catch (e) {
                    // console.log(e)
                    // console.log('')
                    twisters.put(username, {
                      text: `[${moment().format("DD/MM/YY HH:mm:ss")}] Bad gateway...`});
                }
          }))
          // Delay 0.5s for each loop
          await delay(500);
    }
})();