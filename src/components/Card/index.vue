<template>
  <div class="card">
    <header v-if="header">
      <slot name="header" />
    </header>
    <section>
      <div v-if="filter" class="filter">
        <slot name="filter" />
      </div>
      <main>
        <slot />
      </main>
    </section>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    header: {
      type: Boolean,
      default: true
    },
    filter: {
      type: Boolean,
      default: true
    },
    returnShow: {
      type: Boolean,
      default: true
    },
    backShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      title: ""
    };
  },
  created() {},
  methods: {
    backPrev() {}
  }
};
</script>

<style scoped>
.card {
  background: #fff;
  height: 100%;
}
.card header {
  height: 32px;
  border-bottom: 1px solid #e3e3e5;
  padding: 15px;
  position: relative;
}

.card .filter {
  border-bottom: 1px solid #e3e3e5;
  padding: 15px 15px 0;
}

.card main {
  padding: 15px 15px 10px;
}
</style>
