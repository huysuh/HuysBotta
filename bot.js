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
var boty;

var targetign = "Your Name";
var reportign = ""
var lobbyFinderIgn = ""
var warpName = "";
var DeadLobbyPlayerCount = 5; //(default 8)

var blobmode = false;
var silents = true;

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
console.log("")
console.log("")
console.log("")
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

const accounts = [
  //get rotating socks5 proxys from webshare
  {username: 'email', password: 'pass', proxy: 'socks5://user:pass@p.webshare.io:80'}, 
  {username: 'email', password: 'pass', proxy: 'socks5://user:pass@p.webshare.io:80'}, 
  {username: 'email', password: 'pass', proxy: 'socks5://user:pass@p.webshare.io:80'}, 
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
          host: 'nigger.hypixel.net',
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
        bot.chat("/wdr ${reportign} cheating");
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
  
      bot.on('physicTick', () => {
      const ppx = Math.floor(Math.random() * 4);
      const ppz = Math.floor(Math.random() * 4);
      const ppzz = Math.floor(Math.random() * 4);
      if (!silents) {
        if (bot.getControlState('left') == true) bot.setControlState('left', false);
        if (bot.getControlState('right') == true) bot.setControlState('right', false);
        if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
      }
      if (enabled)  {
        if (bot.getControlState('forward') == false) bot.setControlState('forward', true);
        if (bot.getControlState('sprint') == false) bot.setControlState('sprint', true);
        if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
        boty = (bot.entity.position.y)
        if (blobmode) {
          if (bot.entity.position.y > spawnY) {
            if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
            bot.lookAt(new Vec3(0, boty, 0))
          } else {
            if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
            bot.lookAt(new Vec3(0, boty, -13))
          }
        } else {
          if (silents) {
            strafes++;
            if (boty < spawnY) {
              bot.lookAt(bot.nearestEntity(e => e.type === 'player').position.offset(0, 1.6, 0));
              if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
              if (strafes < 10) { 
                if (bot.getControlState('left') == false) bot.setControlState('left', true);
                if (bot.getControlState('right') == true) bot.setControlState('right', false);
              } else {
                if (bot.getControlState('left') == true) bot.setControlState('left', false);
                if (bot.getControlState('right') == false) bot.setControlState('right', true);
                if (strafes > 20) {
                  strafes = 0;
                }
              }
              const player = bot.nearestEntity(entity => entity.type === 'player');
              bot.attack(player);
            } else {
              bot.lookAt(new Vec3(ppx, boty, ppz))
              if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
            }
          } else {
            if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
            bot.lookAt(new Vec3(0, boty, 0))
          }
        }
      } else {
        if (bot.getControlState('left') == true) bot.setControlState('left', false);
        if (bot.getControlState('right') == true) bot.setControlState('right', false);
        if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
        if (bot.getControlState('forward') == true) bot.setControlState('forward', false);
        if (bot.getControlState('sprint') == true) bot.setControlState('sprint', false);
      }
    });

    bot.on('messagestr', async (message) => {
      if (message.includes(`Party`)) {
        if (message.includes(`play`)) {
          bot.chat("/play pit");
        } else if (message.includes(`lobby`)) {
          bot.chat("/l");
        } else if (message.includes(`start`)) {
          enabled = true
        } else if (message.includes(`stop`)) {
          enabled = false
          bot.chat("/oof");
        } else if (message.includes(`limbo`)) {
          for (let i = 0; i < 1000; i++) {
            bot.chat("/");
          }
        } 
      }
    });

    // Log errors and kick reasons:
    bot.on('kicked', console.log)
    bot.on('error', console.log)

  }, 3000);
}
