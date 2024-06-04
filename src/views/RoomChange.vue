<template>
    <div class="layout-container">
        <h1 v-if="showTitle">座位调整</h1>
        <div class="classroom">
            <div v-for="seat in localSeats" :key="seat.id" :class="['seat', seat.status]">
                <div class="chair-icon" @click="showPopover(seat, $event)"
                    :style="{ backgroundColor: seat.status === 'available' ? '#bdebbd' : '#cccccc' }"></div>
                <div class="seat-number">{{ seat.id }}</div>
            </div>
        </div>
        <div v-if="selectedSeat" class="popover" :style="popoverStyle">
            <div class="popover-content">
                <button class="status-toggle" @click="toggleStatus('available')">可用</button>
                <button class="status-toggle" @click="toggleStatus('unavailable')">未开放</button>
            </div>
        </div>
        <div v-if="statusSet" class="success-popup">
            状态更改成功！
        </div>
    </div>
</template>

<script>
export default {
    props: {
        seats: {
            type: Array,
            required: false,
            default: () => []
        },
        showTitle: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            localSeats: [],  // 本地的座位状态
            selectedSeat: null,
            popoverStyle: {},
            statusSet: false,  // 添加状态更改成功的标记
        };
    },
    watch: {
        seats: {
            handler(newSeats) {
                this.localSeats = [...newSeats];  // 深拷贝
            },
            immediate: true,
        },
    },
    methods: {
        showPopover(seat, event) {
            this.selectedSeat = seat;
            const rect = event.currentTarget.getBoundingClientRect();
            this.popoverStyle = {
                top: `${rect.top + window.scrollY}px`,
                left: `${rect.right - 400}px`
            };
        },
        createSeats() {
            return Array.from({ length: 100 }, (_, i) => ({
                id: `Seat ${i + 1}`,
                status: 'available'
            }));
        },
        fetchSeats() {
            const savedSeats = localStorage.getItem('seats');
            return savedSeats ? JSON.parse(savedSeats) : null;
        },
        saveSeats() {
            localStorage.setItem('seats', JSON.stringify(this.localSeats));
        },
        toggleStatus(status) {
            if (this.selectedSeat) {
                const seatId = this.selectedSeat.id;
                const index = this.localSeats.findIndex(seat => seat.id === seatId);
                if (index !== -1) {
                    this.localSeats[index] = { ...this.localSeats[index], status };
                    this.saveSeats(); // 保存更改到 localStorage
                }
                this.$emit('seat-status-changed', { ...this.selectedSeat, status });
                this.selectedSeat = null;
                this.statusSet = true;  // 显示状态更改成功的提示框

                // 3秒后自动关闭提示框
                setTimeout(() => {
                    this.statusSet = false;
                }, 3000);
            }
        }
    },
    mounted() {
        if (!this.localSeats.length) {
            const localSeats = this.fetchSeats();
            if (localSeats) {
                this.localSeats = localSeats;
            } else {
                this.localSeats = this.createSeats();
            }
        }
        console.log(this.localSeats); // 检查传入的seats数组
    }
};
</script>

<style scoped>
.layout-container {
    position: relative;
    max-width: 800px;
    margin: auto;
}

.classroom {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 10px;
    margin-top: 100px;
}

.popover {
    position: absolute;
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 1000;
    width: 100px;
    height: auto;
    box-shadow: 0px 0px 10px 1px rgba(138, 21, 159, 0.8);
    box-shadow: inset 0 0 10px rgba(16, 131, 181, 0.5);
}

.popover-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.status-toggle {
    margin: 5px;
}

.success-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    z-index: 2000;
}

.legend {
    position: fixed;
    top: 10px;
    left: 10px;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 1000;
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
}

.color-sample.available {
    background-color: #bdebbd;
}

.color-sample.unavailable {
    background-color: #cccccc;
}

.seat-number {
    font-size: 0.9em;
    color: #555;
    margin-top: 5px;
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
}

.chair-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 5px;
    background-image: url('../assets/3.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

.available .chair-icon {
    background-color: #bdebbd;
}

.unavailable .chair-icon {
    background-color: #cccccc;
}

.chair-icon button {
    margin: 5px;
}
</style>
