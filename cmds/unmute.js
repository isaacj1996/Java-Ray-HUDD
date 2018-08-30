module.exports.run = async (bot, message, args) => {
       if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission HAHAHAHA");

       let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
       if (!toMute) return message.channel.send("You did not correctly specify which mong to unmute.");

       let role = message.guild.roles.find(r => r.name === "Muted");

       if (!role || !toMute.roles.has(role.id)) return message.channel.send("This mong is no longer muted.");

       await toMute.removeRole(role);
       message.channel.send("This noob is not muted.");
       return;
    
}

module.exports.help = {
    name: "unmute"
}
