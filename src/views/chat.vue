<template>
<div>
<textarea v-model="chatLog" cols="100" rows="20"></textarea><br>
<input v-model="message" type="text" size="100" @keyup.enter="sendMessage"><br>
  <input v-model="ip" type="text" size="100" @keyup.enter="connect2robot">
<button @click="connect">connect</button>
</div>
</template>

<script>
export default {
data() {
return {
chatLog: '',
message: '',
roomName: null,
chatSocket: null,
  ip:''
}
},
mounted() {
this.chatSocket = new WebSocket(
'ws://'+'127.0.0.1:8000'+'/my_socket/'
);

this.chatSocket.onmessage = (e) => {
  const data = JSON.parse(e.data);
  console.log(data)
  console.log(e)
  // this.chatLog += (typeof (data.message) + '\n');
  // const obj=JSON.parse(data.message)

};

this.chatSocket.onclose = (e) => {
  console.error('Chat socket closed unexpectedly');
};
},
methods: {
sendMessage() {
this.chatSocket.send(JSON.stringify({
  'type':'message',
'message': this.message
}));
this.message = '';
},
async connect(){
  console.log('connecting')
  const data={
          "type":'connect',
          "ip":this.ip,
        };
  this.chatSocket.send(JSON.stringify(data))
}
}
}
</script>