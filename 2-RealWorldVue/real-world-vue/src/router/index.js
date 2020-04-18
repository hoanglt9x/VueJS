import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import EventCreate from "../views/EventCreate.vue";
import User from "../views/User.vue";
import FileNotFound from "../views/FileNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
  },
  {
    path: "/event",
    name: "event-show",
    component: EventShow
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate,
  },
  {
    path: "/user/:username",
    name: "user",
    component:User,
    props: true
  },
  {
    path: "*",
    component: FileNotFound
  }
];

const router = new VueRouter({
  mode: "history",   //Nhằm chuyển đổi 
  base: process.env.BASE_URL,
  routes
});

export default router;
