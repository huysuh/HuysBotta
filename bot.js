let nearestPlayer;
var lobbycount = 10;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const mineflayer = require('mineflayer')
const Vec3 = require('vec3')
const ProxyAgent = require('proxy-agent')
const socks = require('socks').SocksClient
const readline = require('readline');
var enabled = false;
var lobbyfinder = false;
var PitBoostONTOP_L_nick_LMFAO = false;

//Information you need to edit (DO NOT EDIT OTHER STUFF/DONT COMPLAIN TO ME IF YOU DO!)
var targetign = "Your IGN";
var findingTargetLobby = false; //for silent botting, they will try to find ur lobby instead of you having to party them risking a ban
var anticallout = false; // enable or disable anti callout (when someone says "bot" it disables the leaves the lobby)
var DeadLobbyPlayerCount = 8; // recommended to be a little high because there could be hypixel bots/npcs in tab that make the bots confused (default 8)
//for the lobby finder ign
var lobbyFinderIgn = "Bot that you /p transfer to to start finding a lobby's IGN"

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
console.log("")
console.log("  _    _                 ____        _   ")
console.log(" | |  | |               |  _ \\      | |  ")
console.log(" | |__| |_   _ _   _ ___| |_) | ___ | |_ ")
console.log(" |  __  | | | | | | / __|  _ < / _ \\| __|")
console.log(" | |  | | |_| | |_| \\__ \\ |_) | (_) | |_ ")
console.log(" |_|  |_|\\__,_|\\__, |___/____/ \\___/ \\__|")
console.log("                __/ |                    ")
console.log("")
console.log("")
console.log("Huys Pit Bots v1.0.7 (discord.gg/huys)")
console.log("")
console.log("Changelog:")
console.log("[+] fixed/removed broken features")
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

const accounts = [
  //example --> socks5://igjkgtkew:gjekfwmq@157.42.192.116:6680
  {username: 'AccountEmail', password: 'AccountPassword', proxy: 'socks5://ProxyUsername:ProxyPassword@ProxyHost:ProxyPort'}, 
  {username: 'AccountEmail', password: 'AccountPassword', proxy: 'socks5://ProxyUsername:ProxyPassword@ProxyHost:ProxyPort'}, 
  {username: 'AccountEmail', password: 'AccountPassword', proxy: 'socks5://ProxyUsername:ProxyPassword@ProxyHost:ProxyPort'}, 
];



const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//ilylols code for setting up the rl thingy
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let messageLogged = false;

rl.on('line', (input) => {
  if (input === 'party') {
    messageLogged = false;
  } else if (input === 'lobby') {
    messageLogged = false;
  } else if (input === 'play') {
    messageLogged = false;
  } else if (input === 'start') {
    messageLogged = false;
  } else if (input === 'stop') {
    messageLogged = false;
  } else if (input === 'limbo') {
    messageLogged = false;
  } else if (input === 'report') {
    messageLogged = false;
  } else if (input === 'kosreport') {
    messageLogged = false;
  } else if (input === 'run') {
    messageLogged = false;
  } else if (input === 'find') {
    messageLogged = false;
  } else if (input === 'wow') {
    messageLogged = false;
  } else if (input === 'bot') {
    messageLogged = false;
  } else if (input === 'findlobby') {
    messageLogged = false;
  }
});

