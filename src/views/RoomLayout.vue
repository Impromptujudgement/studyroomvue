<template>
    <div class="layout-container">
      <h1>自习室 {{ roomId }} 座位使用情况</h1>
      <div class="legend">
        <div class="legend-title">座位状态说明</div>
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
      <div class="seats-container">
        <div v-for="seat in seats" :key="seat.id" :class="['seat', seat.status]" @click="editable && selectSeat(seat)">
          <div class="chair-icon"></div>
          <span class="seat-number">{{ seat.id }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      roomId: Number,
      editable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        seats: [],
      };
    },
    created() {
      // Load the seats data from local storage
      const savedSeats = localStorage.getItem('seats');
      if (savedSeats) {
        this.seats = JSON.parse(savedSeats);
      } else {
        // Initialize seats if no data in local storage
        this.seats = Array.from({ length: 100 }, (_, i) => ({
          id: i + 1,
          status: 'available', // Initial status
        }));
        // Save initial seats data to local storage
        localStorage.setItem('seats', JSON.stringify(this.seats));
      }
    },
    methods: {
      selectSeat(seat) {
        if (this.editable) {
          // Emit an event to the parent to handle seat selection if 'editable' is true
          this.$emit('select-seat', seat);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .layout-container {
    position: relative;
    max-width: 800px;
    margin: auto;
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
  
  .color-sample.occupied {
    background-color: #ff9999;
  }
  
  .color-sample.reserved {
    background-color: #ffd699;
  }
  
  .color-sample.unavailable {
    background-color: #cccccc;
  }
  
  .seats-container {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 10px;
    margin-top: 50px;
  }
  
  .seat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
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
  
  .occupied .chair-icon {
    background-color: #ff9999;
  }
  
  .reserved .chair-icon {
    background-color: #ffd699;
  }
  
  .unavailable .chair-icon {
    background-color: #cccccc;
  }
  
  .seat-number {
    font-size: 0.9em;
    color: #555;
    margin-top: 5px;
  }
  </style>
  