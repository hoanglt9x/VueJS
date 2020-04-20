<template>
    <router-link class="event-link" :to="{name: 'event-show', params:{id: event.id} }">
    <div class="event-cart -shadow">
        <span class="eyebrow">vào {{event.time}} ngày {{event.date}}</span>
        <h4 class="title">{{event.title}}</h4>
        <span>{{event.attendees.length}} khách mời</span>
    </div>
    </router-link>
    
</template>

<script>
    export default {
      props: {
          event: {
              type: Object,
          },
      },
    }
</script>


// scoped dùng áp dụng cho css riêng biệt
<style scoped>
   .event-cart {
       padding: 20x;
       margin-bottom: 24px;
       transition: all 0.2s linear;
       cursor: pointer
   }
   .event-cart:hover{
       color: green;
       transform: scale(1.01);
       box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 12px 0 rgba(0, 0, 0, 0.19);
   }
   .event-cart > .title{
       margin: 0;
   }
   .event-link{
       color: black;
       text-decoration: none;
       font-weight: 100;
   }
</style>