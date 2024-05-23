
<template>
  <div class="container">
    <div class="content">
      <div class="fix">
        <navbar :tasks="tasks" @add-task="addTask" @close-modal="closeModal" />

        <div class="columns">
          <column
            :tasks="pendingTasks"
            title="Pending"
            @change-status="changeStatus"
            :update-local-storage="updateLocalStorage"
          />
          <column
            :tasks="inProgressTasks"
            title="In-progress"
            @change-status="changeStatus"
            :update-local-storage="updateLocalStorage"
          />
          <column
            :tasks="doneTasks"
            title="Done"
            :update-local-storage="updateLocalStorage"
          />
        </div>

        
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "./components/navbar.vue";
import column from "./components/column.vue";
import { useToast } from "vue-toastification";

export default {
  components: {
    navbar,
    column,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    addTask(task) {
      task.showCardContent = true;

      task.status = "Pending";

      this.tasks.push(task);

      this.updateLocalStorage();

      const toast = useToast();
        toast.success("task added successfully");
    },











  
    changeStatus(task) {
      // Find the task in the tasks array and update its status
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        if (task.status === "Pending") {
          this.tasks.splice(index, 1); // Remove from pending tasks
          this.tasks.push(task); // Add to in-progress tasks
          task.status = "In-progress";
        } else if (task.status === "In-progress") {
          this.tasks.splice(index, 1); // Remove from in-progress tasks
          this.tasks.push(task); // Add to done tasks
          task.status = "Done";
        }

        this.updateLocalStorage();
      }
    },

    updateLocalStorage() {
      // Filter tasks by status and update localStorage accordingly
      const pendingTasks = this.tasks.filter(
        (task) => task.status === "Pending"
      );
      const inProgressTasks = this.tasks.filter(
        (task) => task.status === "In-progress"
      );
      const doneTasks = this.tasks.filter((task) => task.status === "Done");

      localStorage.setItem("pendingTasks", JSON.stringify(pendingTasks));
      localStorage.setItem("inProgressTasks", JSON.stringify(inProgressTasks));
      localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
    },
  },
  computed: {
    pendingTasks() {
      return this.tasks.filter((task) => task.status === "Pending");
    },
    inProgressTasks() {
      return this.tasks.filter((task) => task.status === "In-progress");
    },
    doneTasks() {
      return this.tasks.filter((task) => task.status === "Done");
    },
  },

  mounted() {
    // Retrieve tasks from localStorage when the component is mounted
    const pendingTasks = JSON.parse(localStorage.getItem("pendingTasks")) || [];
    const inProgressTasks =
      JSON.parse(localStorage.getItem("inProgressTasks")) || [];
    const doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

    // Set tasks in their respective arrays
    this.tasks = [...pendingTasks, ...inProgressTasks, ...doneTasks];
  },
};
</script>
<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-y: auto;
}
body {
  font-family: "Bree Serif", serif;
  font-family: "Roboto", sans-serif;
}

.container {
  display: flex;
  height: 100%;
}

.content {
  flex: 1;
  background-color: #f0f0f0;
}

.columns {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}

.column {
  flex: 1;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid gray;
  box-shadow: #ccc;
  max-width: 100%;
  height: 100%;
  overflow-y: auto;
}

/* Media Queries */
@media (min-width: 768px) {
  .columns {
    flex-direction: row;
  }
}

@media (max-width: 767px) {
  .column {
    max-width: 100%;
  }
}


</style>
