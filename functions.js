module.exports={
    getMember: function(message,toFind = ''){
        toFind = toFind.toLowerCase();

        let target = message.guild.members.cache.get(toFind);

        if(!target && message.mentions.members)
           target= message.mentions.members.first();

        if(!target && toFind){
            target = message.guild.members.find(member =>{
                return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }
        if(!target)
        target = message.member;

        return target;
    },
    formatDate: function(date){
        return Intl.DateTimeFormat('tr-TR').format(date);
    },

    promptMessage: async function(message,author, timer , validReactions){
        timer*=1000;
        for (const reaction of validReactions) await message.react(reaction)

      const filter = (reaction,user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        return message     
            .awaitReactions(filter, { max: 1, time: timer, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
                return reaction.emoji.name; 

            })
            .catch(collected => {
                message.reply('Çok fazla bekletildim. Malesef atamıyorum!');
            });
                
                
                
                //collected.first() && collected.first().emoji.name);
    }
}