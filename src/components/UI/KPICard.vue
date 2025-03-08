<template>
  <div class="kpi-card">
    <div class="kpi-card-top">
      <div class="kpi-icon" :style="{ background: gradient }">
        <i :class="icon"></i>
      </div>
      <div class="kpi-stat">
        <div class="stat-value">{{ stat }}</div>
        <div class="stat-title">{{ title }}</div>
      </div>
    </div>
    <div class="kpi-card-bottom">
      <hr class="divider" />
      <span class="view-more-text">
        View Details <i class="fas fa-chevron-right"></i>
      </span>
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
    gradient: {
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
  border: 1px solid #ddd;
  padding: 20px;
  display: flex;
  font-family: "Roboto";
  flex-direction: column;
}

.kpi-card-top {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.kpi-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
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
  font-weight: bold;
  color: #333;
  text-align: left;
}

.stat-title {
  font-size: 14px;
  color: #888;
}

.kpi-card-bottom {
  margin-top: auto;
  cursor: pointer;
}

.divider {
  margin: 15px 0;
  width: 100%;
  border: 0;
  border-top: 1px solid #ddd;
}

.view-more-text {
  font-size: 12px;
  color: #006ba6;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.view-more-text i {
  margin-left: 5px;
}
</style>
