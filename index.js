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
        "User-Agent": randomUserAgent,
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
      // .then((res) => res.json())
      .then((res) => res.clone().json().catch(() => res.text()))
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
          "User-Agent": randomUserAgent,
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
              "User-Agent": randomUserAgent,
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

const checkMyTribe = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/tribe/my", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "User-Agent": randomUserAgent,
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

const joinTribe = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/tribe/f564fee2-a354-4a54-923c-52c884798e45/join", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "User-Agent": randomUserAgent,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrerPolicy: "no-referrer",
        body: null,
        method: "POST"
      })
      .then((res) => res.clone().json().catch(() => res.text()))
      // .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

const leaveTribe = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/tribe/leave", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "content-type": "application/json",
          "priority": "u=1, i",
          "User-Agent": randomUserAgent,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrerPolicy: "no-referrer",
        body: "{}",
        method: "POST"
      })
      .then((res) => res.clone().json().catch(() => res.text()))
      // .then((res) => res.json())
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
          "User-Agent": randomUserAgent,
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
          "User-Agent": randomUserAgent,
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

const checkClaim = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/time/now", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "User-Agent": randomUserAgent,
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": "\"iOS\"",
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

const ClickFarm = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/farming/start", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "User-Agent": randomUserAgent,
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
          "User-Agent": randomUserAgent,
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
              "User-Agent": randomUserAgent,
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
          "User-Agent": randomUserAgent,
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
          "User-Agent": randomUserAgent,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrerPolicy: "no-referrer",
        body: `{\"gameId\":\"${gameId}\",\"points\":${points}}`,
        method: "POST"
      })
      .then((res) => res.clone().json().catch(() => res.text()))
      // .then((res) => res.json())
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
          "User-Agent": randomUserAgent,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrerPolicy: "no-referrer",
        body: null,
        method: "POST"
      })
      .then((res) => res.clone().json().catch(() => res.text()))
      // .then((res) => res.json())
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
          "User-Agent": randomUserAgent,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrerPolicy: "no-referrer",
        body: null,
        method: "GET"
      })
      // .then((res) => res.clone().json().catch(() => res.text()))
      .then((res) => res.json())
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
          "User-Agent": randomUserAgent,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrerPolicy: "no-referrer",
        body: null,
        method: "POST"
      })
      .then((res) => {
          // console.log('wait for 10 seconds . . . . ');
          return new Promise(function(resolve, reject) { 
              setTimeout(() => {
                  // console.log('10 seconds Timer expired!!!');
                  res.json();
              }, 120000)
          });
      })
      // .then((res) => res.clone().json().catch(() => res.text()))
      // .then((res) => res.json())
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
          "User-Agent": randomUserAgent,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrerPolicy: "no-referrer",
        body: null,
        method: "POST"
      })
      // .then((res) => res.clone().json().catch(() => res.text()))
      .then((res) => res.json())
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
    const queryList = readFileToJSON("./blum.json");
    const twisters = new Twisters();

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
                    const bearerRefresh = refreshToken.refresh
                    // console.log(bearerRefresh)

                    const userDetails = await userCheck(bearerRefresh,randomUserAgent)
                    // console.log(userDetails)
                    var username = userDetails.username
                  
                    const checkBalanceClaim = await CheckBalanceClaim(bearerRefresh,randomUserAgent)
                    // console.log(checkBalanceClaim)

                    if(checkBalanceClaim.message !== 'redis: connection pool timeout'){
                      const checkClaims = await checkClaim(bearerRefresh,randomUserAgent)
                      // console.log(checkClaims)
                      // const clickClaim = await ClickClaim(bearerRefresh,randomUserAgent)
                      // console.log(clickClaim)
                      
                      // get my tribe
                      var checkMyTribes = await checkMyTribe(bearerRefresh,randomUserAgent)
                      if(checkMyTribes.message === 'NOT_FOUND' && checkMyTribes.data.chatname === null){
                        // console.log(`Not yet join in the tribe...`)
                        const joinTribes = await joinTribe(bearerRefresh,randomUserAgent)
                        if(joinTribes === 'OK'){
                          const checkMyTribes = await checkMyTribe(bearerRefresh,randomUserAgent)
                          // console.log(`Success join tribe ${checkMyTribes.title} rank : ${checkMyTribes.rank} members : ${checkMyTribes.countMembers} balance : ${checkMyTribes.earnBalance}`)
                        }
                      }else if(checkMyTribes.chatname !== null && checkMyTribes.chatname !== 'akuairdrop_channel'){
                        const leaveTribes = await leaveTribe(bearerRefresh,randomUserAgent)
                        if(leaveTribes === 'OK'){
                          // console.log(`Success leave tribe...`)
                          const joinTribes = await joinTribe(bearerRefresh,randomUserAgent)
                          if(joinTribes === 'OK'){
                            const checkMyTribes = await checkMyTribe(bearerRefresh,randomUserAgent)
                            // console.log(`Success join tribe ${checkMyTribes.title} rank : ${checkMyTribes.rank} members : ${checkMyTribes.countMembers} balance : ${checkMyTribes.earnBalance}`)
                          }
                        }
                      }
  
                      if(checkBalanceClaim.farming === undefined){
                        const clickFarm = await ClickFarm(bearerRefresh,randomUserAgent)
                        twisters.put(username, {
                          text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Start Farm, ${clickFarm.startTime}`});
                      }else if(checkClaims.now < checkBalanceClaim.farming.endTime){
                        // console.log(checkBalanceClaim)
                        // const startTime = checkBalanceClaim.farming.startTime
                        // const endTime = checkBalanceClaim.farming.endTime
                        const dailyrewards = await dailyRewards(bearerRefresh,randomUserAgent)
                        if(dailyrewards == 'OK'){
                          twisters.put(username, {
                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Success claim daily rewards...`});
                        }else if(dailyrewards.message == 'same day' || dailyrewards.message == 'Not Found'){
                          twisters.put(username, {
                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Failed claim daily rewards...`});
                        }else{
                          twisters.put(username, {
                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | ${dailyrewards.message}...`});
                        }
  
                        // get task
                        const getTasks = await getTask(bearerRefresh,randomUserAgent)
                          getTasks.forEach(async (mainElement) => {
                            const taskList = mainElement.tasks
                            taskList.forEach(async (element) => {
                              // console.log(element)
                              const idTask = element.id
                              const statusTask = element.status
                              const titleTask = element.title
                              const kindTask = element.kind
                              
                              if(statusTask === 'CLAIMED' || statusTask === 'FINISHED'){
                                    // twisters.put(username, {
                                      // text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | ${titleTask} | ${idTask} | ${statusTask}`});
                              }else if(statusTask === 'NOT_STARTED'){
                                  const startTasks = await startTask(bearerRefresh,idTask,randomUserAgent)
                                  await delay(500)
                                        if(startTasks.status === 'READY_FOR_CLAIM' || startTasks.status === 'STARTED'){
                                          const claimTasks = await claimTask(bearerRefresh,idTask,randomUserAgent)
                                          // console.log(claimTasks)
                                            if(claimTasks.type === 'SOCIAL_SUBSCRIPTION'){
                                              twisters.put(username, {
                                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Claim Task SOCIAL_SUBSCRIPTION : ${claimTasks.title} | ${claimTasks.id} | ${claimTasks.status}`});
                                            }else if(claimTasks.type === 'PROGRESS_TARGET'){
                                              twisters.put(username, {
                                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Claim Task PROGRESS_TARGET : ${claimTasks.id} | ${claimTasks.status}`});
                                            }else{
                                              twisters.put(username, {
                                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Claim Task Error : ${titleTask} | ${idTask} | ${claimTasks.message}`});
                                            }
                                        }else if(startTasks.message === 'Task type does not support start'){
                                          // twisters.put(username, {
                                            // text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Start Task not support : ${titleTask} | ${idTask} | ${startTasks.message} | ${statusTask}`});
                                        }else{
                                          twisters.put(username, {
                                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Start Task NOT_STARTED Error : ${titleTask} | ${idTask} | ${startTasks.status}`});
                                        }
                              }else if(statusTask === 'STARTED' || statusTask === 'READY_FOR_CLAIM'){
                                const claimTasks = await claimTask(bearerRefresh,idTask,randomUserAgent)
                                // console.log(`claimTasks 2 :`,claimTasks)
                                if(claimTasks.type === 'SOCIAL_SUBSCRIPTION'){
                                  twisters.put(username, {
                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Claim Task SOCIAL_SUBSCRIPTION : ${claimTasks.title} | ${claimTasks.id} | ${claimTasks.status}`});
                                }else if(claimTasks.type === 'PROGRESS_TARGET'){
                                  twisters.put(username, {
                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Claim Task PROGRESS_TARGET : ${claimTasks.id} | ${claimTasks.status}`});
                                }else if(claimTasks.message === 'Task is not done'){
                                  twisters.put(username, {
                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Claim Task is not done : ${titleTask} | ${idTask} | ${claimTasks.message} | ${statusTask}`});
                                }else{
                                  twisters.put(username, {
                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Claim Task SOCIAL_SUBSCRIPTION Error : ${claimTasks.id} | ${claimTasks.status}`});
                                }
                              }else{
                                // const claimTasks = await claimTask(bearerRefresh,idTask,randomUserAgent)
                                twisters.put(username, {
                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Claim Task READY_FOR_CLAIM/STARTED Error : ${idTask} | ${element}`});
                              }
                            });
                          })
                
                        // claim balance from referral
                        const checkClaimReferral = await CheckClaimReferral(bearerRefresh,randomUserAgent)
                        // console.log(checkClaimReferral)
                        if(checkClaimReferral.amountForClaim > 10){
                          const claimReferral = await ClaimReferral(bearerRefresh,randomUserAgent)
                          if(claimReferral.claimBalance){
                              twisters.put(username, {
                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Success claim referral balance ${claimReferral.claimBalance}`});
                          }else{
                              twisters.put(username, {
                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Failed claim ${checkClaimReferral.amountForClaim} referral balance ${claimReferral.message}`});
                          }
                        }
              
                        // play game and claim points
                        const checkPlayGame = await CheckBalanceClaim(bearerRefresh,randomUserAgent)
                        if(checkPlayGame.playPasses > 0){
                          const gameId = await getGameId(bearerRefresh,randomUserAgent)
                          if(gameId.gameId){
                              twisters.put(username, {
                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Success get GameId : ${gameId.gameId}`});
                            // random delay in seconds
                            let randPoints = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
                            const GameId = gameId.gameId
                              let getclaimGame = await claimGame(bearerRefresh,GameId,randPoints,randomUserAgent)
                                if(getclaimGame == 'OK'){
                                  twisters.put(username, {
                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Success claim game balance...`});
                                }else if(getclaimGame.message == 'game session not found'){
                                  twisters.put(username, {
                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Game ended, success claim game balance...`});
                                }else if(getclaimGame.message == 'game session not finished'){
                                  twisters.put(username, {
                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Trying to claim game balance, please wait...`});
              
                                    let gameResult;
                                    var stop = false;
                                    setTimeout(() => { stop = true; }, 60 * 1000);
                                    do {
                                        let randPoints = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
                                        let getclaimGames = await claimGame(bearerRefresh,gameId.gameId,randPoints,randomUserAgent)
                                        // console.log(`claimGames : `,getclaimGames)
                                        gameResult = await getclaimGames.message;
                                        await delay(1000)
                                        if (stop) break;
                                    } while (gameResult != 'game session not found' && gameResult != 'OK');
              
                                    if(gameResult == 'game session not found' || gameResult == 'OK'){
                                  twisters.put(username, {
                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Success claim game balance...`});
                                    }
                                }else{
                                  twisters.put(username, {
                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Game error : ${getclaimGame}`});
                                }
                          }else{
                              twisters.put(username, {
                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Failed get GameId : ${gameId.message}`});
                          }
                        }
                      }else{
                        const clickClaim = await ClickClaim(bearerRefresh,randomUserAgent)
                        // console.log(clickClaim)
                        if(clickClaim.message === "It's too early to claim"){
                          twisters.put(username, {
                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | It's too early to claim : [${checkBalanceClaim.farming.balance}/ 57.6]`});
                        }else{
                            twisters.put(username, {
                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Success claim main balance : [${checkBalanceClaim.farming.balance}/ 57.6]`});
                        }
                      }
                    }else{
                        twisters.put(username, {
                          text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${checkMyTribes.earnBalance} MyTribe Rank : ${checkMyTribes.rank} | Blum Server TimeOut...`});
                    }
                  } catch (e) {
                      // console.log(e)
                      // console.log('')
                      twisters.put(username, {
                        text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] error : ${e}`});
                      // twisters.put(username, {
                      //   text: `[${moment().format("DD/MM/YY HH:mm:ss")}] error: ${e.type} ${e.code}`,e});
                  }
          })
        )
        // Delay 0.5s for each loop
          await setTimeout(3600);
          // await delay(1000);
    }
})();