process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const mineflayer = require('mineflayer')
const Vec3 = require('vec3')
const ProxyAgent = require('proxy-agent')
const socks = require('socks').SocksClient
const readline = require('readline');
var ticks = 0;
var inMid = false;
var inSpawn = true;
let enabled = false;
var antiafk = 0;
var lobbycount = 10;
var lobbyfinder = false;
var lobbyfound = false;
var deadLobbyCheck = false;

var targetign = "Name of player who parties the bots (Your IGN)";
var reportign = ""
var lobbyFinderIgn = "Name of bot that you /p transfer to to swap to find a dead lobby"
var warpName = "Name of bot that you /p transfer to to warp the bots into the lobby (good for lobby filling useless otherwise)";
var DeadLobbyPlayerCount = 5; //(default 8)

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
console.log("Huys Pit Bot Discord.gg/Huys")
console.log("")
console.log("")
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
  } else if (input === 'report') {
    messageLogged = false;
  } else if (input === 'limbo') {
    messageLogged = false;
  } else if (input === 'run') {
    messageLogged = false;
  } else if (input === 'logjoins') {
    messageLogged = false;
  }
});

const bots = [];
    for (const account of accounts) {
      const randomDelay = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
      sleep(randomDelay)
      setTimeout(() => {
        const bot = mineflayer.createBot({
          host: 'hypixel.net',
          port: 25565,
          version: "1.8.9",
          username: account.username,
          password: account.password,
          auth: 'microsoft',
          agent: new ProxyAgent(account.proxy),
      }, randomDelay);
    bots.push(bot);

    bot.on('login', () => {
      console.log(bot.username + ' Connected ' + randomDelay + 'ms');
      sleep(3000)
    });

    bot.on('entityHurt', (entity) => {
     if (bot.entity.uuid === entity.uuid) {
      bot.chat('/oof');
       }
    });

    rl.on('line', (input) => {
      if (input === 'logjoins') {
        console.log(bot.username + ' Has Started Logging Joins');
        bot.on('playerJoined', (player) => {
          if (player.username.length === 10) {
            setTimeout(() => {}, 100);
         } else {
          if ("Pit" in bot.scoreboards) {
            bot.chat(`/pc ${player.username} joined`);
          }
        }
      });
     }
    });

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
    
    let ticks = 0;
        bot.on('physicTick', () => {
              ticks++;
              if (ticks >= 40) {
                if (lobbyfinder) {
                lobbycount = Object.keys(bot.players).length
                if (bot.username === lobbyFinderIgn) {
                  if (lobbycount <= DeadLobbyPlayerCount) {
                    console.log('[HuysBotta] Dead lobby found with ' + lobbycount + ' players')
                    bot.chat(`/p transfer ${targetign}`)
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

    rl.on('line', (input) => {
      if (input === 'lobby') {
        if (!messageLogged) {
          messageLogged = true;
          console.log("[HuysBotta] Making bots go to lobby")
        }
        bot.chat("/l");
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
      if (input === 'report') {
        console.log(bot.username + " Reported " + reportign)
        bot.chat("/wdr ${reportign} killaura");
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
          console.log("[HuysBotta] Limboing...");
        }
        for (let i = 0; i < 100; i++) {
          sleep(100)
          bot.chat("/");
      }
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

    bot.on('messagestr', async (message) => {
        if (message.includes(`bot`)) {
          console.log("Someone Has Called You Out For Botting So You Were Sent To Limbo");
          for (let i = 0; i < 100; i++) {
            sleep(2)
            bot.chat("/");
          }
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

    //bot pathing to coordinates
    bot.on('physicTick', () => {
      if(enabled)  {
        boty = (bot.entity.position.y)
        bot.lookAt(new Vec3(0, boty, 0))
        if (bot.getControlState('forward') == false) bot.setControlState('forward', true);
        if (bot.getControlState('sprint') == false) bot.setControlState('sprint', true);
      } else {
        if (bot.getControlState('forward') == true) bot.setControlState('forward', false);
        if (bot.getControlState('sprint') == true) bot.setControlState('sprint', false);
      }
    });


    // Log errors and kick reasons:
    bot.on('kicked', console.log)
    bot.on('error', console.log)

  }, 3000);
}
