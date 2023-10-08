# RobotArm-Visual-Model

该项目通过vue框架结合js实现了一个网页端的3轴机械臂建模，并支持实时渲染

##Getting Start
Open terminal and run the following command
`npm run dev`
After click the link shown in terminal,you will see the model in the website as below:
![](/doc-img/display-result.png)
##核心代码说明
该项目使用 three.js 构建 3D 机械臂  
`BaseManager.js` 包含了机械臂的建模,如果需要修改机械臂样式，请根据该文件中的代码注释进行修改
`Robot3d\index.vue` 实现 3D 场景的呈现并调用 BaseManager 类进行渲染
`Menu\index.vue`实现了控制UI
`home\index.vue`引入了之前定义的机械臂区间及控制界面组件
通过以上代码即可构建一个多轴机械臂的3D模型

