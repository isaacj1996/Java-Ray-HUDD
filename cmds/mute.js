    // mute
    module.exports.run = async (bot, message, args) => {
       if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission HAHAHAHA");

       let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]); 
       if (!toMute) return message.channel.send("You did not correctly specify which mong to mute.");

       if (toMute.id === message.author.id) return message.channel.send('You cannot mute yourself, you mong');
       if (toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send('You cannot mute this mong, sorry');

       let role = message.guild.roles.find(r => r.name === "Muted");
       if (!role) {
           try {
               role = await message.guild.createRole({
                   name: "Muted",
                   color: "#000000",
                   permissions: []
               });

               message.guild.channels.forEach(async (channel, id) => {
                   await channel.overwritePermissions(role, {
                       SEND_MESSAGES: false,
                       ADD_REACTIONS: false
                   });
               });
           } catch (e) {
               console.log(e.stack);
           }

       }

       if (toMute.roles.has(role.id)) return message.channel.send("This user is a mong.");

       await toMute.addRole(role);
       message.channel.send("This noob is muted.");
       return;
    }

    module.exports.help = {
        name: "mute"
    }
    