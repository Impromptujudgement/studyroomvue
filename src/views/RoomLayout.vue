<template>
    <div class="layout-container">
        <h1>自习室 {{ $route.params.id }} 座位使用情况</h1>
        <div class="classroom">
            <div v-for="seat in seats" :key="seat.id" :class="['seat', seat.status]">
                <div class="chair-icon"></div>
                <div class="seat-number"> {{ seat.id }}</div>
            </div>
        </div>
        <div class="legend">
            <div class="legend-title">座位状态说明</div> <!-- 添加图例标题 -->
            <div class="legend-item">
                <span class="color-sample available"></span>空闲可用
            </div>
            <div class="legend-item">
                <span class="color-sample occupied"></span>使用中
            </div>
            <div class="legend-item">
                <span class="color-sample reserved"></span>已预约
            </div>
            <div class="legend-item">
                <span class="color-sample unavailable"></span>未开放
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            seats: Array.from({ length: 100 }, (_, i) => ({
                id: i + 1,
                status: 'available' // 初始所有座位为可使用状态
            })),
            statusDescriptions: {
                available: '空闲可用',
                occupied: '使用中',
                reserved: '已预约',
                unavailable: '未开放'
            }
        };
    }
};
</script>

<style scoped>
.layout-container {
    position: relative;
    max-width: 800px;
    /* 整体布局容器的最大宽度，根据需要调整 */
    margin: auto;
}

.classroom {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 10px;
    margin-top: 100px;
    /* 预留空间防止和说明框重合 */
}



.legend {
    position: fixed;
    top: 10px;
    /* 上边距 */
    left: 10px;
    /* 左边距 */
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 1000;
    /* 确保图例在其他元素上面 */
}

.legend-title {
    font-weight: bold;
}

.legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}


.color-sample {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border: 1px solid #000;
    /* for visibility against light backgrounds */
}

.color-sample.available {
    background-color: #bdebbd;
    /* Green */
}

.color-sample.occupied {
    background-color: #ff9999;
    /* Red */
}

.color-sample.reserved {
    background-color: #ffd699;
    /* Yellow */
}

.color-sample.unavailable {
    background-color: #cccccc;
    /* Grey */
}


.seat-number {
    font-size: 0.9em;
    /* 设置编号文本的字体大小 */
    color: #555;
    /* 设置编号文本的颜色 */
    margin-top: 5px;
    /* 在图标下方添加一些空间 */
}

.seat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    width: 100%;
    height: 100px;
    /* 或根据需要调整 */
}

.chair-icon {
    width: 50px;
    /* 调整适当的尺寸 */
    height: 50px;
    margin-bottom: 5px;
    /* 图标下方间隔 */
    background-image: url('../assets/3.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

/* 根据状态改变背景色 */
.available .chair-icon {
    background-color: #bdebbd;
    /* 示例颜色，根据需要修改 */
}

.occupied .chair-icon {
    background-color: #ff9999;
    /* 示例颜色，根据需要修改 */
}

.reserved .chair-icon {
    background-color: #ffd699;
    /* 示例颜色，根据需要修改 */
}

.unavailable .chair-icon {
    background-color: #cccccc;
    /* 示例颜色，根据需要修改 */
}
</style>