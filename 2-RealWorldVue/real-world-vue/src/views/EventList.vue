<template>
<div>
  <h1>Danh sách các sự kiện</h1>
    <event-card v-for="item in events" :key="item.id" :event="item"/>
   <!-- <router-link :to="{name: 'event-show', params:{id: '1'} }">Sự kiện thứ nhất</router-link> -->
  
</div>
  
</template>

<script>
import EventCard from '../components/EventCard.vue';
import axios from 'axios';
export default {
    components: {
      EventCard
    },
    data() {
      return {
        events: []
      }
    },
    created () {
      axios
      .get('http://localhost:3000/events')
      .then(response=>{
        this.events=response.data
      })
      .catch(error=>{
        console.log('Loi:',error.response);
        
      })
    }
}
</script>

<style>

</style>