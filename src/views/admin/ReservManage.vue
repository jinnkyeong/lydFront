<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col cols="12" md="10">
        <v-container>
          <v-row style="border-bottom: solid black 1px">
            <v-col>예약 ID</v-col>
            <v-col>문의 ID</v-col>
            <v-col>제안 ID</v-col>
            <v-col>지원서 ID</v-col>
            <v-col>의뢰서 ID</v-col>
            <v-col>예약상태</v-col>
            <v-col></v-col>
            <v-col></v-col>
          </v-row>
          <v-row v-for="res in reservList" :key="res">
            <v-col>{{ res.reservationId }}</v-col>
            <v-col>{{ res.inquiryId }}</v-col>
            <v-col>{{ res.offerId }}</v-col>
            <v-col>{{ res.applicationId }}</v-col>
            <v-col>{{ res.commisionId }}</v-col>
            <v-col>
              {{ formatStatus(res.status) }}
            </v-col>
            <v-col>
              <v-btn
                v-if="res.status === 4"
                @click="startCal(res.reservationId)">
                정산시작
              </v-btn>
            </v-col>
            <v-col>
              <v-btn v-if="res.status === 5" @click="endCal(res.reservationId)">
                정산종료
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import format from '@/utillFunction/format';
import reservApi from '@/api/reservApi';

import adminApi from '@/api/adminApi';
export default {
  created() {
    reservApi
      .getReservs()
      .then((res) => {
        this.reservList = res.data;
        console.log('after : ', this.reservList);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      reservList: [],
    };
  },
  methods: {
    formatStatus(status) {
      return format.formatStatus(status);
    },
    //정산시작
    startCal(reservId) {
      adminApi
        .startCalculate(reservId)
        .then((res) => {
          this.reservList = res.data;
          console.log('after : ', this.reservList);
          this.$router.go(0);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //정산종료
    endCal(reservId) {
      adminApi
        .endCalculate(reservId)
        .then((res) => {
          this.reservList = res.data;
          console.log('after : ', this.reservList);
          this.$router.go(0);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style></style>
