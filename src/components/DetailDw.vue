<template>
  <v-container>
    <!-- tab -->
    <v-tabs v-model="tab" class="primary-color" align-tabs="center" fixed-tabs>
      <v-tab :value="'info'">
        <span class="black text-regular">도그워커 정보</span>
      </v-tab>
      <v-tab :value="'review'">
        <span class="black text-regular">리뷰평점</span>
      </v-tab>
    </v-tabs>

    <!-- tab 선택 시 출력될 window -->
    <v-window v-model="tab">
      <v-window-item v-for="t in tabList" :key="t" :value="t">
        <!-- info 탭이 열리면-->
        <v-container v-if="t === 'info'" fluid>
          <!-- 각오의 한마디 -->
          <v-row justify="center" class="pt-16 mt-5">
            <v-spacer />
            <v-col cols="12" md="6" align-self="center">
              <v-container>
                <v-card class="ma-5 pa-10 text-center" variant="tonal">
                  <p>{{ info.sentence }}</p>
                </v-card>
              </v-container>
            </v-col>
            <v-spacer />
          </v-row>
          <!-- 이름 -->

          <v-container class="mt-7 mb-5">
            <v-row>
              <div class="info-label">이름</div>
            </v-row>
            <v-row>
              <div class="info-text">{{ info.name }}</div>
            </v-row>
            <v-divider class="mt-4" />
          </v-container>
          <!-- 닉네임 -->

          <v-container class="mt-7 mb-5">
            <v-row>
              <div class="info-label">닉네임</div>
            </v-row>
            <v-row>
              <div class="info-text">{{ info.nick }}</div>
            </v-row>
            <v-divider class="mt-4" />
          </v-container>
          <!-- 성별 -->

          <v-container class="mt-7 mb-5">
            <v-row>
              <div class="info-label">성별</div>
            </v-row>
            <v-row>
              <div class="info-text">{{ genConvert(info.gen) }}</div>
            </v-row>
            <v-divider class="mt-4" />
          </v-container>
          <!-- 나이 -->

          <v-container class="mt-7 mb-5">
            <v-row>
              <div class="info-label">나이</div>
            </v-row>
            <v-row>
              <div class="info-text">{{ info.age }} 세</div>
            </v-row>
            <v-divider class="mt-4" />
          </v-container>
          <!-- 활동가능지역 -->
          <v-container class="mt-7 mb-5">
            <v-row>
              <div class="info-label">활동가능지역</div>
            </v-row>
            <v-row>
              <div class="info-text">
                {{ info.addrState }} {{ info.addrTown }}
              </div>
            </v-row>
            <v-row v-for="loc in info.locations" :key="loc">
              <div class="info-text">{{ loc.state }} {{ loc.town }}</div>
            </v-row>
            <v-divider class="mt-4" />
          </v-container>
          <!-- 자격증 -->
          <v-container class="mt-7 mb-5">
            <v-row>
              <div class="info-label">자격증</div>
            </v-row>
            <v-row>
              <div class="info-text">
                <span
                  class="ma-2"
                  v-for="(cert, index) in info.certificateKeywords"
                  :key="index">
                  <v-chip size="large" variant="outlined" color="secondary">
                    {{ certificateConvert(cert) }}
                  </v-chip>
                </span>
                <span v-if="!info.certificateKeywords"> 자격증 없음 </span>
              </div>
            </v-row>
            <v-divider class="mt-4" />
          </v-container>
          <!-- 근무가능요일 -->
          <v-container class="mt-7 mb-5">
            <v-row>
              <div class="info-label">근무가능요일</div>
            </v-row>
            <v-row>
              <div class="info-text">
                <span
                  class="ma-2"
                  v-for="(w, index) in info.weekdayNames"
                  :key="index">
                  <v-chip size="large" variant="outlined" color="secondary">
                    {{ w }}
                  </v-chip>
                </span>
              </div>
            </v-row>
            <v-divider class="mt-4" />
          </v-container>
          <!-- 반려경험 -->
          <v-container class="mt-7 mb-5">
            <v-row>
              <div class="info-label">반려경험</div>
            </v-row>
            <v-row>
              <div class="info-text">
                반려경험 {{ info.adopted === true ? '있음' : '없음' }}
              </div>
            </v-row>
            <v-divider class="mt-4" />
          </v-container>
          <!-- 반려했던 강아지 유형 -->
          <v-container v-if="info.adopted">
            <v-row>
              <div class="info-label">반려했던 강아지 유형</div>
            </v-row>
            <v-row>
              <div class="info-text">
                {{ info.adoptedWhich }}
              </div>
            </v-row>
            <v-divider class="mt-4" />
          </v-container>
          <!-- 반려기간 -->
          <v-container v-if="info.adopted">
            <v-row>
              <div class="info-label">반려기간</div>
            </v-row>
            <v-row>
              <div class="info-text">{{ info.adoptedMonth }} 월</div>
            </v-row>
            <v-divider class="mt-4" />
          </v-container>
          <!-- 희망하는 강아지 유형 -->
          <v-container v-if="info.adopted">
            <v-row>
              <div class="info-label">희망하는 강아지 유형</div>
            </v-row>
            <v-row>
              <div class="info-text">
                {{ info.petType }}
              </div>
            </v-row>
            <v-divider class="mt-4" />
          </v-container>
          <!-- 희망하는 시간당 보수금액 -->
          <v-container class="mt-7 mb-5">
            <v-row>
              <div class="info-label">희망하는 시간당 보수금액</div>
            </v-row>
            <v-row>
              <div class="info-text">{{ info.price }} 원</div>
            </v-row>
            <v-divider class="mt-4" />
          </v-container>

          <!-- 수정하기 : 해당 지원서 작성자의 id = 현재 유저의 id -->
          <v-row
            class="pt-16"
            v-if="
              $store.state.login.dwId === info.dogwalkerId &&
              $store.state.item.exposeMB
            ">
            <v-spacer />
            <v-col cols="12" md="4">
              <!-- <v-btn @click="clickModify" block size="50px" color="primary">
                <div class="white">수정하기</div>
              </v-btn> -->
            </v-col>
            <v-spacer />
          </v-row>
        </v-container>
        <!-- review 탭이 열리면 -->
        <v-container v-if="t === 'review'" fluid>
          <!-- 리뷰 카운트 -->
          <v-row class="mt-16">
            <div>리뷰 {{ reviewList.length }} 개</div>
          </v-row>

          <v-row justify="center">
            <v-divider
              class="border-opacity-25 mt-3 mb-10"
              color="success"></v-divider>

            <v-container>
              <v-row v-for="(r, index) in reviewList" :key="index" class="ma-3">
                <Review :review="r" />
              </v-row>
            </v-container>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import Review from '@/components/Review.vue';
