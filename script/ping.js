module.exports.config = {
  name: "ping",
  version: "1.0.0",
  cooldown: 5,
  role: 0,
  hasPrefix: true,
  aliases: ['system'],
  description: "this command may help you to see ping/ms",
  usage: "{pref}[name of cmd]",
  credits: "Ainz"
};

// Start Execution
module.exports.run = async ({ api, event }) => {
 try {
  const a = Date.now() - Date.now();
    api.sendMessage(`╭───❒𝖯𝖨𝖭𝖦/𝖬𝖲✨\n│── ${a}ms\n╰───────────❍`, event.threadID);
  } catch (error) {
    api.sendMessage("Unable to send message", event.threadID);
  }
};
