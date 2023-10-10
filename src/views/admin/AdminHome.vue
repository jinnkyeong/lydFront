<template>
  <v-spacer style="height: 100px" />
  <v-row>
    <v-spacer />
    <v-col cols="12" md="6">
      <v-container>
        <v-row justify="center">
          <h2 class="ma-5">Admin Login</h2>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="1" align-self="center">
            <span class="text-regular secondary-color"> id </span>
          </v-col>
          <v-col cols="12" md="9">
            <v-text-field v-model="payload.sign" variant="underlined" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="1" align-self="center">
            <span class="text-regular secondary-color"> pwd </span>
          </v-col>
          <v-col cols="12" md="9">
            <v-text-field
              v-model="payload.pwd"
              variant="underlined"
              type="password" />
          </v-col>
        </v-row>
        <v-row>
          <v-spacer />
          <v-col cols="12" md="3">
            <v-btn @click="clickLogin" block color="grey">
              <span class="white text-regular"> login </span>
            </v-btn>
          </v-col>
          <v-spacer />
        </v-row>
      </v-container>
    </v-col>
    <v-spacer />
  </v-row>
  <v-spacer style="height: 100px" />
</template>

<script>
export default {
  data() {
    return {
      payload: {},
    };
  },
  methods: {
    clickLogin() {
      console.log(this.payload);
      this.$store.dispatch('adminLogin', this.payload);
    },
  },
};
</script>

<style></style>
