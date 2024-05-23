<template>


  <div class="column is-one-third">
    <h4>{{ title }}</h4>
    <div class="card" v-for="(task, index) in filteredTasks" :key="index">
      <header class="card-header ml-4">
        <p>{{ task.taskName }}</p>
        <p class="card-header-title"></p>
        <p>{{ task.selectClient }}</p>
        <p>{{ task.selectMilestone }}</p>
        <p>{{ task.selectDeveloper }}</p>

        <div v-if="task.status !== 'Done'">
          <button
            v-if="task.status === 'Pending'"
            @click="changeStatus(task)"
            class="icon-button"
          >
            <font-awesome-icon :icon="['fas', 'play']" />
          </button>

          <button
            v-else
            @click="stopTask(task)"
            :class="stopButtonClass(task)"
            class="icon-button"
          >
            <font-awesome-icon :icon="['fas', 'stop']" />
          </button>
        </div>

        <button
          @click="toggleCardContent(task)"
          class="card-header-icon"
          aria-label="more options"
        >
          <span class="icon">
            <font-awesome-icon
              :icon="['fas', task.showCardContent ? 'angle-up' : 'angle-down']"
            />
          </span>
        </button>
      </header>

      <div class="card-content" v-if="task.showCardContent">
        <div class="tabs">
          <ul>
            <li
              :class="{ 'is-active': task.activeTab === 'subTask' }"
              @click="changeTab(task, 'subTask')"
            >
              <a>SubTasks</a>
            </li>
            <li
              :class="{ 'is-active': task.activeTab === 'Info' }"
              @click="changeTab(task, 'Info')"
            >
              <a>Info</a>
            </li>
          </ul>
        </div>

        <div v-if="task.activeTab === 'subTask'">
          <input
            v-model="task.subTask.inputTask"
            type="text"
            placeholder="Add a subTask"
            @keyup.enter="addSubTask(task)"
          />

          <div v-if="task.selectedSubTasks && task.selectedSubTasks.length > 0" class="change">
            <button @click="markSelectedAsDone(task)" class="icon-button-button">
              <font-awesome-icon :icon="['fas', 'check-circle']" />
            </button>
            <button @click="markSelectedAsPending(task)" class="icon-button-button">
              <font-awesome-icon :icon="['fas', 'circle']" />
            </button>
            <button @click="deleteSelectedSubTasks(task)" class="icon-button-button">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </div>

          <div v-if="task.subTask.subTasks && task.subTask.subTasks.length > 0">
            <ul>
              <li
                v-for="(subTask, subIndex) in task.subTask.subTasks"
                :key="subIndex"
                @click="toggleSubTaskSelection(task, subTask)"
                :class="{ done: subTask.status === 'Done', selected: subTask.selected }"
              >
                <span class="icon">
                  <span v-if="subTask.selected">&#10003;</span>
                  <span v-else style="font-size: 25px">&#9634;</span>
                </span>
                {{ subTask.name }}
              
              </li>
            </ul>
          </div>
        </div>

        <div v-if="task.activeTab === 'Info'">
          <p>{{ task.taskDescription }}</p>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
import { useToast } from "vue-toastification";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faStop,
  faAngleUp,
  faAngleDown,
  faCircle,
  faCheckCircle,
  faClock, faTrash
} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';

// Add necessary icons to the library
library.add(faPlay, faStop, faAngleUp, faAngleDown, faCheckCircle, faClock, faTrash,faCircle,);


export default {
  props: ["tasks", "title", "updateLocalStorage"],
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      activeTab: "subTask",
    };
  },
  methods: {
    toggleCardContent(task) {
      task.showCardContent = !task.showCardContent;
    },
    changeTab(task, tab) {
      task.activeTab = tab;
    },
    addSubTask(task) {
      const newSubTask = task.subTask.inputTask.trim();
      if (!task.subTask.subTasks) {
        task.subTask.subTasks = [];
      }
      if (newSubTask) {
        task.subTask.subTasks.push({
          name: newSubTask,
          status: "Pending",
          selected: false,
        });
        task.subTask.inputTask = "";
        this.updateLocalStorage();
        const toast = useToast();
        toast.success("Subtask added successfully");
      }
    },
    deleteSubTaskItem(task, index) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          if (task.subTask.subTasks && task.subTask.subTasks.length > index) {
            task.subTask.subTasks.splice(index, 1);
            this.updateLocalStorage();
            const toast = useToast();
            toast.error("Subtask deleted successfully");
          }
          Swal.fire(
            'Deleted!',
            'Your subtask has been deleted.',
            'success'
          );
        }
      });
    },
    changeStatus(task) {
      this.$emit("change-status", task);
    },
    stopTask(task) {
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        this.tasks[index].status = "Done";
      }
    },
    stopButtonClass(task) {
      return {
        "stop-button-red": task.status === "In-Progress",
      };
    },
    toggleSubTaskSelection(task, subTask) {
      subTask.selected = !subTask.selected;
      if (!task.selectedSubTasks) {
        task.selectedSubTasks = [];
      }
      task.selectedSubTasks = task.subTask.subTasks.filter(
        (subTask) => subTask.selected
      );
    },
    markSelectedAsDone(task) {
      task.selectedSubTasks.forEach((subTask) => (subTask.status = 'Done'));
      this.updateLocalStorage();
    },
    markSelectedAsPending(task) {
      task.selectedSubTasks.forEach((subTask) => (subTask.status = 'Pending'));
      this.updateLocalStorage();
    },
    deleteSelectedSubTasks(task) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete them!'
      }).then((result) => {
        if (result.isConfirmed) {
          task.subTask.subTasks = task.subTask.subTasks.filter(
            (subTask) => !subTask.selected
          );
          task.selectedSubTasks = [];
          this.updateLocalStorage();
          Swal.fire(
            'Deleted!',
            'Your selected subtasks have been deleted.',
            'success'
          );
        }
      });
    },
  },
  computed: {
    filteredTasks() {
      if (!this.tasks) {
        return [];
      }
      return this.tasks.filter(
        (task) => task.status.toLowerCase() === this.title.toLowerCase()
      );
    },
  },
};
</script>

<style scoped>

.columns {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 400px;
}
.heading {
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column {
  flex: 1;
  padding: 10px;
  margin-top: 10px;
  margin-left: 10px;
  box-shadow: #ccc;
  max-width: 400px;
  height: 100vh;
}

.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px 10px 10px 10px;
  box-shadow: #ccc;
}
.tab-content {
  margin-top: 10px;
}
.tabs ul {
  margin: auto;
  gap: 40px;
}

.card-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  font-size: 30;
  font-weight: bold;
}

.icon-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: green;
}

.icon-button-button {
  color: rgb(211, 68, 7);
  font-size: 22px;
}
.stop-button-red {
  color: red;
}

ul {
  list-style-type: none;
}

li {
  display: flex;
  align-items: center;
  cursor: pointer;
}

li .icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

li.done {
  text-decoration: line-through;
  color: #17e830;
}

li.selected .icon {
  background-color: #17e830;
  color: black;
}
.change{
  display: flex;
  align-items: center;
  justify-content: space-around;
}

/* Media query for laptops and large screens */
@media screen and (min-width: 1024px) {
  .column {
    max-width: 30%;
  }
}


</style>
