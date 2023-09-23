<template>
  <v-btn block @click="clickDelete" color="grey" size="large"> 취소하기 </v-btn>
  <v-dialog class="dialog" width="450" height="300" v-model="confirmCancel">
    <!-- 너버 - 임의로 정함 -->
    <v-card>
      <v-card-title>
        <v-row no-gutters style="height: 20px"></v-row>
      </v-card-title>

      <v-card-text>
        <v-row justify="center" no-gutters style="height: 60px">
          정말 취소하시겠습니까?
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
export default {
  props: {
    offerId: Number,
    inquiryId: Number,
  },
  data() {
    return {
      confirmCancel: false,
    };
  },
  methods: {
    clickDelete() {
      this.confirmCancel = true;
    },
    clickDeleteOk() {
      this.confirmCancel = false;
      if (this.offerId) {
        this.$store.commit('setOfferId', this.offerId);
      }
      if (this.inquiryId) {
        this.$store.commit('setInquiryId', this.inquiryId);
      }
      this.$emit('cancel', true);
    },
    clickCancel() {
      this.confirmCancel = false;
    },
  },
};
</script>

<style></style>
