import fetch from "node-fetch";
import delay from "delay";
import fs from "fs";
import { Twisters } from "twisters";
import moment from 'moment';
import { setTimeout } from 'timers/promises';


const userAgentGenerator = {
  edge: function () {
      const edgeVersion = Math.floor(Math.random() * 100) + 90;
      const chromeVersion = Math.floor(Math.random() * 100) + 96;
      const safariVersion = Math.floor(Math.random() * 100) + 10;
      const webkitVersion = Math.floor(Math.random() * 700) + 500;
      const osPlatform = os.platform() === 'win32' ? 'Windows NT 10.0; Win64; x64' : 'Macintosh; Intel Mac OS X 10_15_17';
      const userAgent = `Mozilla/5.0 (${osPlatform}) AppleWebKit/${webkitVersion}.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.0.0 Safari/${webkitVersion}.36 Edg/${edgeVersion}.0.1901.203`;
      return userAgent;
  },
  chrome: function () {
      const windowsNtVersion = Math.floor(Math.random() * 100) + 7;
      const chromeVersion = Math.floor(Math.random() * 100) + 96;
      const webkitVersion = Math.floor(Math.random() * 700) + 500;
      const osPlatform = os.platform() === 'win32' ? `Windows NT ${windowsNtVersion}.0; Win64; x64` : 'Macintosh; Intel Mac OS X 10_15_17';
      const userAgent = `Mozilla/5.0 (${osPlatform}) AppleWebKit/${webkitVersion}.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.3163.100 Safari/${webkitVersion}.36`;
      return userAgent;
  },
  firefox: function () {
      const windowsNtVersion = Math.floor(Math.random() * 100) + 7;
      const firefoxVersion = Math.floor(Math.random() * 26) + 95;
      const geckoVersion = Math.floor(Math.random() * 30) + 20100101;
      const osPlatform = os.platform() === 'win32' ? `Windows NT ${windowsNtVersion}.0; Win64; x64` : 'Macintosh; Intel Mac OS X 10_15_17';
      const userAgent = `Mozilla/5.0 (${osPlatform}; rv: ${firefoxVersion}.0) Gecko/${geckoVersion} Firefox/${firefoxVersion}.0`;
      return userAgent;
  },
  safari: function () {
      const windowsNtVersion = Math.floor(Math.random() * 100) + 7;
      const safariVersion = Math.floor(Math.random() * 100) + 10;
      const webkitVersion = Math.floor(Math.random() * 100) + 500;
      const osPlatform = os.platform() === 'win32' ? `Windows NT ${windowsNtVersion}.0; Win64; x64` : 'Macintosh; Intel Mac OS X 10_15_17';
      const userAgent = `Mozilla/5.0 (${osPlatform}) AppleWebKit/${webkitVersion}.1.15 (KHTML, like Gecko) Version/${safariVersion}.1.15 Safari/${webkitVersion}.1.15`;
      return userAgent;
  },
  android: function () {
      const edgeVersion = Math.floor(Math.random() * 25) + 90;
      const androidVersion = Math.floor(Math.random() * 8) + 5;
      const chromeVersion = Math.floor(Math.random() * 20) + 96;
      const webkitVersion = Math.floor(Math.random() * 700) + 500;
      const osPlatform = Math.floor(Math.random() * 10)
      const userAgent = `Mozilla/5.0 (Linux; Android ${androidVersion}.${osPlatform}; K) AppleWebKit/5${webkitVersion}37.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.0.0 Mobile Safari/${webkitVersion}.36 EdgA/${edgeVersion}.0.1901.196`
      return userAgent;
  },
  ios: function () {
      const iosVersion = Math.floor(Math.random() * 8) + 9;
      const edgeVersion = Math.floor(Math.random() * 25) + 90;
      const safariVersion = Math.floor(Math.random() * 6) + 10;
      const webkitVersion = Math.floor(Math.random() * 700) + 500;
      const osPlatform = Math.floor(Math.random() * 10)
      const userAgent = `Mozilla/5.0 (iPhone; CPU iPhone OS ${iosVersion}_${osPlatform} like Mac OS X) AppleWebKit/${webkitVersion}.1.15 (KHTML, like Gecko) EdgiOS/${edgeVersion}.0.1901.187 Version/${safariVersion}.0 Mobile/15E148 Safari/${webkitVersion}.1`
      return userAgent;
  }
};

