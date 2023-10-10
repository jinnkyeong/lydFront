<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <v-container class="text-center">
          <v-row
            style="
              border-top: solid var(--color-primary) 2px;
              border-bottom: solid var(--color-primary) 2px;
            "
            class="semi-bold">
            <v-col>예약 ID</v-col>
            <v-col>문의 ID</v-col>
            <v-col>제안 ID</v-col>
            <v-col>지원서 ID</v-col>
            <v-col>의뢰서 ID</v-col>
            <v-col>예약상태</v-col>
            <v-col></v-col>
            <v-col></v-col>
          </v-row>
          <v-row
            v-for="res in reservList"
            :key="res"
            style="border-bottom: solid var(--color-light-grey) 2px">
            <v-col>{{ res.reservationId }}</v-col>
            <v-col>{{ res.inquiryId }}</v-col>
            <v-col>{{ res.offerId }}</v-col>
            <v-col>{{ res.applicationId }}</v-col>
            <v-col>{{ res.commisionId }}</v-col>
            <v-col>
              <span
                v-if="res.status !== 4 && res.status !== 5"
                class="semi-bold">
                {{ formatStatus(res.status) }}
              </span>
              <span v-if="res.status === 4" class="semi-bold primary-color">
                {{ formatStatus(res.status) }}
              </span>
              <span v-if="res.status === 5" class="semi-bold grey">
                {{ formatStatus(res.status) }}
              </span>
            </v-col>
            <v-col>
              <v-btn
                v-if="res.status === 4"
                @click="startCal(res.reservationId)"
                color="secondary">
                정산시작
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                v-if="res.status === 5"
                @click="endCal(res.reservationId)"
                color="secondary">
                정산종료
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
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
