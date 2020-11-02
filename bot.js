
const Discord = require('discord.js');
const bot = new Discord.Client();
let config = require('./botconfig.json');

bot.commands = new Discord.Collection();

const fs = require('fs');

let token = config.token;
let prefix = config.prefix;

fs.readdir('./cmds/',(err,files)=>{
    if(err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop()=== "js");
    if(jsfiles.length <= 0) console.log("no command for upload!!!");
    console.log(`uploaded ${jsfiles.length} commands`);
    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}.${f} loaded!!!`);
        bot.command.set(props.help.name,props);
    })
})


bot.on('ready', () => {
  console.log(`Bot online ${bot.user.username}!`);
  bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
      console.log(link);
  })
});

bot.on('message', msg => {
    if(massage.autor.bot) return;
    if(massage.chanel.type =="dm") return;
    let user = massage.autor.username;
    let userid = massage.autor.id;
    let messageArray = massage.content.split(" ");
    let command = messageArray[0].tolosercase()
    let args = messageArray.slice(1);
    if(massage.content.startwith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot,massage,args);
});

bot.login("NzcyMDkzMDQwMTUxNzU2ODEx.X51prQ.nrx3NHsqG6hRbj8irjRGkBIXfY8");