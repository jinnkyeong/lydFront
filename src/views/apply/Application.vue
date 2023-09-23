<template>
  <v-container fluid class="image-bg-apply">
    <v-spacer style="height: 300px" />
    <v-row>
      <v-col cols="12" md="8" />
      <v-col cols="12" md="4">
        <v-row>
          <div class="main-title-white">
            <div>강아지와 산책하며</div>
            <div>행복하게 돈 벌어보세요</div>
          </div>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="2" />
          <v-col cols="12" md="4">
            <v-btn
              class="ma-7"
              block
              rounded="xl"
              size="x-large"
              @click="goToApplyForm"
              color="primary">
              지원하기
            </v-btn>
          </v-col>
          <v-spacer />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-spacer style="height: 300px" />
  <v-row>
    <v-spacer />
    <v-col cols="12" md="9">
      <v-img src="@/assets/images/apply/app1.png" cover />
    </v-col>
    <v-spacer />
  </v-row>

  <v-spacer style="height: 300px" />
  <v-row> </v-row>
</template>

<script>
export default {
  methods: {
    goToApplyForm() {
      this.$router.push('applicationForm');
    },
  },
};
</script>

<style>
.image-bg-apply {
  background: url('@/assets/images/apply/dog_run.jpg');
  background-size: cover;
  height: 100vh;
}
</style>
