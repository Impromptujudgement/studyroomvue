<template>
    <div class="admin-dashboard">
        <div class="header">欢迎登陆自习室预约系统，管理员</div>
        <div class="feature-box">
            <div class="functions-title">全部功能</div>
            <button @click="viewRoomUsage">
                <img class="feature-icon" src="../assets/1.png" alt="自习室使用情况">
                查看自习室使用情况
            
            </button>
            <button @click="changeRoomUsage">
                <img class="feature-icon" src="../assets/4.png" alt="自习室状态设置">
                设置自习室状态
            </button>
        </div>
        <!-- 自习室列表模态框 -->
        <div v-if="showModal" class="modal-overlay" @click="closeRoomUsage">
            <div class="modal-content" @click.stop>
                <h2 class="modal-title">自习室列表</h2>
                <!-- 自习室列表 -->
                <div class="rooms">
                    <router-link v-for="room in rooms" :key="room" :to="{ name: 'room-layout', params: { id: room } }"
                        class="room">
                        <div class="room-box">
                            {{ room }}
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div v-if="showChangeModal" class="modal-overlay" @click="closeRoomUsage">
            <div class="modal-content" @click.stop>
                <h2 class="modal-title">选择自习室以更改状态</h2>
                <div class="rooms">
                    <router-link v-for="room in rooms" :key="room" :to="{ name: 'room-change', params: { id: room } }"
                        class="room">
                        <div class="room-box">
                            {{ room }}
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false, // 控制模态框显示或隐藏
            showRoomDetail: false, // 控制自习室详细信息的显示
            selectedRoom: null, //当前选中的自习室
            showChangeModal: false,
        };
    },
    methods: {
        viewRoomUsage() {
            this.showModal = true; // 显示模态框
        },
        closeRoomUsage() {
            this.showModal = false; // 隐藏模态框
        },
        navigateToRoom(roomId) {
            // 使用编程式导航跳转到自习室A101的页面
            this.$router.push({ name: 'room-layout', params: { id: roomId } });
        },
        changeRoomUsage() {
        this.showChangeModal = true; // 新增
    },
    },
    computed: {
        rooms() {
            // 生成自习室列表
            let rooms = [];
            for (let floor of ['A', 'B']) {
                for (let number of [1, 2, 3]) { // 增加序列以覆盖更多楼层
                    for (let room of Array.from({ length: 9 }, (_, i) => `${floor}${number}0${i + 1}`)) {
                        rooms.push(room);
                    }
                }
            }
            return rooms;
        },
    }
};
</script>



<style scoped>
.admin-dashboard {
    position: relative;
    /* 设置相对定位是为了让内部绝对定位的元素相对于它定位 */
    min-height: 100vh;
    background-image: url('../assets/2.png');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    /* 垂直居中 */
    justify-content: center;
    /* 水平居中 */
}

/* 该容器用于放置位于页面左上方的文字 */
.header {
    position: absolute;
    top: 20px;
    /* 和页面顶部的距离 */
    left: 20px;
    /* 和页面左侧的距离 */
    font-size: 30px;
    color: #dc0e0e;
    font-family: 'Helvetica Neue', sans-serif;
    z-index: 2;
    /* 确保在feature-box上层显示 */
}

.feature-box {
    padding: 20px;
    /* 提供足够的内边距 */
    min-width: 800px;
    /* 设定一个最小宽度, 根据需要调整 */
    min-height: 400px;
    /* 设定一个最小高度, 根据需要调整 */
    max-width: 80%;
    /* 确保在大屏幕上不会过大 */
    background-color: rgba(0, 0, 0, 0.5);
    /* 半透明黑色背景 */
    border-radius: 10px;
    /* 根据需要调整 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* 阴影效果 */
    display: flex;
    flex-direction: row;
    /* 子元素垂直排列，根据需要可以改为row */
    flex-wrap: wrap;
    align-items: flex-start;
    /* 子元素在交叉轴上居中 */
    justify-content: flex-start;
    /* 子元素在主轴上顶部对齐 */
    gap: 20px;
    /* 子元素之间的间距 */
    position: relative;
    padding-top: 60px;
}

.functions-title {
    position: absolute;
    /* 使用绝对定位 */
    top: 20px;
    /* 顶部留出20px间隔 */
    left: 20px;
    /* 左侧留出20px间隔 */
    font-size: 20px;
    /* 根据需要调整字体大小 */
    color: #1de95a;
    /* 根据需求和背景颜色调整字体颜色 */
    z-index: 5;
    /* 确保文字在最上层显示 */
}

button {
    font-size: 15px;
    padding: 10px 20px;
    border: 2px solid #007bff;
    background-color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    /* 用于图标和文字之间的间隔 */
}

.feature-icon {
    width: 40px;
    /* 根据实际需求调整图标大小 */
}

button:hover {
    background-color: #007bff;
    color: white;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    max-height: 80vh;
    overflow-y: auto;
    gap: 10px;
}

.modal-title {
    text-align: center;
    /* 居中标题 */
    margin-bottom: 20px;
    /* 在标题和列表项之间添加一些间距 */
    color: rgb(130, 38, 235);
    /* 根据模态框的背景颜色调整标题的颜色 */
    font-size: 24px;
    /* 设置标题的大小 */
}

.room-item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

.room-list .room-item {
    cursor: pointer;
    /* 可以有更多的样式，如padding, border, hover效果等 */
}

.room-item:hover {
    background-color: #f0f0f0;
    /* 鼠标悬停效果 */
}

.seats-panel {
    display: none;
    /* 默认不显示，但当showSeats为true时会显示 */
    /* 其他样式，比如padding, shadow 等 */
}

.room-listing {
  text-align: center; /* 中心对齐房间列表标题 */
}

.rooms {
  display: flex;
  flex-wrap: wrap; /* 允许项换行 */
  gap: 16px; /* 项之间的间隙 */
  justify-content: flex-start; /* 从左侧对齐 */
  margin: 0 auto; /* 水平居中 */
  max-width: 800px; /* 容器最大宽度，根据需要调整 */
}

.room {
  text-decoration: none; /* 去除超链接的下划线 */
  flex: 0 0 calc(25% - 16px); /* 设置宽度为25%减去间隙，使得一行有4个 */
  max-width: calc(25% - 16px); /* 最大宽度也设置为25%减去间隙 */
}

.room-box {
  display: block; /* 设置为块级元素 */
  padding: 12px; /* 内边距，根据需要调整 */
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;
  text-align: center; /* 文字居中 */
  height: 100px; /* 固定高度，根据需要调整 */
  box-sizing: border-box; /* 把边框和内边距包含在宽度和高度内 */
  transition: background-color 0.3s;
}

.room-box:hover {
  background-color: #1a98ec;
}
</style>