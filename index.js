const venom = require('venom-bot');

const { welcome, invalid, end, menuStage1, menuStage2,
menuStage3, msgStage2, stage2msg1, stage2msg2, msgStage3,
stage3msg1, stage3msg2 } = require('./src/info');

//
const senderStates = new Map();

var STAGE = 0;
var timeOut= false;

function timeOutBot() {
  timeOut = true
  setTimeout(() => {
     timeOut = false
  },300000 );
}

//
function getState(sender) {
  if (!senderStates.has(sender)) {
    //
    senderStates.set(sender, {
      STAGE: 0, //
      timeOut: false, //
    });
  }
  return senderStates.get(sender);
}

venom.create({ session: 'session-name' }).then((client) => start(client));

function start(client) {
  client.onMessage((message) => {
    if (message.body && !message.isGroupMsg && !getState(message.from).timeOut) {
      const state = getState(message.from); //

      if (state.STAGE === 0) {
        //
        client.sendText(message.from, welcome + menuStage1);
        state.STAGE = 1;
      } else if (state.STAGE === 1) {
        //
        switch (message.body) {
          case '1':
            client.sendText(message.from, msgStage2 + menuStage2);
            state.STAGE = 2;
            break;
          case '2':
            client.sendText(message.from, msgStage3 + menuStage3);
            state.STAGE = 3;
            break;
          case 'Voltar':
          case 'voltar':
            client.sendText(message.from, welcome + menuStage1);
            state.STAGE = 1;
            break;
          case 'Fim':
          case 'fim':
            client.sendText(message.from, end);
            timeOutBot();
            state.STAGE = 0;
            break;
          default:
            client.sendText(message.from, invalid + menuStage1);
            break;
        }
      } else if (state.STAGE === 2) {
        //
        switch (message.body) {
          case '1':
            client.sendText(message.from, stage2msg1 + menuStage2);
            state.STAGE = 2;
            break;
          case '2':
            client.sendText(message.from, stage2msg2 + menuStage2);
            state.STAGE = 2;
            break;
          case 'Voltar':
          case 'voltar':
            client.sendText(message.from, welcome + menuStage1);
            state.STAGE = 1;
            break;
          case 'Fim':
          case 'fim':
            client.sendText(message.from, end);
            timeOutBot();
            state.STAGE = 0;
            break;
          default:
            client.sendText(message.from, invalid + menuStage2);
            break;
        }
      } else if (state.STAGE === 3) {
        //
        switch (message.body) {
          case '1':
            client.sendText(message.from, stage3msg1 + menuStage3);
            state.STAGE = 3;
            break;
          case '2':
            client.sendText(message.from, stage3msg2 + menuStage3);
            state.STAGE = 3;
            break;
          case 'Voltar':
          case 'voltar':
            client.sendText(message.from, welcome + menuStage1);
            state.STAGE = 1;
            break;
          case 'Fim':
          case 'fim':
            client.sendText(message.from, end);
            timeOutBot();
            state.STAGE = 0;
            break;
          default:
            client.sendText(message.from, invalid + menuStage3);
            break;
        }
      }
    }
  });
}


