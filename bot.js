let nearestPlayer;
var lobbycount = 10;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const mineflayer = require('mineflayer')
const Vec3 = require('vec3')
const ProxyAgent = require('proxy-agent')
const socks = require('socks').SocksClient
const readline = require('readline');
var FreeMoneyHubISPoorFuckYouHuysOnTop = 0;
var spawnY;
var silentticks = 0;
var ticks = 0;
var inMid = false;
var inSpawn = true;
var enabled = false;
var antiafk = 0;
var lobbyfinder = false;
var lobbyfound = false;
var i_hate_niggas = false;
var reportBot = false;
var arglol;
var silentbot;
var hardbot;
var strafe = 0;

//Information you need to edit (DO NOT EDIT OTHER STUFF/DONT COMPLAIN TO ME IF YOU DO!)
var targetign = "Your IGN";
var findingTargetLobby = false; //for silent botting, they will try to find ur lobby instead of you having to party them risking a ban
var anticallout = false; // enable or disable anti callout (when someone says "bot" it disables the leaves the lobby)
var DeadLobbyPlayerCount = 8; // recommended to be a little high because there could be hypixel bots/npcs in tab that make the bots confused (default 8)
let nearestDistance = 10; // Player distance for silent bots

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
console.log("Huys Pit Bots v1.0.7")
console.log("")
console.log("Changelog:")
console.log("[+] Added strafing with silent bots ")
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

    rl.on('line', input => {
      const [command, ...args] = input.split(' ');
      if (command === 'bot') {
        if (!messageLogged) {
          arglol = args.join('');
          if (arglol = "silent" | "soft" | "hard" | "blatant") {
            if (arglol = "silent" | "soft") {
              console.log("[HuysBotta] softbot mode");
              hardbot = false;
              silentbot = true;
            } else if (arglol = "hard" | "blatant") {
              console.log("[HuysBotta] hardbot mode");
              hardbot = true;
              silentbot = false;
            }
          } else {
            console.log("[HuysBotta] Choose one! <silent/soft or hard/blatant>");
          }
        }
      }
    });

    rl.on('line', (input) => {
      if (input === 'findstop') {
        if(!findingTargetLobby) {
          console.log("Lobby finding task isn't running");
          return;
        }


        findingTargetLobby = false;
        console.log("Lobby finding task disabled");
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


    rl.on('line', (input) => {
      if (input === 'findstart') {
        if (bot.username === lobbyFinderIgn) {
          bot.chat("/lobby");
          console.log("[HuysBotta] /l");
        }
        lobbyfinder = true;
        console.log("[HuysBotta] debug > lobbyfinder enabled")
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
      if (input === 'wow') {
        bot.chat("/pc Thats Good!!!!!");
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
        i_hate_niggas = args.join('');
        const wordsList = ["bhop","killaura","reach","autoblock","speed"];
        const randreport = wordsList[Math.floor(Math.random() * wordsList.length)];
        bot.chat("/wdr ${i_hate_niggas} ${randreport}");
        console.log(bot.username + " Reported " + i_hate_niggas + " For " + randreport)
      }
    });
    
    rl.on('line', input => {
      const [command, ...args] = input.split(' ');
      if (command === 'kosreport') {
        i_hate_niggas = args.join('');
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

    // silent bot code start

    bot.on('spawn', () => {
      spawnY = bot.entity.position.y - 5;
      console.log("[HuysBotta] Spawn Y is " + spawnY);
    });

    //party joining ty kymp
    bot.on('messagestr', async (message) => {
        if (message.includes(`${targetign} has invited you to join their party`)) {
          bot.chat(`/p accept ${targetign}`)
        }
    });

    //code from kymp

    bot.leftClick = () => { // Basic left clicking
      bot.swingArm('left')
      let entity = bot.entityAtCursor()
      if (entity) {
        bot.attack(entity, false)
      }
    }

    bot.entityAtCursor = (maxDistance = 3.0) => {
      const block = bot.blockAtCursor(maxDistance)
      maxDistance = block?.intersect.distanceTo(bot.entity.position) ?? maxDistance
    
      const entities = Object.values(bot.entities)
        .filter(entity => entity.type !== 'object' && entity.username !== bot.username && entity.position.distanceTo(bot.entity.position) <= maxDistance)
    
      const dir = new Vec3(-Math.sin(bot.entity.yaw) * Math.cos(bot.entity.pitch), Math.sin(bot.entity.pitch), -Math.cos(bot.entity.yaw) * Math.cos(bot.entity.pitch))
      const iterator = new RaycastIterator(bot.entity.position.offset(0, bot.entity.height, 0), dir.normalize(), maxDistance)
    
      let targetEntity = null
      let targetDist = maxDistance
    
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i]
        const w = entity.width / 2
    
        const shapes = [[-w, 0, -w, w, entity.height + (entity.type === 'player' ? 0.18 : 0), w]]
        const intersect = iterator.intersect(shapes, entity.position)
        if (intersect) {
          const entityDir = entity.position.minus(bot.entity.position) // Can be combined into 1 line
          const sign = Math.sign(entityDir.dot(dir))
          if (sign !== -1) {
            const dist = bot.entity.position.distanceTo(intersect.pos)
            if (dist < targetDist) {
              targetEntity = entity
              targetDist = dist
            }
          }
        }
      }
    
      return targetEntity
    }

    //bot pathing to coordinates
    bot.on('physicTick', () => {
      if(enabled)  {
        boty = (bot.entity.position.y)
        if (bot.getControlState('forward') == false) bot.setControlState('forward', true);
        if (bot.getControlState('sprint') == false) bot.setControlState('sprint', true);
        if (hardbot) {
          //hard bots
          bot.lookAt(new Vec3(0, boty, 0))
        } if (silentbot) {
          strafe++;
          silentticks++;
          //silent bots
          if (bot.entity.position.y < spawnY) {
            if (strafe < 40) {
              if (bot.getControlState('left') == false) bot.setControlState('left', true);
              if (bot.getControlState('right') == true) bot.setControlState('right', false);
            } else if (strafe < 80) {
              if (bot.getControlState('left') == true) bot.setControlState('left', false);
              if (bot.getControlState('right') == false) bot.setControlState('right', true);
            } else {
              strafe = 0;
            }
            if (bot.nearestEntity(({ type }) => type === 'player')) {
              var { username } = bot.nearestEntity(({ type }) => type === 'player')
              coords = bot.players[username].entity.position
              x = coords.x
              y = coords.y
              z = coords.z
              x =x
              y += 1.5
              z =z
              bot.lookAt(new Vec3(x, y, z))
            }
            if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
            FreeMoneyHubISPoorFuckYouHuysOnTop = (Math.floor(Math.random() * (5 - 3 + 1)) + 3)
            if (silentticks > FreeMoneyHubISPoorFuckYouHuysOnTop) {
              bot.leftClick()
              silentticks = 0;
            }
          } else {
            bot.lookAt(new Vec3(0, boty, 0))
          }
        }
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
