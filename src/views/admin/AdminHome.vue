<template>
  <h1>관리자 로그인</h1>
  <v-row>
    <v-col cols="12" md="6">
      <v-container>
        <v-row>
          id
          <v-text-field v-model="payload.sign" variant="underlined" />
        </v-row>
        <v-row>
          패스워드
          <v-text-field v-model="payload.pwd" variant="underlined" />
        </v-row>
        <v-row>
          <v-btn @click="clickLogin">로그인</v-btn>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
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
