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

            <button @click="changeRoomTime">
                <img class="feature-icon" src="../assets/5.png" alt="开放时间设置">
                设置自习室开放时间
            </button>
            <div class="room-input">
                <input v-model="newRoomId" placeholder="输入房间名称：">
                <div class="buttons">
                    <button @click="addRoom(newRoomId)">添加房间</button>
                    <button @click="removeRoom(newRoomId)">删除房间</button>
                </div>
            </div>
            <div v-if="message" class="message">{{ message }}</div>
        </div>
        <!-- 自习室列表模态框 -->
        <div v-if="showModal" class="modal-overlay" @click="closeRoomUsage">
            <div class="modal-content" @click.stop>
                <h2 class="modal-title">自习室列表</h2>
                <!-- 自习室列表 -->
                <div class="rooms">
                    <router-link v-for="room in rooms" :key="room.name"
                        :to="{ name: 'room-layout', params: { id: room.name } }" class="room">
                        <div class="room-box">
                            {{ room.name }} 
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div v-if="showChangeModal" class="modal-overlay" @click="closeRoomUsage">
            <div class="modal-content" @click.stop>
                <h2 class="modal-title">选择自习室以更改状态</h2>
                <div class="rooms">
                    <router-link v-for="room in rooms" :key="room.name"
                        :to="{ name: 'room-change', params: { id: room.name } }" class="room">
                        <div class="room-box">
                            {{ room.name }} 
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div v-if="showChangeTimeModal" class="modal-overlay" @click="closeRoomUsage">
            <div class="modal-content" @click.stop>
                <h2 class="modal-title">选择自习室更改开放时间</h2>
                <div class="rooms">
                    <router-link v-for="room in rooms" :key="room.name"
                        :to="{ name: 'room-timechange', params: { id: room.name } }" class="room">
                        <div class="room-box">
                            {{ room.name }} 
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
            showChangeTimeModal: false,
            rooms: [],
            newRoomId: '',
            message: '',
        };
    },
    created() {
        this.loadRooms(); // 页面加载时从localStorage中恢复rooms
    },
    methods: {
        generateRooms() {
            let rooms = [];
            for (let floor of ['A', 'B']) {
                for (let number of [1, 2, 3]) {
                    for (let room of Array.from({ length: 9 }, (_, i) => `${floor}${number}0${i + 1}`)) {
                        rooms.push({ name: room, openTime: '00:00', closeTime: '24:00' });
                    }
                }
            }
            return rooms;
        },
        saveRooms() {
            localStorage.setItem('rooms', JSON.stringify(this.rooms)); // 将rooms保存到localStorage
        },
        loadRooms() {
            const rooms = localStorage.getItem('rooms');
            if (rooms) {
                this.rooms = JSON.parse(rooms); // 从localStorage中加载rooms
                this.sortRooms();
            } else {
                this.rooms = this.generateRooms(); // 如果localStorage中没有rooms数据，则生成默认的rooms列表
            }
        },
        sortRooms() {
            this.rooms.sort((a, b) => a.localeCompare(b)); // 按字母顺序排序
        },
        viewRoomUsage() {
            // console.log(this.rooms); // 打印整个房间数组
            for (let room of this.rooms) {
                // console.log(room.name);// 打印每个房间的名
                // console.log(room.openTime);
                console.log(room.closeTime);

            }
            this.showModal = true; // 显示模态框
        },
        closeRoomUsage() {
            this.showModal = false; // 隐藏模态框
        },
        navigateToRoom(roomId) {
            // 使用编程式导航跳转到自习室A101的页面
            if (roomId) {
                this.$router.push({ name: 'room-layout', params: { id: roomId } });
            }
            else {
                console.error("Missing roomId");
            }
        },
        changeRoomUsage() {
            this.showChangeModal = true; // 新增
        },
        changeRoomTime() {
            this.showChangeTimeModal = true;
        },
        addRoom(roomId) {
            if (roomId && !this.rooms.includes(roomId)) {
                this.rooms.push({ name: roomId, openTime: '00:00', closeTime: '24:00' });
                this.newRoomId = '';
                this.message = `房间 ${roomId} 添加成功`;
                this.sortRooms();
                this.saveRooms(); // 保存rooms到localStorage
                this.message = '';
            }
            else {
                alert("Room ID is either empty or already exists");
            }
        },
        removeRoom(roomId) {
            if (this.rooms.includes(roomId)) {
                this.rooms = this.rooms.filter(room => room.name !== roomId);
                this.newRoomId = '';
                this.message = `房间 ${roomId} 删除成功`;
                this.sortRooms();
                this.saveRooms(); // 保存默认的rooms列表到localStorage
                this.message = '';
            }
            else {
                alert("Room ID does not exist");
            }
        }
    },
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
    text-align: center;
    /* 中心对齐房间列表标题 */
}

.rooms {
    display: flex;
    flex-wrap: wrap;
    /* 允许项换行 */
    gap: 16px;
    /* 项之间的间隙 */
    justify-content: flex-start;
    /* 从左侧对齐 */
    margin: 0 auto;
    /* 水平居中 */
    max-width: 800px;
    /* 容器最大宽度，根据需要调整 */
}

.room {
    text-decoration: none;
    /* 去除超链接的下划线 */
    flex: 0 0 calc(25% - 16px);
    /* 设置宽度为25%减去间隙，使得一行有4个 */
    max-width: calc(25% - 16px);
    /* 最大宽度也设置为25%减去间隙 */
}

.room-box {
    display: block;
    /* 设置为块级元素 */
    padding: 12px;
    /* 内边距，根据需要调整 */
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #333;
    text-align: center;
    /* 文字居中 */
    height: 100px;
    /* 固定高度，根据需要调整 */
    box-sizing: border-box;
    /* 把边框和内边距包含在宽度和高度内 */
    transition: background-color 0.3s;
}

.room-box:hover {
    background-color: #1a98ec;
}

.message {
    color: red;
    /* 设置文字颜色为红色 */
    font-weight: bold;
    /* 设置文字加粗 */
    font-family: Arial, sans-serif;
    /* 设置字体样式 */
    /* 可以根据需要添加其他样式，例如边框、背景色等 */
}

.room-input {
    margin-top: 5px;
    width: 100%;
    /* 使输入框和按钮组占据整个容器宽度 */
}

.buttons>button {
    margin-bottom: 5px;
    /* 给按钮之间添加一些间距 */
}
</style>