//settimeout function here was changed to async and await added to each sleep
const bots = [];
for (const account of accounts) {
  setTimeout( async () => {
    await sleep(3000)
    const bot = mineflayer.createBot({
      host: 'hypixel.net',
      port: 25565,
      version: "1.8.9",
      username: account.username,
      password: account.password,
      auth: 'microsoft',
      agent: new ProxyAgent(account.proxy),
    });
    bots.push(bot);

    bot.on('login', () => {
      console.log(bot.username + ' Connected');
    });

    // code start

    rl.on('line', (input) => {
      if (input === 'findstop') {
        if (bot.username === lobbyFinderIgn) {
          console.log("[HuysBotta] debug > lobbyfinder disabled")
        }
        lobbyfinder = false;
      }
    });
    
    rl.on('line', (input) => {
      if (input === 'findstart') {
        if (bot.username === lobbyFinderIgn) {
          bot.chat("/lobby");
          console.log("[HuysBotta] /l");
          console.log("[HuysBotta] debug > lobbyfinder enabled")
        }
        lobbyfinder = true;
      }
    });

    rl.on('line', (input) => {  
      if (input === 'warp') {    
        if (bot.username === warpName) {
            console.log("[HuysBotta] Warping...")        
            bot.chat("/play pit")      
            setTimeout(() => {}, 1000);          
            bot.chat(`/p transfer ${targetign}`)    
        }  
      }
    });

    rl.on('line', (input) => {
      if (input === 'lobbyfind') {
        if(findingTargetLobby) {
          console.log("Lobby finding task is already running! Type 'lobbyfindstop' to stop the task!");
          return;
        }

        findingTargetLobby = true;
        console.log("Attempting to find " +  targetign + "'s lobby now!");
        findTargetIgnLobby();
      }
    });

    rl.on('line', (input) => {
      if (input === 'lobbyfindstop') {
        findingTargetLobby = true;
      }
    });


    function findTargetIgnLobby() {
     if(checkIfTargetIgnInLobby) {
      console.log(bot.username + " is in " + targetign + "'s lobby!");
     } else {
      bot.chat("/play pit");
      setInterval(() => {
        findTargetIgnLobby();
      }, 5000);
     }
    }

    function checkIfTargetIgnInLobby() {
      if(targetign in bot.players) {
        return true;
      } else {
        return false;
      }
    }

    let ticks = 0;
    bot.on('physicTick', () => {
          ticks++;
          if (ticks >= 40) {
            if (lobbyfinder) {
            lobbycount = Object.keys(bot.players).length
            if (bot.username === lobbyFinderIgn) {
              if (lobbycount <= DeadLobbyPlayerCount) {
                console.log('[HuysBotta] Dead lobby found with ' + lobbycount + ' players')
                bot.chat("/p transfer ${targetign}")
                lobbyfound = true
                lobbyfinder = false;
              } else {
                bot.chat("/play pit")
                console.log('[HuysBotta] /play pit (' + lobbycount + ' players)')
              }
            }
          }
            ticks = 0;
          }
        });

   bot.on('messagestr', async (message) => {
      if (anticallout) {
        if (message.includes(`bot`)) {
          console.log("Someone Has Called You Out For Botting So You Were Sent To Limbo");
          for (let i = 0; i < 100; i++) {
            await sleep(2)
            bot.chat("/");
          }
        }
      }
    });

    rl.on('line', (input) => {
      if (input === 'lobby') {
        if (!messageLogged) {
          messageLogged = true;
          console.log("[HuysBotta] Making bots go to the lobby")
        }
        bot.chat("/lobby");
        enabled = false;
      }
    });
    
    rl.on('line', (input) => {
      if (input === 'play') {
        if (!messageLogged) {
          messageLogged = true;
          console.log("[HuysBotta] Making bots go to the Pit")
        }
        bot.chat("/play pit");
      }
    });

    rl.on('line', (input) => {
      if (input === 'party') {
        if (!messageLogged) {
          messageLogged = true;
          if (bots && bots.length) {
            if (bots.length > 5) {
              let botNames = "";
              for (let i = 0; i < bots.length; i += 5) {
                botNames = bots.slice(i, i + 5).map(bot => bot.username).join(" ");
                console.log("/party " + botNames);
              }
            } else {
              let botNames = bots.map(bot => bot.username).join(" ");
              console.log("/party " + botNames);
            }
          } else {
            console.error("Error: Bot names are undefined.");
          }
        }
      }
    });


    rl.on('line', (input) => {
      if (input === 'limbo') {
        if (!messageLogged) {
          messageLogged = true;
          bot.chat("/l");
          console.log("[HuysBotta] Limboing...");
        }
        for (let i = 0; i < 50; i++) {
          setTimeout(() => {
            bot.chat("/");
          }, 100);
        }
      }
    });

    rl.on('line', input => {
      const [command, ...args] = input.split(' ');
      if (command === 'report') {
        PitBoostONTOP_L_nick_LMFAO = args.join('');
        const wordsList = ["bhop","killaura","reach","autoblock","speed"];
        const randreport = wordsList[Math.floor(Math.random() * wordsList.length)];
        bot.chat("/wdr ${PitBoostONTOP_L_nick_LMFAO} ${randreport}");
        console.log(bot.username + " Reported " + PitBoostONTOP_L_nick_LMFAO + " For " + randreport)
      }
    });
    
    rl.on('line', input => {
      if (command === 'kosreport') {
        let names = ["Niquit", "AmoebaFan", "BillySet", "Manesh", "Zoreveth", "Axsolo", "ttfan", "Naturalss", "Artificialsss", "pitballer3000", "Axduo", "Quent_007", "GEORGEWEAH", "SmurfPve"];
        let randomName = names[Math.floor(Math.random() * names.length)];
        const wordsList = ["bhop","killaura","reach","autoblock","speed"];
        const randreport = wordsList[Math.floor(Math.random() * wordsList.length)];
        bot.chat("/wdr ${randomName} ${randreport}");
        console.log(bot.username + " Reported " + randomName + " For " + randreport)
      }
    });

    rl.on('line', (input) => {
      if (input === 'start') {
        if (!messageLogged) {
          messageLogged = true;
          console.log("[HuysBotta] Script started!");
        }
        enabled = true
      }
    });

    rl.on('line', (input) => {
      if (input === 'stop') {
        if (!messageLogged) {
          messageLogged = true;
          console.log("[HuysBotta] Script stopped!");
        }
        enabled = false
        bot.chat(`/oof`)
      }
    });

    rl.on('line', input => {
      const [command, ...args] = input.split(' ');
      if (command === 'run') {
        if (!messageLogged) {
          messageLogged = true;
          console.log("Attempting to run " + args.join(' '));
        }
        bot.chat(args.join(' '));
      }
    });

    //party joining ty kymp
    bot.on('messagestr', async (message) => {
        if (message.includes(`${targetign} has invited you to join their party`)) {
          bot.chat(`/p accept ${targetign}`)
        }
    });
    
    //bot go to mid
    bot.on('physicTick', () => {
      if(enabled)  {
        boty = (bot.entity.position.y)
        if (bot.getControlState('forward') == false) bot.setControlState('forward', true);
        if (bot.getControlState('sprint') == false) bot.setControlState('sprint', true);
        //hard bots
        bot.lookAt(new Vec3(0, boty, 0))
      }
    });


    // Log errors and kick reasons:
    bot.on('kicked', console.log)
    bot.on('error', console.log)

  }, 3000);
}