export default {
  components: {
    Review,
  },
  created() {},
  data() {
    return {
      tab: null,
      tabList: ['info', 'review'],
    };
  },
  props: {
    info: Object,
    reviewList: Array,
  },
  methods: {
    genConvert(gen) {
      if (gen) {
        switch (gen) {
          case 'm':
            return '남성';
          case 'f':
            return '여성';

          default:
            break;
        }
      }
    },
    certificateConvert(certKey) {
      if (certKey) {
        switch (certKey) {
          case 'dw':
            return '도그워커';
          case 'trn':
            return '훈련사';
          case 'act':
            return '반려동물행동교정사';
          case 'lea':
            return '반려견지도사';
          case 'fun':
            return '반려동물장례지도사';
          case 'bre':
            return '애견브리더';
          case 'lec':
            return '펫시터강사';
          case 'sit':
            return '펫시터';
          case 'mut':
            return '동물매개활동관리사';
          case 'sty':
            return '애견미용사';
          case 'foo':
            return '반려동물식품관리사';

          default:
            break;
        }
      }
    },
    // 수정페이지로 이동
    clickModify() {
      this.$router.push({
        name: 'detailDwMod',
        query: { applicationId: this.$store.state.item.appId },
      });
    },
  },
};
</script>

<style>
.info-label {
  margin: 5px;
}
.info-text {
  margin: 15px;
  padding-left: 10px;
}
</style>
