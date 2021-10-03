const Discord = require('discord.js')
const delta = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const prefix = "!"



delta.on("ready", async()=>{
  console.log(delta.user.username, "is online")

})



delta.on('message', async message => {
  if(message.author.bot) return;
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if(command == "ticket-setup") {

      let channel = message.mentions.channels.first();
      if(!channel) return;

      let sent = await channel.send(new Discord.MessageEmbed()
          .setColor('BLACK')
          .setThumbnail('')
.setDescription("**Για την άμεση εξυπηρέτησή σας μπορείτε να ανοίξετε ένα ticket** \n  📞Support \n 💸Donate \n ⛔Ban Appeal\n ❓Other ")
          .setFooter("Κάνε reaction σε ένα από τα παρακάτω emojis το οποίο παρουσιάζει το θέμα του ticket.")
      )
      sent.react('📞');
      sent.react('💸');
      sent.react('⛔');
      sent.react('❓');
  }
  

});  





delta.on('messageReactionAdd', async (reaction, user)=> {
  if(reaction.message.partial) await reaction.message.fetch();
  if(reaction.partial) await reaction.fetch();
  if(user.bot) return;
  if(!reaction.message.guild) return;

    if(reaction.message.channel.id === "893270881248358410") { //to id pp einai to embed
    const staffid= reaction.message.guild.roles.cache.get("893270880799567913") // to id tou staff team
  if(reaction.emoji.name === "📞") {
          reaction.users.remove(user);
        

          reaction.message.guild.channels.create(`📞ticket-support-${user.username}`, {
              type: "text",
              topic: " ",
               permissionOverwrites: [
              {
                  id: user.id,
                  allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
              },
              {
                  id: reaction.message.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL"]
              },
              {  
                id: staffid,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
              }
    ],
    })
    .then(ch => {
    ch.send(`<@${user.id}> `,new Discord.MessageEmbed().setDescription('**Παρακαλω περιμενετε το staff team θα σας εξυπηρετησει συντομα!!Αν θελετε να κλεισετε καντε react με 🔒**').setColor('#9933FF')).then(msg => msg.react('🔒'))
    })
  }
  if(reaction.emoji.name === "💸") {
  reaction.users.remove(user);
  
  
  reaction.message.guild.channels.create(`💸ticket-donate- ${user.username}`, {
    type: "text",
    topic: "",
     permissionOverwrites: [
    {
        id: user.id,
        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
    },
    {
        id: reaction.message.guild.roles.everyone,
        deny: ["VIEW_CHANNEL"]
    },
    {  
      id:  staffid,
    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
    }
  ],
  })
  .then(ch => {
    ch.send(`<@${user.id}> ` ,new Discord.MessageEmbed().setDescription ('**Παρακαλω περιμενετε το staff team θα σας εξυπηρετησει συντομα!!Αν θελετε να κλεισετε καντε react με 🔒**').setColor('#9933FF')).then(msg => msg.react('🔒'))
  })
  }
  if(reaction.emoji.name === "⛔") {
    reaction.users.remove(user);
    
    
    reaction.message.guild.channels.create(`⛔ticket-ban-appeal-${user.username}`, {
      type: "text",
      topic: " ",
       permissionOverwrites: [
      {
          id: user.id,
          allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
      },
      {
          id: reaction.message.guild.roles.everyone,
          deny: ["VIEW_CHANNEL"]
      },
      {  
        id:  staffid,
      allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
      }
    ],
    })
    .then(ch => {
      ch.send(`<@${user.id}>`,new Discord.MessageEmbed().setDescription('**Παρακαλω περιμενετε το staff team θα σας εξυπηρετησει συντομα!!Αν θελετε να κλεισετε καντε react με 🔒**').setColor('#9933FF')).then(msg => msg.react('🔒'))
    })
  }
  if(reaction.emoji.name === "❓") {
      reaction.users.remove(user);
      
      
      reaction.message.guild.channels.create(`❓ticket-other-${user.username}`, {
        type: "text",
        topic: " ",
         permissionOverwrites: [
        {
            id: user.id,
            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
        },
        {
            id: reaction.message.guild.roles.everyone,
            deny: ["VIEW_CHANNEL"]
        },
        {  
          id:  staffid,
            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
        }
      ],
      })
      .then(ch => {
        ch.send(`<@${user.id}> `,new Discord.MessageEmbed().setDescription('**Παρακαλω περιμενετε το staff team θα σας εξυπηρετησει συντομα!!Αν θελετε να κλεισετε καντε react με 🔒**').setColor('#9933FF')).then(msg => msg.react('🔒'))
      })
  }
}
if(reaction.emoji.name === '🔒') {
  if(!reaction.message.channel.name.includes('ticket-')) return;
  
  reaction.message.channel.delete()
  }
})










delta.login("TOKEN")
