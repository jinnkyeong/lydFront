<template>
  <v-btn block @click="clickDelete" color="grey" size="large">
    <span class="text-regular white"> 삭제하기 </span>
  </v-btn>
  <v-dialog class="dialog" width="450" height="300" v-model="confirmDel">
    <!-- 너버 - 임의로 정함 -->
    <v-card>
      <v-card-title>
        <v-row no-gutters style="height: 20px"></v-row>
      </v-card-title>

      <v-card-text>
        <v-row justify="center" no-gutters style="height: 60px">
          정말 삭제하시겠습니까?
        </v-row>
        <v-row justify="center" no-gutters style="height: 40px">
          <v-col class="text-center" cols="12" md="4" style>
            <v-btn
              @click="clickDeleteOk"
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
import searchApi from '@/api/searchApi';

export default {
  data() {
    return {
      confirmDel: false,
    };
  },
  methods: {
    clickDelete() {
      this.confirmDel = true;
    },
    clickDeleteOk() {
      this.confirmDel = false;
      this.$emit('del', true);
    },
    clickCancel() {
      this.confirmDel = false;
    },
  },
};
</script>

<style></style>
