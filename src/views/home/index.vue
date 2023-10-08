<template>
  <el-container>
    <el-drawer v-model="drawer" direction="ltr" size="100%">
      <!-- 这里绘制了抽屉组件，ltr是指从左往右展开 -->
      <el-aside>
        <Menu @slideroutput="sliderInput" @switchChange="switchChange" @switchcontrolChange="switchcontrol"/>
         <!-- 等号左边@是组件内的defineemit回传对象，等号右边是这个页面的函数 -->
      </el-aside>
    </el-drawer>
    <el-main>
      <div class="btn" v-show="!drawer">
        <el-button
          type="primary"
          :icon="Operation"
          circle
          size="large"
          @click="drawerSwitch"
        />
      </div>
      <Robot3d ref="Robot3dRef" />
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from "vue";
import Menu from "./components/Menu/index.vue";
import Robot3d from "./components/Robot3d/index.vue";
import { Operation } from "@element-plus/icons-vue";
const Robot3dRef = ref();//创建响应式变量，自动刷新视图
const value={}
const sliderInput = (e, name, direction) => {
  value.e=e
  value.name=name
  value.direction=direction
  Robot3dRef.value.setRobotRotation(e, name, direction);
};
const switchChange = (e) => {
  Robot3dRef.value.setControlsEnabled(e);
};
const switchcontrol=(e)=> {
  if(e)
  {
    try {
      const socket=new WebSocket('ws://'+window.location.host+'/my_socket/')
      socket.addEventListener('open', () => {
    // 连接成功后发送消息
        console.log('连接成功');
      socket.send('Hello, server!')
      })
      socket.addEventListener('close', event => {
    // 连接关闭时处理
    console.log('Connection closed:', event.code, event.reason)
    })
    }
    catch (error){
      console.log(error.message)
    }
    // console.log(value);
  }
  else {
    console.log(value);
  }

};
const drawer = ref(true );
const drawerSwitch = () => {
  drawer.value = !drawer.value;
};
</script>

<style scscope>
.el-aside {
  width: 100%;
  background-color: #304156;
  color: #eee;
}
.el-overlay {
  max-width: 450px;
}
.el-drawer__header {
  margin: 0;
  background-color: #304156;
  color: #eee;
}
.el-drawer__body {
  background-color: #304156;
  padding: 0;
}
.el-container {
  height: 100%;
}
.el-main {
  padding: 0;
  margin: 0;
  overflow: hidden;
  outline: none;
}
.btn {
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
