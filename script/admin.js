const fs = require('fs');
module.exports.config = {
  name: 'admin',
  version: '1.0.0',
  cooldown: 5,
  role: 1,
  hasPrefix: true,
  aliases: ['system'],
  description: "this command is for admin only.",
  usage: "{pref}[name of cmd] [ban/unban]",
  credits: "Ainz"
};

module.exports.run = async function ({ api, event, args }) {
  const input = args.join(' ');
  const historyData = JSON.parse(fs.readFileSync('./history.json', 'utf-8'));
  const adminOfAdmin = historyData.find(admin => admin.userid === api.getCurrentUserID());
  const admin = adminOfAdmin ? adminOfAdmin.admin : false; 
  const query = input.split(' ').map(item => item.trim());

  if (admin) {
    switch (query[0]) { 
      case 'add':
        if (!query[1] || isNaN(query[1])) {
          api.sendMessage('Invalid usage: To add an admin, please use the format: admin add [userID]', event.threadID, event.messageID);
        } else {
          addAdmin(query[1]);
        }
        break;
      case 'remove':
        if (!query[1] || isNaN(query[1])) {
          api.sendMessage('Invalid usage: To remove an admin, please use the format: admin remove [userID]', event.threadID, event.messageID);
        } else {
          removeAdmin(query[1]);
        }
        break;
      case 'ban':
        if (!query[1] || isNaN(query[1])) {
          api.sendMessage('Invalid usage: To ban a user, please use the format: admin ban [userID]', event.threadID, event.messageID);
        } else {
          banUser(query[1]);
        }
        break;
      case 'unban':
        if (!query[1] || isNaN(query[1])) {
          api.sendMessage('Invalid usage: To unban a user, please use the format: admin unban [userID]', event.threadID, event.messageID);
        } else {
          unbanUser(query[1]);
        }
        break;
      default:
        api.sendMessage('Invalid command. Usage: admin [add | remove | ban | unban] [userID]', event.threadID, event.messageID);   
        break;
    }
  } else {
    api.sendMessage('You are not authorized to perform this action.', event.threadID, event.messageID);
  }

  function addAdmin(uid) {
    const admins = adminOfAdmin ? adminOfAdmin.admin : []; 
    admins.push(uid);
    adminOfAdmin.admin = admins;
    fs.writeFileSync('./history.json', JSON.stringify(historyData, null, 2), 'utf-8'); 
    api.sendMessage(`Admin ${uid} successfully added.`, event.threadID, event.messageID);
  }

  function removeAdmin(uid) {
    const admins = adminOfAdmin ? adminOfAdmin.admin : []; 
    const index = admins.indexOf(uid);
    if (index !== -1) {
      admins.splice(index, 1);
      adminOfAdmin.admin = admins;
      fs.writeFileSync('./history.json', JSON.stringify(historyData, null, 2), 'utf-8'); 
      api.sendMessage(`Admin ${uid} successfully removed.`, event.threadID, event.messageID);
    } else {
      api.sendMessage('Admin not found.', event.threadID, event.messageID);
    }
  }

  function banUser(uid) {
    const blacklist = adminOfAdmin ? adminOfAdmin.blacklist : []; 
    blacklist.push(uid);
    adminOfAdmin.blacklist = blacklist;
    fs.writeFileSync('./history.json', JSON.stringify(historyData, null, 2), 'utf-8'); 
    api.sendMessage(`User ${uid} has been banned.`, event.threadID, event.messageID);
  }

  function unbanUser(uid) {
    const blacklist = adminOfAdmin ? adminOfAdmin.blacklist : []; 
    const index = blacklist.indexOf(uid);
    if (index !== -1) {
      blacklist.splice(index, 1);
      adminOfAdmin.blacklist = blacklist;
      fs.writeFileSync('./history.json', JSON.stringify(historyData, null, 2), 'utf-8'); 
      api.sendMessage(`User ${uid} has been unbanned.`, event.threadID, event.messageID);
    } else {
      api.sendMessage('User not found in the blacklist.', event.threadID, event.messageID);
    }
  }
}
