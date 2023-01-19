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
var lobbyfinder = false;
var lobbyfound = false;
//The Ign To Use If You Mass Report Make Sure You Dont Spam Report Either (It can flag)
var reportign = "IGN_TO_REPORT"

//Information you need to edit (DO NOT EDIT OTHER STUFF/DONT COMPLAIN TO ME IF YOU DO!)
var targetign = "your ign";

//for the lobby finder ign
var lobbyFinderIgn = "ign of bot you'll p transfer to"

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
console.log("Huys Pit Bots v1.0.0 -- highest quality token logger")
console.log("")
console.log("Features - ")
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
  } else if (input === 'run') {
    messageLogged = false;
  } else if (input === 'find') {
    messageLogged = false;
  }
});

const bots = [];
for (const account of accounts) {
  setTimeout(() => {
    sleep(3000)
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
    sleep(3000) 

    //console input for joining, leaving, limboing, and start/stopping/termination of the script

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
      if (input === 'find') {
        if (!messageLogged) {
          if (bot.username === lobbyFinderIgn) {
            bot.chat("/lobby")
            console.log("[HuysBotta] /l")
          }
          messageLogged = true;
          if (!lobbyfinder) {
            console.log("[HuysBotta] Finding a dead lobby. Lobby Finder enabled")
            lobbyfinder = true;
          } else {
            console.log("[HuysBotta] Nvm. Lobby Finder disabled")
            lobbyfinder = false;
          }
        }
      }
    });

    bot.on('physicTick', () => {
      if (lobbyfinder) {
        if (bot.username === lobbyFinderIgn) {
          while (!lobbyfound) {
            setTimeout(() => {
              lobbyplayercount = bot.players.length;
              if (lobbyplayercount < 5) {
                console.log('[HuysBotta] Dead lobby found with ' + lobbyplayercount + ' players')
                lobbyfound = true
              } else {
                bot.chat("/play pit")
                console.log("[HuysBotta] /play pit")
              }
            }, 2500);
          }
        }
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
      if (input === 'report') {
        if (!messageLogged) {
          messageLogged = true;
          console.log(bot.username + " Reported " + reportign)
        }
        bot.chat("/wdr ${reportign} killaura");
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
