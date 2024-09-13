import fetch from "node-fetch";
import delay from "delay";
import fs from "fs";
import { Twisters } from "twisters";
import moment from 'moment';
import { setTimeout } from 'timers/promises';
import { TASKANSWER } from "./taskAnswer.js";


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
    fetch("https://user-domain.blum.codes/api/v1/auth/provider/PROVIDER_TELEGRAM_MINI_APP", {
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
      fetch("https://user-domain.blum.codes/api/v1/auth/refresh", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
          "content-type": "application/json",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrerPolicy: "no-referrer",
        body: `{\"refresh\":\"${bearer}\"}`,
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
    
const userCheck = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
        fetch("https://user-domain.blum.codes/api/v1/user/me", {
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
      fetch("https://user-domain.blum.codes/api/v1/friends/balance", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
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

const ClaimReferral = (bearer,randomUserAgent) =>
        new Promise((resolve, reject) => {
          fetch("https://user-domain.blum.codes/api/v1/friends/claim", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
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

const getGameId = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://game-domain.blum.codes/api/v1/game/play", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
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
      fetch("https://earn-domain.blum.codes/api/v1/tasks", {
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
      fetch(`https://earn-domain.blum.codes/api/v1/tasks/${taskId}/start`, {
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

const validateTask = (bearer,taskId,randomUserAgent,answer) =>
    new Promise((resolve, reject) => {
      fetch(`https://earn-domain.blum.codes/api/v1/tasks/${taskId}/validate`, {
        headers: {
          "accept": "application/json, text/plain, */*",
          "content-type": "application/json",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${bearer}`,
          "priority": "u=1, i",
          "User-Agent": randomUserAgent,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrerPolicy: "no-referrer",
        body: `{\"keyword\":\"${answer}\"}`,
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

const claimTask = (bearer,taskId,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch(`https://earn-domain.blum.codes/api/v1/tasks/${taskId}/claim`, {
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
const collectTasks = (data) => {
  const collectedTasks = [];

  data.forEach(section => {
    section.tasks.forEach(task => {
      if (task.subTasks && task.subTasks.length > 0) {
        collectedTasks.push(...task.subTasks);
      } else {
        collectedTasks.push(task);
      }
    });

    // Handle subSections
    section.subSections.forEach(subSection => {
      subSection.tasks.forEach(task => {
        if (task.subTasks && task.subTasks.length > 0) {
          collectedTasks.push(...task.subTasks);
        } else {
          collectedTasks.push(task);
        }
      });
    });
  });

  return collectedTasks;
}
(async () => {
    const queryList = readFileToJSON("./blum.json");
    const twisters = new Twisters();

    while (true) {  
      await Promise.all(
          queryList.map(async (query) => {
            try{
              // console.log(query);
              //  getting username by splitting query
              const splitQuery = query.split('username%22%3A%22');
              const splitUsername = (splitQuery[1]).split('%22%2C%22');
              var username = splitUsername[0]
              // console.log(getUsername);

                  const randomUserAgent = userAgentGenerator.ios();
                  const generateToken = await getToken(query,randomUserAgent)
                  await delay(1000);
                      if(generateToken.token){
                        // get old token from file
                        const bearer = generateToken.token.access
                        // console.log(bearer)
                
                        // get new token and replace old token on file
                        const refreshToken = await RefreshToken(bearer,randomUserAgent)
                        if(!refreshToken.message){
                          const bearerRefresh = refreshToken.refresh
                          // console.log(bearerRefresh)
  
                          const userDetails = await userCheck(bearerRefresh,randomUserAgent)
                          // console.log(userDetails)
                          username = userDetails.username
                        
                          const checkBalanceClaim = await CheckBalanceClaim(bearerRefresh,randomUserAgent)
                          // console.log(checkBalanceClaim)
  
                          if(checkBalanceClaim.message !== 'redis: connection pool timeout'){
                            const checkClaims = await checkClaim(bearerRefresh,randomUserAgent)
                            // console.log(checkClaims)
                            // const clickClaim = await ClickClaim(bearerRefresh,randomUserAgent)
                            // console.log(clickClaim)
                            
                            // get my tribe
                            const checkMyTribes = await checkMyTribe(bearerRefresh,randomUserAgent)
                            const tribeTitle = checkMyTribes.title ?? 'undefined'
                            const tribeMember = checkMyTribes.countMembers ?? 'undefined'
                            const tribeBalance = checkMyTribes.earnBalance ?? 'undefined'
                            const tribeRank = checkMyTribes.rank ?? 'undefined'
                            
                            if(checkMyTribes.message === 'NOT_FOUND' && checkMyTribes.data.chatname === null){
                              // console.log(`Not yet join in the tribe...`)
                              const joinTribes = await joinTribe(bearerRefresh,randomUserAgent)
                              if(joinTribes === 'OK'){
                                const checkMyTribes = await checkMyTribe(bearerRefresh,randomUserAgent)
                                // console.log(`Success join tribe ${tribeTitle} rank : ${tribeRank} members : ${tribeMember} balance : ${tribeBalance}`)
                              }
                            }else if(checkMyTribes.chatname !== null && checkMyTribes.chatname !== 'akuairdrop_channel'){
                              const leaveTribes = await leaveTribe(bearerRefresh,randomUserAgent)
                              if(leaveTribes === 'OK'){
                                // console.log(`Success leave tribe...`)
                                const joinTribes = await joinTribe(bearerRefresh,randomUserAgent)
                                if(joinTribes === 'OK'){
                                  const checkMyTribes = await checkMyTribe(bearerRefresh,randomUserAgent)
                                  // console.log(`Success join tribe ${tribeTitle} rank : ${tribeRank} members : ${tribeMember} balance : ${tribeBalance}`)
                                }
                              }
                            }
  
                            if(checkBalanceClaim.farming === undefined){
                              const clickFarm = await ClickFarm(bearerRefresh,randomUserAgent)
                                if(clickFarm.startTime){
                                  twisters.put(username, {
                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Success start Farm, startTime ${clickFarm.startTime} - endTime ${clickFarm.endTime}`});
                                }else{
                                  twisters.put(username, {
                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Error start Farm ${clickFarm.message}...`});
                                }
                            }else if(checkClaims.now < checkBalanceClaim.farming.endTime){
                              const maxFarming = (checkBalanceClaim.farming.earningsRate*28800).toFixed(2);
                              twisters.put(username, {
                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Farming balance : [${checkBalanceClaim.farming.balance}/${maxFarming}]`});
                                
                              const dailyrewards = await dailyRewards(bearerRefresh,randomUserAgent)
                              if(dailyrewards == 'OK'){
                                twisters.put(username, {
                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Success claim daily rewards...`});
                              }else if(dailyrewards.message == 'same day' || dailyrewards.message == 'Not Found'){
                                twisters.put(username, {
                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Daily rewards has been claimed...`});
                              }else{
                                twisters.put(username, {
                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | ${dailyrewards.message}...`});
                              }
        
                              // get task
                              const getTasks = await getTask(bearerRefresh,randomUserAgent)
                              // console.log(getTasks)
                              if(getTasks.message !== 'can not get task'){
                                const dataTasks = collectTasks(getTasks);
                                    // console.log(dataTasks)
                                    if(dataTasks){
                                      dataTasks.forEach(async (element) => {
                                        // console.log(element)
                                        const idTask = element.id
                                        const statusTask = element.status
                                        const titleTask = element.title
                                        const typeTask = element.type
                                        const kindTask = element.kind
                                        const validationTypeTask = element.validationType
                                        
                                        if(statusTask !== 'CLAIMED' && statusTask !== 'FINISHED'){
                                          if(typeTask === 'PROGRESS_TARGET' && statusTask === 'NOT_STARTED'){
                                            const progressTask = parseFloat(element.progressTarget.progress)
                                            const targetTask = parseFloat(element.progressTarget.target)
                                            if(progressTask >= targetTask){
                                              // console.log("PROGRESS_TARGET :",element)
                                              const startTasks = await startTask(bearerRefresh,idTask,randomUserAgent)
                                              await delay(500)
                                                    if(startTasks.status === 'READY_FOR_CLAIM'){
                                                      const claimTasks = await claimTask(bearerRefresh,idTask,randomUserAgent)
                                                      console.log(claimTasks)
                                                        if(claimTasks.type === 'PROGRESS_TARGET'){
                                                          // console.log(claimTasks)
                                                          twisters.put(username, {
                                                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Claim Task PROGRESS_TARGET : ${claimTasks.id} | ${claimTasks.status}`});
                                                        }else{
                                                          twisters.put(username, {
                                                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Claim Task Error : ${titleTask} | ${idTask} | ${claimTasks.message}`});
                                                        }
                                                    }else if(startTasks.message === 'Task type does not support start'){
                                                      // twisters.put(username, {
                                                      //   text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Task type does not support start : ${titleTask} | ${idTask} | ${statusTask} - ${startTasks.message}`});
                                                    }else{
                                                      twisters.put(username, {
                                                        text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Start Task NOT_STARTED Error : ${titleTask} | ${idTask} | ${startTasks.status}`});
                                                    }
                                            }
                                          }else if(typeTask !== 'PROGRESS_TARGET' && statusTask === 'NOT_STARTED'){
                                            // console.log("NOT_PROGRESS_TARGET :",element)
                                              const startTasks = await startTask(bearerRefresh,idTask,randomUserAgent)
                                              await delay(500)
                                                    if(startTasks.status === 'READY_FOR_CLAIM'){
                                                      const claimTasks = await claimTask(bearerRefresh,idTask,randomUserAgent)
                                                      // console.log(claimTasks)
                                                        if(claimTasks.type === 'SOCIAL_SUBSCRIPTION'){
                                                          twisters.put(username, {
                                                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Claim Task SOCIAL_SUBSCRIPTION : ${claimTasks.title} | ${claimTasks.id} | ${claimTasks.status}`});
                                                        }else{
                                                          twisters.put(username, {
                                                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Claim Task Error : ${titleTask} | ${idTask} | ${claimTasks.message}`});
                                                        }
                                                    }else if(startTasks.message === 'Task type does not support start'){
                                                      // twisters.put(username, {
                                                      //   text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Task type does not support start : ${titleTask} | ${idTask} | ${statusTask} - ${startTasks.message}`});
                                                    }else{
                                                      twisters.put(username, {
                                                        text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Start Task NOT_STARTED Error : ${titleTask} | ${idTask} | ${startTasks.status}`});
                                                    }
                                          }else if(statusTask === 'READY_FOR_CLAIM'){
                                            // console.log(`cek 2 : ${idTask} ${titleTask} ${statusTask}`)
                                            const claimTasks = await claimTask(bearerRefresh,idTask,randomUserAgent)
                                              if(claimTask.message !== "can not get task events" || claimTask.message !== "can not get task"){
                                                // console.log(`claimTasks 2 : ${idTask} ${titleTask} ${statusTask}`,claimTasks)
                                                if(claimTasks.type === 'SOCIAL_SUBSCRIPTION'){
                                                  twisters.put(username, {
                                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Claim Task SOCIAL_SUBSCRIPTION : ${claimTasks.title} | ${claimTasks.id} | ${claimTasks.status}`});
                                                }else if(claimTasks.type === 'PROGRESS_TARGET'){
                                                  twisters.put(username, {
                                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Claim Task PROGRESS_TARGET : ${claimTasks.id} | ${claimTasks.status}`});
                                                    // console.log(claimTasks)
                                                }else if(claimTasks.message === 'Task is not done'){
                                                  twisters.put(username, {
                                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Claim Task is not done : ${titleTask} | ${idTask} | ${statusTask} - ${claimTasks.message}`});
                                                }else{
                                                  twisters.put(username, {
                                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Claim Task SOCIAL_SUBSCRIPTION Error : ${titleTask} | ${idTask} | ${statusTask} | ${validationTypeTask} - ${claimTasks.message}`});
                                                }
                                              }
                                          }else if(statusTask === "READY_FOR_VERIFY"){
                                            // console.log("idTask :",idTask)
                                            const answer = TASKANSWER.getAnswer(idTask);
                                            // console.log("answer :",answer)
                                            if (answer) {
                                              const validateTasks = await validateTask(bearerRefresh,idTask,randomUserAgent,answer)
                                              // console.log("validateTasks :",validateTasks)
                                              if(!validateTasks.message){
                                                if(validateTasks === "READY_FOR_CLAIM"){
                                                  const claimTasks = await claimTask(bearerRefresh,idTask,randomUserAgent)
                                                  console.log("READY_FOR_VERIFY :",claimTasks)
                                                    if(claimTasks.type === 'SOCIAL_SUBSCRIPTION'){
                                                      twisters.put(username, {
                                                        text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Claim Task SOCIAL_SUBSCRIPTION : ${claimTasks.title} | ${claimTasks.id} | ${claimTasks.status}`});
                                                    }else if(claimTasks.type === 'PROGRESS_TARGET'){
                                                      twisters.put(username, {
                                                        text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Claim Task PROGRESS_TARGET : ${claimTasks.id} | ${claimTasks.status}`});
                                                        // console.log(claimTasks)
                                                    }else if(claimTasks.message === 'Task is not done'){
                                                      twisters.put(username, {
                                                        text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Claim Task is not done : ${titleTask} | ${idTask} | ${statusTask} - ${claimTasks.message}`});
                                                    }else{
                                                      twisters.put(username, {
                                                        text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Claim Task SOCIAL_SUBSCRIPTION Error : ${claimTasks.id} | ${claimTasks.status}`});
                                                    }
                                                }
                                              }
                                            }
                                          }else{
                                            if(typeTask === 'PROGRESS_TARGET'){
                                              twisters.put(username, {
                                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Task Progress Not Yet Achieved : ${idTask} | ${titleTask} | ${typeTask} | ${statusTask} | ${element.progressTarget.progress} / ${element.progressTarget.target}`});
                                            }else{
                                              twisters.put(username, {
                                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Trying to reclaim task : ${idTask} | ${titleTask} | ${typeTask} | ${statusTask}`});
                                                // console.log(element)
                                            }
                                            // const claimTasks = await claimTask(bearerRefresh,idTask,randomUserAgent)
                                          }
                                              // twisters.put(username, {
                                                // text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | ${titleTask} | ${idTask} | ${statusTask}`});
                                        }
                                      });
                                    }
                              }
                      
                              // claim balance from referral
                              const checkClaimReferral = await CheckClaimReferral(bearerRefresh,randomUserAgent)
                              // console.log(checkClaimReferral)
                              if(checkClaimReferral.amountForClaim > 10){
                                const claimReferral = await ClaimReferral(bearerRefresh,randomUserAgent)
                                if(claimReferral.claimBalance){
                                    twisters.put(username, {
                                      text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Success claim referral balance ${claimReferral.claimBalance}`});
                                }else{
                                    twisters.put(username, {
                                      text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Failed claim ${checkClaimReferral.amountForClaim} referral balance ${claimReferral.message}`});
                                }
                              }
                    
                              // play game and claim points
                              const checkPlayGame = await CheckBalanceClaim(bearerRefresh,randomUserAgent)
                              if(checkPlayGame.playPasses > 0){
                                const gameId = await getGameId(bearerRefresh,randomUserAgent)
                                if(gameId.gameId){
                                    twisters.put(username, {
                                      text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Success get GameId : ${gameId.gameId}`});
                                  // random delay in seconds
                                  let randPoints = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
                                  const GameId = gameId.gameId
                                    let getclaimGame = await claimGame(bearerRefresh,GameId,randPoints,randomUserAgent)
                                      if(getclaimGame == 'OK'){
                                        twisters.put(username, {
                                          text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Success claim game balance...`});
                                      }else if(getclaimGame.message == 'game session not found'){
                                        twisters.put(username, {
                                          text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Game ended, success claim game balance...`});
                                      }else if(getclaimGame.message == 'game session not finished'){
                                        twisters.put(username, {
                                          text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Trying to claim game balance, please wait...`});
                    
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
                                          text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Success claim game balance...`});
                                          }
                                      }else{
                                        twisters.put(username, {
                                          text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Game error : ${getclaimGame}`});
                                      }
                                }else{
                                    twisters.put(username, {
                                      text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Failed get GameId : ${gameId.message}`});
                                }
                              }

                            }else{                              
                              const clickClaim = await ClickClaim(bearerRefresh,randomUserAgent)
                              // console.log(clickClaim)
                              if(clickClaim.message === "It's too early to claim"){
                                const maxFarming = (checkBalanceClaim.farming.earningsRate*28800).toFixed(2);
                                twisters.put(username, {
                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | It's too early to claim : [${checkBalanceClaim.farming.balance}/${maxFarming}]`});
                              }else if(clickClaim.message === "Need to start farm"){
                                twisters.put(username, {
                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | It's need to start farm, trying to start farm...`});
                                    const clickFarm = await ClickFarm(bearerRefresh,randomUserAgent)
                                      if(clickFarm.startTime){
                                        twisters.put(username, {
                                          text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Success start Farm, startTime ${clickFarm.startTime} - endTime ${clickFarm.endTime}`});
                                      }else{
                                        twisters.put(username, {
                                          text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Error start Farm ${clickFarm.message}`});
                                      }
                              }else{
                                const maxFarming = (checkBalanceClaim.farming.earningsRate*28800).toFixed(2);
                                  twisters.put(username, {
                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Success claim main balance : [${checkBalanceClaim.farming.balance}/${maxFarming}]`});
                              }
                            }
                          }else{
                              twisters.put(username, {
                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${checkBalanceClaim.availableBalance} playPasses : ${checkBalanceClaim.playPasses} MyTribe Balance : ${tribeBalance} MyTribe Rank : ${tribeRank} | Blum Server TimeOut...`});
                          }
                        }else{
                          twisters.put(username, {
                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Failed getting access token ${refreshToken.message}, retry...`});
                        }
                      }else if(generateToken.message){
                          twisters.put(username, {
                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Failed getting access token ${generateToken.message}, retry...`});
                      }else{
                          twisters.put(username, {
                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Failed getting access token Web server is returning an unknown error, retry...`});
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
          await delay(1000);
    }
})();