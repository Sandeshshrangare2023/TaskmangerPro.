<template>
  <div class="navContent">
    <nav>


      <div class="nav-wrapper">
        <a class="brand-logo"
          ><i class="material-icons">sidemenu</i>TaskManagar</a
        >
        <ul class="right hide-on-med-and-down">
          <li>
            <a href=""><i class="material-icons">refresh</i></a>
          </li>

          <li>
            <a><i class="material-icons" @click="openModal">add</i></a>
          </li>

          <li>
            <a href=""><i class="material-icons">search</i></a>
          </li>

          <li>
            <a href=""><i class="material-icons">more_vert</i></a>
          </li>
        </ul>
      </div>


    </nav>


    <div class="navModal">

      <modal
        :showModal="showModal"
        @close-modal="closeModal"
        @add-task="addTask"
      />
    </div>


    <div class="navModal">

      <modal :showModal="showModal" @close-modal="closeModal" @add-task="addTask"/>
    </div>
    
  </div>
</template>

<script>
import modal from "./modal.vue";



export default {       
  components: {
    modal,
  },

  props: ["tasks"],

  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    addTask(task) {
      this.$emit("add-task", task);
    },
  },
};
   


</script>

<style>
.nav-wrapper {
  background-color: rgb(247, 241, 252);
}
.nav-wrapper a {
  color: #5a7faa;
}
</style>

<!--
    <modal
        :showModal="showModal"
        @close-modal="closeModal"
        @add-task="addTask"
      />

<script>
import modal from "./modal.vue"

export default {
  components;{
    modal,
  },

  props :["tasks"],

data(){
  return{
    showmodal : false;
  },
},

methods:{
  openModal(){
    this.showmodal = true
  },

  closeModal(){
    this.showmodal = false
  },

  addTask(task){
    this.$emit("add-task",task)
  }
}

}


</script>


-->
