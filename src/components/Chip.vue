<template>
  <div class="chip-container">
    <v-chip
      variant="outlined"
      size="x-large"
      class="chip"
      v-for="(one, index) in selectedList"
      :key="index">
      <span>{{ one }}</span>
      <span @click="cancelChip(one)">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </span>
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    selectedList: Array,
  },
  data() {
    return {};
  },
  methods: {
    cancelChip(one) {
      this.$emit('cancelChip', one);
    },
  },
};
</script>
<style>
.chip-container {
  margin: 30px;
}
.chip {
  margin: 10px;
  color: var(--color-secondary);
}
</style>
