<template>
  <v-btn @click="clickTest" size="large" variant="tonal" color="primary">
    <span>다시 테스트하기</span>
  </v-btn>
  <v-dialog class="dialog" width="450" height="300" v-model="confirm">
    <!-- 너버 - 임의로 정함 -->
    <v-card>
      <v-card-title>
        <v-row no-gutters style="height: 40px"></v-row>
      </v-card-title>

      <v-card-text>
        <v-row justify="center" no-gutters style="height: 60px">
          지금 테스트를 하시겠습니까?
        </v-row>
        <v-row justify="center" no-gutters style="height: 40px">
          <v-col class="text-center" cols="12" md="4" style>
            <v-btn @click="clickOk" size="large" color="primary" variant="tonal"
              >확인</v-btn
            >
          </v-col>
          <v-col class="text-center" cols="12" md="4"></v-col>
          <v-col class="text-center" cols="12" md="4">
            <v-btn
              @click="clickCancel"
              size="large"
              color="grey"
              variant="tonal"
              >취소</v-btn
            >
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters style="height: 40px"> </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      confirm: false,
    };
  },
  methods: {
    clickTest() {
      this.confirm = true;
    },
    clickOk() {
      this.$emit('test', true);
      this.confirm = false;
    },
    clickCancel() {
      this.confirm = false;
    },
  },
};
</script>

<style></style>
