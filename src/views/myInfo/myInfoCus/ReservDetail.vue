<template>
  <v-container class="pa-0 ma-0">
    <!-- 예약 나열 -->
    <v-row class="pt-3 mt-3">
      <v-spacer />

      <v-col cols="12" md="12">
        <!-- 0. 취소 -->
        <v-container v-if="this.info.status === 0">
          <v-spacer />
          <v-row class="ma-10" justify="center">
            <CusReservDetail :info="info" :title="title0" />
          </v-row>
          <!-- 취소정보 -->
          <v-row class="ma-7" no-gutters justify="center">
            <div>
              <span class="text-regular mr-3">취소일자</span>
              <span class="text-regular">
                {{ formatDateTime(info.canceledAt) }}
              </span>
            </div>
          </v-row>
          <v-spacer />
        </v-container>
        <!-- 1. 예약완료 -->
        <v-container v-if="this.info.status === 1">
          <CusReservDetail :info="info" :title="title1" :subtitle="subtitle1" />
          <!-- 결제하기 -->
          <v-row class="mt-10">
            <v-spacer />
            <v-col cols="12" md="3">
              <v-btn
                block
                color="primary"
                @click="clickPurchase"
                style="height: 50px">
                <span class="white text-regular">결제하기</span>
              </v-btn>
            </v-col>
            <v-spacer />
          </v-row>
        </v-container>

        <!-- 2. 결제완료 -->
        <v-container v-if="this.info.status === 2">
          <CusReservDetail :info="info" :title="title2" :subtitle="subtitle2" />
        </v-container>

        <!-- 3. 산책 중 -->
        <v-container v-if="this.info.status === 3">
          <CusReservDetail :info="info" :title="title3" :subtitle="subtitle3" />
          <!-- 산책일지 확인 -->
          <v-row class="ma-8">
            <v-spacer />
            <v-col align-self="center" cols="12" md="3">
              <v-btn
                block
                color="primary"
                @click="showDiary"
                style="height: 50px">
                <span class="text-regular white"> 산책일지 확인하기 </span>
              </v-btn>
            </v-col>
            <v-col align-self="center" cols="12" md="9">
              <span v-if="info.diaryStatus === 1" class="card-data">
                산책일지가 일부분 작성되었습니다. 현재 상태를 확인할까요?
              </span>
              <span v-if="info.diaryStatus === 2" class="card-data">
                <span>산책일지 작성이 완료되었습니다</span>
                <span>{{
                  info.diaryUpdatedAt
                    ? formatDateTime(info.diaryUpdatedAt)
                    : formatDateTime(info.diaryCreatedAt)
                }}</span>
              </span>
            </v-col>
            <v-spacer />
          </v-row>
        </v-container>

        <!-- 4.산책완료(내부적으로 정산중,정산완료도 포함) -->
        <v-container
          v-if="
            this.info.status === 4 ||
            this.info.status === 5 ||
            this.info.status === 6
          ">
          <CusReservDetail :info="info" :title="title4" />
          <v-row class="ma-8">
            <v-col align-self="center" cols="12" md="3">
              <v-btn
                block
                color="primary"
                @click="showDiary"
                style="height: 50px">
                <span class="text-regular white"> 산책일지 확인하기 </span>
              </v-btn>
            </v-col>
            <v-col align-self="center" cols="12" md="9">
              <span v-if="info.diaryStatus === 1" class="card-data">
                산책일지의 일부분 작성되었습니다. 현재 상태를 확인할까요?
              </span>
              <span
                v-if="info.diaryStatus === 2"
                class="card-data grey text-regular">
                <span>산책일지 작성이 완료되었습니다</span>
                <span
                  >({{
                    info.diaryUpdatedAt
                      ? formatDateTime(info.diaryUpdatedAt)
                      : formatDateTime(info.diaryCreatedAt)
                  }})</span
                >
              </span>
            </v-col>
          </v-row>
          <v-card v-if="this.info.status != 6" class="mt-10" variant="tonal">
            <v-row>
              <v-container class="ma-5">
                <v-row>
                  <v-col cols="12" md="9" align-self="center">
                    <span class="secondary-color text-regular semi-bold">
                      산책 서비스에 만족하셨나요? 리뷰를 남겨주세요
                    </span>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-btn
                      v-if="!info.reviewWriten"
                      @click="clickReview"
                      color="primary"
                      block
                      style="height: 50px">
                      <span class="text-regular white"> 리뷰 작성하기</span>
                    </v-btn>
                    <div v-if="info.reviewWriten">
                      <span class="text-regular semi-bold grey mr-4">
                        리뷰 작성완료
                      </span>
                      <span>
                        <v-btn @click="showReview" color="primary">
                          <span class="white">리뷰보기</span>
                        </v-btn>
                      </span>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-row>
          </v-card>
        </v-container>
      </v-col>

      <v-spacer />
    </v-row>
    <v-spacer style="height: 100px"></v-spacer>
  </v-container>
  <router-view name="dialog" />
