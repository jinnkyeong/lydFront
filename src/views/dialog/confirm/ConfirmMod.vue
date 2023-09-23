<template>
  <v-btn block @click="clickModify" color="primary" size="large">
    수정하기
  </v-btn>
  <v-dialog class="dialog" width="450" height="300" v-model="confirmMod">
    <!-- 너버 - 임의로 정함 -->
    <v-card>
      <v-card-title>
        <v-row no-gutters style="height: 40px"></v-row>
      </v-card-title>

      <v-card-text>
        <v-row justify="center" no-gutters style="height: 60px">
          정말 수정하시겠습니까?
        </v-row>
        <v-row justify="center" no-gutters style="height: 40px">
          <v-col class="text-center" cols="12" md="4" style>
            <v-btn
              @click="clickModifyOk"
              size="large"
              color="primary"
              variant="tonal">
              확인
            </v-btn>
          </v-col>
          <v-col class="text-center" cols="12" md="4"></v-col>
          <v-col class="text-center" cols="12" md="4">
            <v-btn
              @click="clickCancel"
              size="large"
              color="grey"
              variant="tonal">
              취소
            </v-btn>
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
      confirmMod: false,
    };
  },
  methods: {
    clickModify() {
      this.confirmMod = true;
    },
    clickModifyOk() {
      this.$emit('mod', true);
      console.log('클릭->emit!->닫기');
      this.confirmMod = false;
    },
    clickCancel() {
      this.confirmMod = false;
    },
  },
};
</script>

<style></style>
