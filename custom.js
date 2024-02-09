module.exports = async ({ api }) => {

const configCustom = {
    accpetPending: {
      status: `true`,
      time: 5, // 5 minutes
      note: 'approve waiting messages after a certain time, set the status to false if you want to disable auto accept message request.'
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
          }
      }, config.time * 60 * 1000)
    }
  }
accpetPending(configCustom.accpetPending)
};