const getToken = (query,randomUserAgent) =>
  new Promise((resolve, reject) => {
    fetch("https://gateway.blum.codes/v1/auth/provider/PROVIDER_TELEGRAM_MINI_APP", {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,id;q=0.8",
        "content-type": "application/json",
        "priority": "u=1, i",
        "sec-ch-ua": randomUserAgent,
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

const RefreshToken = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://gateway.blum.codes/v1/auth/refresh", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "priority": "u=1, i",
          "sec-ch-ua": randomUserAgent,
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
    
const userCheck = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
        fetch("https://gateway.blum.codes/v1/user/me", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              "authorization": `Bearer ${bearer}`,
              "priority": "u=1, i",
              "sec-ch-ua": randomUserAgent,
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

const CheckBalanceClaim = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/user/balance", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "sec-ch-ua": randomUserAgent,
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

    const ClickClaim = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/farming/claim", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "sec-ch-ua": randomUserAgent,
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
const ClickFarm = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/farming/start", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "sec-ch-ua": randomUserAgent,
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
const CheckClaimReferral = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://gateway.blum.codes/v1/friends/balance", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "sec-ch-ua": randomUserAgent,
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
    const ClaimReferral = (bearer,randomUserAgent) =>
        new Promise((resolve, reject) => {
          fetch("https://gateway.blum.codes/v1/friends/claim", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
              "authorization": `Bearer ${bearer}`,
              "priority": "u=1, i",
              "sec-ch-ua": randomUserAgent,
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
const getGameId = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/game/play", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "sec-ch-ua": randomUserAgent,
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
const claimGame = (bearer,gameId,points,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/game/claim", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "content-type": "application/json",
          "priority": "u=1, i",
          "sec-ch-ua": randomUserAgent,
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
const dailyRewards = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/daily-reward?offset=-420", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "sec-ch-ua": randomUserAgent,
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
const getTask = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/tasks", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "sec-ch-ua": randomUserAgent,
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
      .then((res) => res.clone().json().catch(() => res.text()))
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
const startTask = (bearer,taskId,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch(`https://game-domain.blum.codes/api/v1/tasks/${taskId}/start`, {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "sec-ch-ua": randomUserAgent,
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
const claimTask = (bearer,taskId,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch(`https://game-domain.blum.codes/api/v1/tasks/${taskId}/claim`, {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "sec-ch-ua": randomUserAgent,
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

function date_format(unix_timestamp,format){
    const date=new Date(unix_timestamp*1000);
    const dateObject={
        'Y' : date.getFullYear(),
        'm' : String(date.getMonth()).padStart(2,'0'),
        'd' : String(date.getDate()).padStart(2,'0'),
        'H' : String(date.getHours()).padStart(2,'0'),
        'i' : String(date.getMinutes()).padStart(2,'0'),
        's' : String(date.getSeconds()).padStart(2,'0'),
    };
    var dateString='';
    for (let char of format) {
        if(char in dateObject){
            dateString+=dateObject[char];
        }else{
            dateString+=char;
        }
    }
    return dateString;
}
(async () => {
  // var username;
    const queryList = readFileToJSON("./blum.json");
    const twisters = new Twisters();
    let startTasks;
    let claimTasks
    let idTask;
    let statusTask;
    let titleTask;
    let kindTask;

    while (true) {  
        await Promise.all(
            queryList.map(async (query) => {
                try{
                  const randomUserAgent = userAgentGenerator.ios();
                  const generateToken = await getToken(query,randomUserAgent)
                    // get old token from file
                    const bearer = generateToken.token.access
                    // console.log(bearer)
            
                    // get new token and replace old token on file
                    const refreshToken = await RefreshToken(bearer,randomUserAgent)
                    const userDetails = await userCheck(refreshToken.refresh,randomUserAgent)
                    var username = userDetails.username
                  
                  const checkBalanceClaim = await CheckBalanceClaim(refreshToken.refresh,randomUserAgent)
                    const clickClaim = await ClickClaim(refreshToken.refresh,randomUserAgent)
                    if(clickClaim.message){
                      // console.log(checkBalanceClaim)
                      // const startTime = checkBalanceClaim.farming.startTime
                      // const endTime = checkBalanceClaim.farming.endTime
                      const dailyrewards = await dailyRewards(refreshToken.refresh,randomUserAgent)
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
                          const clickFarm = await ClickFarm(refreshToken.refresh,randomUserAgent)
                          twisters.put(username, {
                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Start Farm, ${clickFarm.startTime}`});
                      }else{
                        // twisters.put(username, {
                        //   text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Cant claim farm balance, ${clickClaim.message}...`});
                          twisters.put(username, {
                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Balance To Claim : [${checkBalanceClaim.farming.balance}/ 57.6]`});
                      }

                      const getTasks = await getTask(refreshToken.refresh,randomUserAgent)
                      // console.log(getTasks)
                        getTasks.forEach(async (element) => {
                          idTask = element.id
                          statusTask = element.status
                          titleTask = element.title
                          kindTask = element.kind
                          // if(kindTask === 'QUEST'){

                          // }else{

                          // }
                          if(statusTask.match('CLAIMED') || statusTask.match('FINISHED')){
                                // twisters.put(username, {
                                //   text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | ${titleTask} | ${idTask} | ${statusTask}`});
                          }else if(statusTask.match('NOT_STARTED')){
                              startTasks = await startTask(refreshToken.refresh,idTask,randomUserAgent)
                              await delay(500)
                                    if(startTasks.status === 'READY_FOR_CLAIM'){
                                      claimTasks = await claimTask(refreshToken.refresh,idTask,randomUserAgent)
                                        if(claimTasks.type === 'SOCIAL_SUBSCRIPTION'){
                                          twisters.put(username, {
                                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | ${claimTasks.title} | ${claimTasks.id} | ${claimTasks.status}`});
                                        }else if(claimTasks.type === 'PROGRESS_TARGET'){
                                          twisters.put(username, {
                                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | ${claimTasks.id} | ${claimTasks.status}`});
                                        }else{
                                          twisters.put(username, {
                                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | ${titleTask} | ${idTask} | ${statusTask}`});
                                        }
                                    }else if(startTasks.message === 'Task type does not support start'){
                                      // twisters.put(username, {
                                      //   text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | ${titleTask} | ${idTask} | ${startTasks.message} | ${statusTask}`});
                                    }else{
                                      twisters.put(username, {
                                        text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | ${titleTask} | ${idTask} | ${statusTask}`});
                                    }
                          }else if(statusTask.match('STARTED') || statusTask.match('READY_FOR_CLAIM')){
                            claimTasks = await claimTask(refreshToken.refresh,idTask,randomUserAgent)
                            // console.log(`claimTasks 2 :`,claimTasks)
                            if(claimTasks.type === 'SOCIAL_SUBSCRIPTION'){
                              twisters.put(username, {
                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | ${claimTasks.title} | ${claimTasks.id} | ${claimTasks.status}`});
                            }else if(claimTasks.type === 'PROGRESS_TARGET'){
                              twisters.put(username, {
                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | ${claimTasks.id} | ${claimTasks.status}`});
                            }else if(claimTasks.message === 'Task is not done'){
                              // twisters.put(username, {
                              //   text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | ${titleTask} | ${idTask} | ${claimTasks.message} | ${statusTask}`});
                            }else{
                              twisters.put(username, {
                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | `});
                              console.log(`${titleTask} | ${idTask} | ${statusTask}`)
                            }
                          }else{
                            twisters.put(username, {
                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | `});
                            console.log(`${titleTask} | ${idTask} | ${statusTask}`)
                          }
                        
                        });
              
                      // claim balance from referral
                      const checkClaimReferral = await CheckClaimReferral(refreshToken.refresh,randomUserAgent)
                      // console.log(checkClaimReferral)
                      if(checkClaimReferral.amountForClaim > 10){
                        const claimReferral = await ClaimReferral(refreshToken.refresh,randomUserAgent)
                        if(claimReferral.claimBalance){
                            twisters.put(username, {
                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Success claim referral balance ${claimReferral.claimBalance}`});
                        }else{
                            twisters.put(username, {
                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Failed claim ${checkClaimReferral.amountForClaim} referral balance ${claimReferral.message}`});
                        }
                      }
            
                      // play game and claim points
                      const checkPlayGame = await CheckBalanceClaim(refreshToken.refresh,randomUserAgent)
                      if(checkPlayGame.playPasses > 0){
                        const gameId = await getGameId(refreshToken.refresh,randomUserAgent)
                        if(gameId.gameId){
                            twisters.put(username, {
                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${checkBalanceClaim.availableBalance} | Success get GameId : ${gameId.gameId}`});
                          // random delay in seconds
                          let randPoints = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
                          const GameId = gameId.gameId
                            let getclaimGame = await claimGame(refreshToken.refresh,GameId,randPoints,randomUserAgent)
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
                                      let getclaimGames = await claimGame(refreshToken.refresh,gameId.gameId,randPoints,randomUserAgent)
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
                    console.log(e)
                    // console.log('')
                    twisters.put(username, {
                      text: `[${moment().format("DD/MM/YY HH:mm:ss")}] Bad gateway...`});
                }
          }))
          // Delay 0.5s for each loop
          await delay(500);
    }
})();