</template>

<script>
import reservApi from '@/api/reservApi';
import format from '@/utillFunction/format';
import CusReservDetail from '@/components/reservDetails/CusReservDetail.vue';

export default {
  components: {
    CusReservDetail,
  },
  created() {
    reservApi
      .getReservById(this.$store.state.item.reservId)
      .then((res) => {
        this.info = res.data;
        console.log('getReservById ', this.info);

        // 이미지 출력
        const urlfront = 'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
        if (
          this.info.applicationDto.dirName &&
          this.info.applicationDto.fileName &&
          this.info.applicationDto.extension
        ) {
          this.info.applicationDto.imgUrl = `${urlfront}/${this.info.applicationDto.dirName}/${this.info.applicationDto.fileName}.${this.info.applicationDto.extension}`;
        }
        if (
          this.info.commisionDto.dirName &&
          this.info.commisionDto.fileName &&
          this.info.commisionDto.extension
        ) {
          this.info.commisionDto.imgUrl = `${urlfront}/${this.info.commisionDto.dirName}/${this.info.commisionDto.fileName}.${this.info.commisionDto.extension}`;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      info: {},
      title0: '해당 예약은 취소되었습니다.',
      title1: '예약이 완료되었습니다. 고객님의 결제를 기다리고 있습니다.',
      title2: '고객님의 결제가 완료되었습니다.',
      title3: '산책 수행 중입니다.',
      title4: '산책이 완료되었습니다.',
      subtitle1: '결제를 완료해야만 산책 서비스가 시작될 수 있습니다',
      subtitle2:
        '예약된 산책일시에 도그워커가 고객님 댁에 도착하여 산책이 진행됩니다. 산책 후 강아지를 고객님 댁으로 데려다 준 후 산책이 종료됩니다. 산책 중 및 산책 종료 후 도그워커가 작성한 산책일지를 확인해주세요',
      subtitle3:
        '도그워커가 작성한 산책일지를 확인 해 주세요. 산책 종료 후 1일 이내에 산책일지 작성이 완료됩니다',
    };
  },
  methods: {
    // 날짜 포맷(2023-08-19T20:11:29 -> 2023-08-19)
    formatDateTime(dt) {
      return new Date(dt).toISOString().split('T')[0];
    },
    // 총가격 = 시간당가격 * 산책시간
    totalPrice(price, start, end) {
      return format.totalPrice(price, start, end);
    },
    formatCancelerUserType(type) {
      return type === 'dogwalker' ? '도그워커 ' : '고객 ';
    },
    formatCancelerNick(type) {
      if (type === 'dogwalker') {
        return this.info.applicationDto.nick;
      } else {
        return this.info.commisionDto.nick;
      }
    },
    clickReview() {
      this.$store.commit('setOpen', true);
      this.$router.push('/cusInfo/reservDetail/reviewForm');
    },
    // 결제하기
    clickPurchase() {
      this.$router.push('/cusInfo/purchase');
    },
    // 산책일지 확인하기
    showDiary() {
      this.$router.push('/cusInfo/cusInfoDiary/diaryDetail');
      this.$store.commit('setOpen', true);
    },
    showReview() {
      this.$store.commit('setReviewId', this.info.reviewId);
      this.$router.push('/reviewDetail');
    },
  },
};
</script>

<style></style>
