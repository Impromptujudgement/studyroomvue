<template>
    <div>
      <h1>自习室列表</h1>
      <div v-for="(room, index) in rooms" :key="room.id">
        <h2>{{ room.name }}</h2>
        <RoomLayout 
          :roomId="room.id" 
          :seats="room.seats" 
          @update-seat="updateSeatStatus(room.id, $event)"
        />
      </div>
    </div>
  </template>
  
  <script>
  import RoomLayout from './RoomLayout.vue';
  
  export default {
    components: { RoomLayout },
    data() {
      return {
        rooms: [
          // 初始化每个自习室的100个座位
          { id: 1, name: '自习室 1', seats: this.createSeats() },
          // 增加更多自习室的初始化 if needed
        ],
      };
    },
    methods: {
      createSeats() {
        return Array.from({ length: 100 }, (_, i) => ({
          id: i + 1,
          status: 'available'
        }));
      },
      updateSeatStatus(roomId, updatedSeat) {
        const room = this.rooms.find(room => room.id === roomId);
        const seatIndex = room.seats.findIndex(seat => seat.id === updatedSeat.id);
        this.$set(room.seats, seatIndex, updatedSeat);
      },
    },
  };
  </script>
  

  <style scoped>
  .classroom {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 10px;
    margin-top: 100px;
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
}

.seat-number {
    font-size: 0.9em;
    color: #555;
    margin-top: 5px;
}

/* 根据状态改变背景色 */
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
  </style>