<template>
  <div class="graph-card">
    <!-- Card Header -->
    <div class="graph-card-header">
      <div class="graph-title">{{ title }}</div>
      <select
        v-model="selectedOption"
        @change="onTimeframeChange"
        class="timeframe-dropdown"
      >
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Divider -->
    <!-- <hr class="divider" /> -->

    <!-- Graph Slot (to be filled later) -->
    <div class="graph-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "GraphContainerCard",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedOption: "Monthly",
      options: ["Daily", "Weekly", "Monthly", "Yearly"],
    };
  },
  methods: {
    onTimeframeChange() {
      this.$emit("timeframe-changed", this.selectedOption); // Emit selected option
    },
  },
};
</script>

<style scoped>
.graph-card {
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  font-family: "Roboto";
}

.graph-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.graph-title {
  font-size: 14px;
  font-weight: 400;
  color: #006ba6;
  text-align: left;
}

.timeframe-dropdown {
  font-family: "Assistant" !important;
  border: 1px solid #ccc;
  padding: 10px;
  padding-left: 5px;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fff;
  cursor: pointer;
  outline: none;
}

.divider {
  margin: 15px 0;
  width: 100%;
  border: 0;
  border-top: 1px solid #ddd;
}

.graph-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}
</style>
