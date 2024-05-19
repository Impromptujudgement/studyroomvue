<template>
    <div class="admindashboard">
      <h1>欢迎回来，{{ username }}</h1>
      <!-- 在这里添加更多仪表盘内容 -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '管理员', // 实际应用中这个应该从用户的状态管理或者API获取
      };
    },
    // 可以添加更多生命周期钩子、方法等
  };
  </script>
  
  <style>
  /* 在这里添加CSS样式 */
  .admindashboard {
    padding: 20px;
  }
  </style>