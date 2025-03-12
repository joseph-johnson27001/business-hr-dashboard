<template>
  <div class="kpi-card">
    <div class="kpi-card-top">
      <div class="kpi-icon" :style="{ background: color }">
        <i :class="icon"></i>
      </div>
      <div class="kpi-stat">
        <div class="stat-value">{{ stat }}</div>
        <div class="stat-title">{{ title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KPICard",
  props: {
    icon: {
      type: String,
      required: true,
    },
    stat: {
      type: [Number, String],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.kpi-card {
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 20px;
  display: flex;
  font-family: "Roboto";
  flex-direction: column;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.kpi-card-top {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.kpi-icon {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.kpi-stat {
  margin-left: 10px;
}

.stat-value {
  font-size: 18px;
  font-weight: 400;
  color: #006ba6;
  text-align: left;
}

.stat-title {
  font-size: 14px;
  color: #888;
}
</style>
