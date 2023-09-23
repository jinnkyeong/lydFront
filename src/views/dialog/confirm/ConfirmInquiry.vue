<template>
  <v-btn block @click="clickInq"> 문의하기 </v-btn>
  <v-dialog class="dialog" width="450" height="300" v-model="confirmMod">
    <!-- 너버 - 임의로 정함 -->
    <v-card>
      <v-card-title>
        <v-row no-gutters style="height: 40px"></v-row>
      </v-card-title>

      <v-card-text>
        <v-row justify="center" no-gutters style="height: 60px">
          정말 문의하시겠습니까?
        </v-row>
        <v-row justify="center" no-gutters style="height: 40px">
          <v-col class="text-center" cols="12" md="4" style>
            <v-btn @click="clickOk">확인</v-btn>
          </v-col>
          <v-col class="text-center" cols="12" md="4"></v-col>
          <v-col class="text-center" cols="12" md="4">
            <v-btn @click="clickCancel">취소</v-btn>
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
    clickInq() {
      this.confirm = true;
    },
    clickOk() {
      this.$emit('inq', true);
      console.log('클릭->emit!->닫기');
      this.confirm = false;
    },
    clickCancel() {
      this.confirm = false;
    },
  },
};
</script>

<style></style>
