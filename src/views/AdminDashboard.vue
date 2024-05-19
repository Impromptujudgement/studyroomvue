<template>
    <div class="admin-dashboard">
      <div class="header">欢迎登陆自习室预约系统，管理员</div>
      <div class="feature-box">
        <button @click="viewRoomUsage">
          <img class="feature-icon" src="../assets/1.png" alt="自习室使用情况">
          查看自习室使用情况
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      viewRoomUsage() {
        // 此处应实现查看自习室使用情况的逻辑
        console.log('查看自习室使用情况');
        // 对应的路由跳转或弹出窗口等
      },
    },
  };
  </script>
  


  <style scoped>
.admin-dashboard {
  position: relative; /* 设置相对定位是为了让内部绝对定位的元素相对于它定位 */
  min-height: 100vh;
  background-image: url('../assets/2.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

/* 该容器用于放置位于页面左上方的文字 */
.header {
  position: absolute;
  top: 20px; /* 和页面顶部的距离 */
  left: 20px; /* 和页面左侧的距离 */
  font-size: 30px;
  color: #dc0e0e;
  font-family: 'Helvetica Neue', sans-serif;
  z-index: 2; /* 确保在feature-box上层显示 */
}
.feature-box {
  padding: 20px;         /* 提供足够的内边距 */
  min-width: 800px;      /* 设定一个最小宽度, 根据需要调整 */
  min-height: 400px;     /* 设定一个最小高度, 根据需要调整 */
  max-width: 80%;        /* 确保在大屏幕上不会过大 */
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  border-radius: 10px;   /* 根据需要调整 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  display: flex;
  flex-direction: row; /* 子元素垂直排列，根据需要可以改为row */
  flex-wrap: wrap;
  align-items: flex-start;   /* 子元素在交叉轴上居中 */
  justify-content: flex-start;  /* 子元素在主轴上顶部对齐 */
  gap: 20px;              /* 子元素之间的间距 */
}

 button {
    font-size: 15px;
    padding: 10px 20px;
    border: 2px solid #007bff;
    background-color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px; /* 用于图标和文字之间的间隔 */
  }
  
  .feature-icon {
    width: 40px; /* 根据实际需求调整图标大小 */
  }
  
  button:hover {
    background-color: #007bff;
    color: white;
  }
  
  </style>