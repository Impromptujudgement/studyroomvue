
<template>
  <div class="container">
    <h1 class="title">复旦大学自习室预约系统</h1>
    <img src="./assets/logo1.png" alt="复旦大学" class="logo">
    
    <div class="login-container">
      <form @submit.prevent>
        <div>
          <label for="username">用户名:</label>
          <input type="text" id="username" v-model="credentials.username" required>
        </div>

        <div>
          <label for="password">密码:</label>
          <input type="password" id="password" v-model="credentials.password" required>
        </div>

        <!-- 管理员登录按钮 -->
        <button @click="handleAdminLogin" type="button">管理员登录</button>

        <!-- 学生登录按钮 -->
        <button @click="handleStudentLogin" type="button">学生登录</button>
      </form>
    </div>
  </div>
</template>





<script>
export default {
  name: "App",
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      // imgSrc: require('./assets/background.png')
    };
  },
  methods: {
    handleSubmit() {
      // 实现登录逻辑
      console.log('尝试登录', this.credentials);
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  background-image: url('./assets/background.png');
  background-size: cover;
  background-position: center;
}
.title {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px; /* 根据需要调整 */
  font-size: 50px; /* 或根据设计需求调整大小 */
  color: #8f8cf0; /* 淡黄色，对比深色背景效果良好 */
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; /* 这里选择了一种常见且美观的字体 */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 添加一些文字阴影，提高深色背景上的可读性 */
}
.logo {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  filter: brightness(90%) sepia(20%);
  border: 5px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* 其他样式 */
}
.login-container {
  text-align: center;
  padding: 30px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  font-size: 24px; /* 调整字体大小 */
  color: #146b24; /* 字体颜色 */
  font-family: 'Open Sans', sans-serif; /* 更新字体家族，根据你的实际选择改变 */
  font-weight: bold;
  /* 更多样式 */
}

.login-container p {
  margin-bottom: 1em; /* 增加段落下方的空间 */
  /* 更多段落样式 */
}

/* 设定按钮的样式 */
button {
  font-size: 15px; /* 调整按钮内的字体大小 */
  color: #ffffff; /* 白色字体很适合深色背景 */
  font-family: 'Open Sans', sans-serif; /* 与其他文本保持一致的字体 */
  font-weight: 600; /* 轻微加粗的字体 */
  padding: 10px 20px; /* 增加填充 */
  margin: 5px; /* 在按钮之间添加一些空间 */
  border: none; /* 移除边框 */
  border-radius: 5px; /* 轻微的边角 */
  background-color: #007bff; /* 按钮背景颜色，可以根据你的品牌颜色来定制 */
  cursor: pointer; /* 当鼠标悬停时显示指针 */
  /* 更多样式，例如hover效果 */
}

button:hover {
  background-color: #0056b3; /* 按钮悬停时的背景颜色 */
  /* 更多悬停样式 */
}
.login-container div {
  margin-bottom: 20px; /* 调整输入框与下一个元素（也就是下一个输入框或按钮）之间的间隔 */
}

.login-container button {
  margin-top: 20px; /* 给按钮增加上边距以与上方元素分开 */
  margin-bottom: 10px; /* 如果需要，在按钮之间也增加一些间隔 */
}
</style>
