<template>
  <v-overlay v-model="is_show" z-index="100005">
    <v-alert
      class="text-center"
      :type="alert_data.type"
      colored-border
      border="top"
      density="compact"
      prominent>
      <v-row>
        <v-col cols="12">
          {{ alert_data.title }}
        </v-col>
        <v-col cols="12">
          {{ alert_data.text }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align-self="end">
          <v-btn outlined @click="close"> 확인 </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </v-overlay>
</template>

<script>
export default {
  computed: {
    is_show() {
      return this.$store.state.just_state.alert;
    },
    alert_data() {
      return this.$store.state.just_state.alert_setting;
    },
  },
  data() {
    return {};
  },
  methods: {
    change(v) {
      return String(v).replace(/(?:\r\n|\r|\n)/g, '</br>');
    },
    close() {
      this.$store.dispatch('updateAlert', { alert: false, type: '', text: '' });
    },
  },
};
</script>

<style></style>
