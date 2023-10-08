<template>
  <p>this is the math game vue</p>
    <div class="slider-block">
      <div class="slider-item">
        <span class="demonstration">鼠标视角控制器</span>
        <el-switch v-model="mouseValue" @change="switchChange" />
      </div>
      <div class="slider-item">
        <span class="demonstration">主动控制</span>
        <el-switch v-model="controlsignal" @change="switchcontrolChange" />
      </div>
      <div class="slider-item">
        <span class="demonstration">关节一（绕Y轴旋转）</span>
        <el-slider
          v-model="value1"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D1', 'y')"
        />
      </div>
      <div class="slider-item">
        <span class="demonstration">关节二（绕Z轴旋转）</span>
        <el-slider
          v-model="value2"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D2', 'z')"
        />
      </div>
      <div class="slider-item">
        <span class="demonstration">关节三（绕Z轴旋转）</span>
        <el-slider
          v-model="value3"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D3', 'z')"
        />
      </div>
      <div class="slider-item">
        <span class="demonstration">关节四（绕Z轴旋转）</span>
        <el-slider
          v-model="value4"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D4', 'z')"
        />
      </div>

    </div>

  <div>
    <div>
      <label for="user-name">Username</label>
      <input name="user-name" id="user-name" v-model="userName"/>
    </div>
    <div>
      <label for="score">score</label>
      <input name="score" type="number" id="score" v-model="score"/>
    </div>
    <button @click="buildconnect">connect</button>
    <button @click="send">send</button>
    <button @click="disconnect">disconnect</button>
  </div>
</template>
<!--v-model：双向数据绑定-->
<style>
  div,label{
    padding:0.2rem;
  }
</style>

<script setup>
import { ref, defineEmits } from "vue";
const pi=Number(Math.PI.toFixed(2))
const mouseValue = ref(true);//ref方法括号中是初始值
const controlsignal = ref(false);
const value1 = ref(0);
const value2 = ref((80/180)*pi);
const value3 = ref(-(160/180)*pi);
const value4 = ref(-(110/180)*pi);
const userName=ref();
const score=ref();
const min = ref(Number(-Math.PI.toFixed(2)));
const max = ref(Number(Math.PI.toFixed(2)));
const value={};
const emit = defineEmits(["slideroutput", "switchChange","switchcontrolChange"]);//defineemit回传一个对象，这个对象用于跟父级通信，这里声明了两个对象的子模块，下面调用emit方法更改模块值
var socket=null;
const sliderInput = (e, name, direction) => {
  value.e=e
  value.name=name
  value.direction=direction
  emit("slideroutput", e, name, direction);
  socket.send(JSON.stringify(value))//自动发送
};

const switchChange = (e) => {

  emit("switchChange", e);
};
const switchcontrolChange= (e) => {
  emit("switchcontrolChange", e);
}
  const buildconnect= (e) =>{
      console.log(value)
      socket=new WebSocket(
      'ws://'+window.location.host+'/my_socket/'
      );
      socket.addEventListener('open', () => {
    // 连接成功后发送消息
        console.log('连接成功');
     socket.send('Hello, server!')
    })

    socket.addEventListener('message', event => {
    // 处理收到的消息
    console.log('Received message:', event.data)
    })

    socket.addEventListener('close', event => {
    // 连接关闭时处理
    console.log('Connection closed:', event.code, event.reason)
    })
    };

      const send=()=>{
        socket.send(JSON.stringify(value))
      };
      const disconnect=()=>{
        socket.close()
      }
</script>

<style scope>
.slider-block {
  padding: 20px 10px;
}
.slider-item {
  margin: 20px 0;
}
.demonstration {
  margin: 0 10px 10px 0;
}
</style>