<template>
  <v-dialog
    class="dialog"
    width="1000px"
    transition="dialog-top-transition"
    v-model="$store.state.just_state.open">
    <!-- 너버 - 임의로 정함 -->
    <v-card class="pa-10">
      <v-card-title>
        <!-- 제목(의뢰서 or 지원서) -->
        <v-row>
          <v-col cols="12" md="2">
            <h3 v-if="tab" class="pa-6">고객님의 의뢰서</h3>
            <h3 v-if="!tab" class="pa-6">도그워커의 지원서</h3>
          </v-col>
          <v-spacer />
          <v-col cols="12" md="3">
            <div v-if="!tab">
              <v-btn
                @click="tab = !tab"
                size="x-large"
                color="secondary"
                variant="tonal">
                고객님의 의뢰서
              </v-btn>
              <div class="desc ml-3">도그워커에게 문의했던</div>
              <div class="desc ml-3">산책의뢰서를 확인해보세요</div>
            </div>
            <div v-if="tab">
              <v-btn
                @click="tab = !tab"
                size="x-large"
                color="secondary"
                variant="tonal">
                문의받은 지원서
              </v-btn>
              <div class="desc ml-3">고객님이 문의했던 도그워커의</div>
              <div class="desc ml-3">지원서를 확인할 수 있습니다</div>
            </div>
          </v-col>
        </v-row>

        <!-- 반대꺼(지원서 or 의뢰서) 보기 -->
        <!-- <v-row no-gutters justify="end">
          <v-spacer />
          <v-col cols="12" md="5" @click="tab = !tab">
            <v-container class="opposite-box">
              <v-row noGutters>
                <v-col v-if="tab" cols="12" md="4">
                  <v-img
                    src="@/assets/images/logo.png"
                    height="80px"
                    cover></v-img>
                </v-col>
                <v-col v-if="!tab" cols="12" md="4">
                  <v-img
                    src="@/assets/images/logo.png"
                    height="80px"
                    cover></v-img>
                </v-col>
                <v-spacer />
                <v-col v-if="tab" cols="12" md="7" style="cursor: pointer">
                  <div>지목된 지원서 확인</div>
                  <div>
                    <span class="pl-3 pr-3">
                      <font-awesome-icon icon="fa-solid fa-user"
                    /></span>
                    <span class="pr-1">{{ appInfo.name }}닉넴</span>
                  </div>
                  <div>
                    <span class="pl-3 pr-3"
                      ><font-awesome-icon icon="fa-solid fa-location-dot"
                    /></span>
                    <span class="pr-1">{{ appInfo.addrState }}</span>
                    <span>{{ appInfo.addrTown }}</span>
                  </div>
                  <div>
                    <span class="pl-3 pr-3">
                      <font-awesome-icon icon="fa-solid fa-money-bil" />
                    </span>
                    <span class="pr-1">{{ appInfo.price }}</span>
                  </div>
                </v-col>
                <v-col v-if="!tab" cols="12" md="7" style="cursor: pointer">
                  <div>고객님의 의뢰서 보기</div>
                  <div>
                    <span class="pl-3 pr-3">
                      <font-awesome-icon icon="fa-solid fa-user"
                    /></span>
                    <span class="pr-1">{{ comInfo.name }}닉넴</span>
                  </div>
                  <div>
                    <span class="pl-3 pr-3"
                      ><font-awesome-icon icon="fa-solid fa-location-dot"
                    /></span>
                    <span class="pr-1">{{ comInfo.addrState }}</span>
                    <span>{{ comInfo.addrTown }}</span>
                  </div>
                  <div>
                    <span class="pl-3 pr-3">
                      <font-awesome-icon icon="fa-solid fa-money-bil" />
                    </span>
                    <span class="pr-1">{{ comInfo.price }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row> -->
      </v-card-title>

      <!-- 지원서 or 의뢰서 정보 -->
      <v-card-item>
        <DetailDw v-if="tab" :info="appInfo" :reviewList="reviewList" />
        <DetailCus v-if="!tab" :info="comInfo" />
      </v-card-item>
    </v-card>
  </v-dialog>
</template>

<script>
import searchApi from '@/api/searchApi';
import inquiryApi from '@/api/inquiryApi';

import DetailDw from '@/components/DetailDw.vue';
import DetailCus from '@/components/DetailCus.vue';
// import ConfirmInquiry from '../confirm/ConfirmInquiry.vue';

export default {
  created() {
    console.log('created');
    //상세보기 데이터 가져오기 - 지원서
    console.log('appids ', this.$store.state.item.appId);
    searchApi
      .getApp(this.$store.state.item.appId)
      .then((res) => {
        this.appInfo = res.data;
        console.log('this.appInfo ', this.appInfo);
      })
      .catch((e) => {
        console.log(e);
      });
    //상세보기 데이터 가져오기 - 의뢰서
    searchApi
      .getCom(this.$store.state.item.comId)
      .then((res) => {
        this.comInfo = res.data;
        console.log('this.comInfo ', this.comInfo);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  mounted() {
    // 일단 여기서 해제...
    this.$store.commit('setExposeMB', false);
    console.log('여기서 해제...');
  },
  components: {
    DetailDw,
    DetailCus,
    // ConfirmInquiry,
  },
  data() {
    return {
      tab: false,
      appInfo: {},
      comInfo: {},
      reviewList: [
        {
          customerNick: '닉네임',
          breed: '견종',
          dogType: '소중대',
          star: 3.5, //해당 reservtion의 별점
          context: '내용',
          month: 3,
          day: 4,
          hour: 0, // enddt - startdt
          min: 30,
          dirName: '폴더명',
          fileName: '파일명',
          extension: '확장자',
        },
        {
          customerNick: '닉네임',
          breed: '견종',
          dogType: '소중대',
          star: 3.5, //해당 reservtion의 별점
          context: '내용',
          month: 3,
          day: 4,
          hour: 0, // enddt - startdt
          min: 30,
          dirName: '폴더명',
          fileName: '파일명',
          extension: '확장자',
        },
      ],
    };
  },
  methods: {
    clickClose() {
      this.$store.commit('setOpen', false);
    },
    goToMain() {
      this.$store.commit('setOpen', false); // 창 닫기
      this.$router.push('/'); // 메인으로
    },
    goToMyReserv() {
      this.$router.push('myInfoReserv'); // 내 정보- 예약내역으로
    },
    clickAccept(inquiryId) {
      // 예약 생성
      inquiryApi
        .postReserv(inquiryId)
        .then((res) => {
          console.log('postReserv ', res.data);
          this.$router.push('acceptInqSuccess'); // 수락 완료 창
          this.$store.commit('setOpen', true); // 수락 완료 창 열기
        })
        .catch((e) => {
          console.log(e);
        });
    },
    clickReject() {},
  },
};
</script>

<style>
.opposite-box {
  border: 2px green solid;
}
</style>
