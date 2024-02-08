module.exports = async ({ api }) => {

const configCustom = {
  autoDeleteCache: {
      status: true,
      time: 5, // 5 minutes
      note: 'auto delete caches, kindly set the status to true, if you dont want to delete caches, set the status to false.'
    },
  autoRestart: {
      status: true,
      time: 60, // 60 minutes
      note: 'to avoid problems, enable periodic bot restarts, set the status to false if you want to disable auto restart function.'
    },
    accpetPending: {
      status: `true`,
      time: 5, // 5 minutes
      note: 'approve waiting messages after a certain time, set the status to false if you want to disable auto accept message request.'
    }
  }
  function autoDeleteCache(config) {
    if(config.status) {
      setInterval(async () => {
        const { exec } = require('child_process');
        exec('rm -rf ./script/cache && mkdir -p ./script/cache', (error, stdout, stderr) => {
        if (error) {
          console.log(`error : ${error}`)
          return;
        }
        if (stderr) {
          console.log(`stderr : ${stderr}`)
          return;
        }
        return console.log(`successfully deleted caches`)
        })
      }, config.time * 60 * 1000)
    }
  }
  function autoRestart(config) {
    if(config.status) {
      setInterval(async () => {
        console.log(`auto restart is processing, please wait.`)
        process.exit(1)
      }, config.time * 60 * 1000)
    }
  }
  function accpetPending(config) {
    if(config.status) {
      setInterval(async () => {
          const list = [
              ...(await api.getThreadList(1, null, ['PENDING'])),
              ...(await api.getThreadList(1, null, ['OTHER']))
          ];
          if (list[0]) {
              api.sendMessage('📨 This thread is automatically approved by our system.', list[0].threadID);
            console.log('Successfully accept on the pending list');
          }
      }, config.time * 60 * 1000)
    }
  }
autoDeleteCache(configCustom.autoDeleteCache)
autoRestart(configCustom.autoRestart)
accpetPending(configCustom.accpetPending)
};
