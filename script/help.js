module.exports.config = {
  name: 'help',
  version: '1.0.0',
  cooldown: 5,
  role: 0,
  hasPrefix: true,
  aliases: ['info'],
  description: "this command may help you",
  usage: "{pref}[name of cmd] [page/nameofcmd]",
  credits: "Ainz"
};
module.exports.run = async function({
  api,
  event,
  enableCommands,
  args,
  Utils,
  prefix
}) {
  const input = args.join(' ');
  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;
    if (!input) {
      const pages = 20;
      let page = 1;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `╭───𝖢𝖬𝖣𝖲 𝖫𝖨𝖲𝖳✨\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `│───[\t${i + 1} ]•[${prefix}${commands[i]}]\n`;
      }
      helpMessage += '╰──────────❍\n\n╭───𝖤𝖵𝖤𝖭𝖳 𝖫𝖨𝖲𝖳☁\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `│───[\t${index + 1} ]•[${prefix}${eventCommand}]\n`;
      });
      helpMessage += `╰──────────❍\n\nPage ${page}/${Math.ceil(commands.length / pages)}. To view the next page, type '${prefix}help page number'. To view information about a specific command, type '${prefix}help command name'.`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (!isNaN(input)) {
      const page = parseInt(input);
      const pages = 20;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `╭───𝖢𝖬𝖣𝖲 𝖫𝖨𝖲𝖳✨\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `│───[\t${i + 1} ]•[${prefix}${commands[i]}]\n`;
      }
      helpMessage += '│───𝖤𝖵𝖤𝖭𝖳 𝖫𝖨𝖲𝖳☁\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `│───[\t${index + 1} ]•[${prefix}${eventCommand}]\n`;
      });
      helpMessage += `╰──────❍\n\nPage ${page} of ${Math.ceil(commands.length / pages)}`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input?.toLowerCase()))?.[1];
      if (command) {
        const {
          name,
          version,
          role,
          aliases = [],
          description,
          usage,
          credits
        } = command;
        const roleMessage = role !== undefined ? (role === 0 ? 'Permission: User' : 'Permission: Admin') : '';
        const aliasesMessage = aliases.length ? `Aliases: ${aliases.join(', ')}` : '';
        const descriptionMessage = description ? `Description: ${description}` : '';
        const usageMessage = usage ? `Usage: ${usage}` : '';
        const creditsMessage = credits ? `Credits: ${credits}` : '';
        const message = `╭───❒𝖨𝖭𝖥𝖮 𝖢𝖬𝖣𝖲🌟\n│───Name: ${name}\n│───Version: ${version}\n│───${roleMessage}\n│───${aliasesMessage}\n│───${descriptionMessage}\n│───${usageMessage}\n│───${creditsMessage}\n╰──────❍`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('Command not found.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.log(error);
  }
}; 
