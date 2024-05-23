<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <form @submit.prevent="addTask">
        <div class="modal-content">
          <button class="close-button"></button>
          <p>Select Client</p>
          <div class="select is-rounded is-medium mb-3">
            <select
              v-model="selectClient"
              name="client"
              id="client"
              class="input-style"
              required
            >
              <option value="client1">client1</option>
              <option value="client2">client2</option>
              <option value="client3">client3</option>
            </select>
            <span
              v-if="formSubmitted && !clientSelected"
              class="validation-error"
            ></span>
          </div>

          <p>Select Milestone</p>
          <div class="select is-rounded is-medium mt-2">
            <select
              v-model="selectMilestone"
              name="milestone"
              id="milestone"
              class="input-style"
              required
            >
              <option value="MVP">MVP</option>
              <option value="SEO">SEO</option>
              <option value="date">Date</option>
            </select>

            <span
              v-if="formSubmitted && !milestoneSelected"
              class="validation-error"
            ></span>
          </div>

          <p>Select Developer</p>
          <div class="select is-rounded is-medium mt-2">
            <select
              v-model="selectDeveloper"
              name="developer"
              id="developer"
              class="input-style"
              required
            >
              <option value="JS">JS</option>
              <option value="BB">BB</option>
              <option value="BM">BM</option>
              <option value="RS">DM</option>
            </select>

            <span
              v-if="formSubmitted && !developerSelected"
              class="validation-error"
            ></span>
          </div>

          <label for="task-name">Task Name</label>

          <input
            v-model="taskName"
            type="text"
            id="task-name"
            placeholder="Enter the task name"
            class="input-style"
            required
          />

          <span v-if="formSubmitted && !taskName" class="validation-error"
            >Task Name is required</span
          >

          <label for="task-description">Task Description</label>
          <input
            v-model="taskDescription"
            type="text"
            id="task-description"
            placeholder="Enter the task discription"
            class="input-style"
            required
          />
          <span
            v-if="formSubmitted && !taskDescription"
            class="validation-error"
            >Task Description is required</span
          >

          <div class="addspace">
            <button type="submit" class="add-button" @click="addTask">
              Add Task
            </button>
            <button class="cancel-button" @click="closeModal">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],

      selectClient: "",
      selectMilestone: "",
      selectDeveloper: "",
      taskName: "",
      taskDescription: "",
      subTask: {
        inputTasks: "",
      },
      formSubmitted: false,
      clientSelected: false,
      milestoneSelected: false,
      developerSelected: false,
    };
  },



  props: {
    showModal: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },

    addTask() {
      this.formSubmitted = true;
      if (
        !this.taskName ||
        !this.taskDescription ||
        this.selectClient === "" ||
        this.selectMilestone === "" ||
        this.selectDeveloper === ""
      ) {
        return;
      }

      const task = {
        selectlient: this.selectClient,
        selectMilestone: this.selectMilestone,
        selectDeveloper: this.selectDeveloper,
        taskName: this.taskName,
        taskDescription: this.taskDescription,

        subTask: { inputTask: this.subTask.inputTasks },
      };

      this.$emit("add-task", task);

      this.$emit("close-modal");

      this.clearInputFields();
    },

    clearInputFields() {
      this.selectClient = "";
      this.selectMilestone = "";
      this.selectDeveloper = "";
      this.taskName = "";
      this.taskDescription = "";
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: absolute;
  width: 60%;
  height: 100%;
background-color: transparent;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-bottom: 5px
}
.modal {
  width: 600px;
  height: 100%;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  text-align: center;
}
.modal-content {
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;

}

.input-style {
  border: 1px solid #ccc;
  margin: auto;
  text-align: center;
  font-size: 300;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.close-button,
.add-button,
.cancel-button {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: small;
  margin-top: 20px ;
  font-size: 15px;
}

.add-button {
  background-color: #4caf50;
  color: #fff;
}

.cancel-button {
  background-color: #f44336;
  color: #fff;
}

.addspace {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.validation-error {
  color: #f44336;
  font-size: 12px;
  margin-top: 5px;
}
</style>

