<template>
  <div class="info-card">
    <div class="info-card-header">
      <h2 class="info-card-title">{{ title }}</h2>
    </div>
    <div class="chart-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoCard",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.info-card {
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 4px;
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
}

.chart-container {
  flex: 1;
  min-height: 200px;
  width: 100%;
}

.info-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-card-title {
  font-size: 14px;
  font-weight: 400;
  color: #006ba6;
  text-align: left;
}

@media (max-width: 400px) {
  .info-card {
    padding: 20px 10px;
  }
}
</style>
