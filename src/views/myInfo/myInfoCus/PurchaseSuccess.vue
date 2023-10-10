<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col cols="12" md="8">
        <v-row style="height: 200px"></v-row>
        <v-row justify="center">
          <div class="title ma-16">결제가 완료되었습니다</div>
        </v-row>
        <v-row class="text-center">
          <v-col cols="12" md="12">
            <div class="text-regular">
              ‘내 정보 - 예약 내역’에서 현재 예약의 상태를 확인하실 수 있습니다.
            </div>
          </v-col>
        </v-row>
        <v-row style="height: 100px"></v-row>
        <v-row>
          <v-spacer />
          <v-col cols="12" md="3">
            <v-btn block size="large" color="grey" @click="clickMain">
              <span class="text-regular white">메인으로 돌아가기</span>
            </v-btn>
          </v-col>
          <v-spacer />
        </v-row>
      </v-col>
      <v-spacer />
    </v-row>
    <v-row style="height: 100px"></v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    clickMain() {
      this.$router.push('/');
    },
  },
};
</script>

<style></style>
