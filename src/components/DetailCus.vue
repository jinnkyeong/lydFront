<template>
  <v-container>
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
    <!-- 주소 -->
    <v-container class="mt-7 mb-5">
      <v-row>
        <div class="info-label">주소</div>
      </v-row>
      <v-row>
        <div class="info-text">{{ info.addrState }} {{ info.addrTown }}</div>
      </v-row>
      <v-divider class="mt-4" />
    </v-container>
    <!-- 산책일시 -->
    <v-container class="mt-7 mb-5">
      <v-row>
        <div class="info-label">산책일시</div>
      </v-row>
      <v-row>
        <v-col cols="12" md="2" align-self="center" class="field-label-sub">
          <div class="secondary-color ml-7">산책 날짜</div>
        </v-col>
        <v-col cols="12" md="10">
          <div class="info-text">{{ info.month }}월 {{ info.day }}일</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="2" align-self="center" class="field-label-sub">
          <div class="secondary-color ml-7">시작시간</div>
        </v-col>
        <v-col cols="12" md="10">
          <div class="info-text">
            {{ formatTime(info.startHour, info.startMin) }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="2" align-self="center" class="field-label-sub">
          <div class="secondary-color ml-7">종료시간</div>
        </v-col>
        <v-col cols="12" md="10">
          <div class="info-text">
            {{ formatTime(info.endHour, info.endMin) }}
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- 자격증 -->
    <v-container class="mt-7 mb-5">
      <v-row>
        <div class="info-label">희망 자격증</div>
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
          <span v-if="!info.certificateKeywords"> 없음 </span>
        </div>
      </v-row>
      <v-divider class="mt-4" />
    </v-container>
    <!-- 금액 -->
    <v-container class="mt-7 mb-5">
      <v-row>
        <div class="info-label">희망하는 시간당 보수금액</div>
      </v-row>
      <v-row>
        <div class="info-text">{{ info.price }} 원</div>
      </v-row>
      <v-divider class="mt-4" />
    </v-container>
    <!-- 반려견 이름 -->
    <v-container class="mt-7 mb-5">
      <v-row>
        <div class="info-label">반려견 이름</div>
      </v-row>
      <v-row>
        <div class="info-text">{{ info.dogName }}</div>
      </v-row>
      <v-divider class="mt-4" />
    </v-container>
    <!-- 반려견 나이 -->
    <v-container class="mt-7 mb-5">
      <v-row>
        <div class="info-label">반려견 나이</div>
      </v-row>
      <v-row>
        <div class="info-text">{{ info.dogAge }}개월</div>
      </v-row>
      <v-divider class="mt-4" />
    </v-container>

    <!-- 반려견 견종 -->
    <v-container class="mt-7 mb-5">
      <v-row>
        <div class="info-label">반려견 견종</div>
      </v-row>
      <v-row>
        <div class="info-text">{{ info.breed }}</div>
      </v-row>
      <v-divider class="mt-4" />
    </v-container>

    <!-- 반려견 유형 -->
    <v-container class="mt-7 mb-5">
      <v-row>
        <div class="info-label">반려견 유형(소/중/대형)</div>
      </v-row>
      <v-row>
        <div class="info-text">{{ info.dogType }}</div>
      </v-row>
      <v-divider class="mt-4" />
    </v-container>
    <!-- 반려견 공격성 -->
    <v-container class="mt-7 mb-5">
      <v-row>
        <div class="info-label">반려견 공격성</div>
      </v-row>
      <v-row>
        <div class="info-text">{{ info.dogAggr }}</div>
      </v-row>
      <v-divider class="mt-4" />
    </v-container>

    <!-- 반려견 건강상태 -->
    <v-container class="mt-7 mb-5">
      <v-row>
        <div class="info-label">반려견 건강상태</div>
      </v-row>
      <v-row>
        <div class="info-text">{{ info.dogHealth }}</div>
      </v-row>
      <v-divider class="mt-4" />
    </v-container>

    <!-- 산책로 -->
    <v-container class="mt-7 mb-5">
      <v-row>
        <div class="info-label">산책로 지정</div>
      </v-row>
      <v-row>
        <div v-if="info.road" class="info-text">{{ info.road }}</div>
        <div v-if="!info.road" class="info-text">없음</div>
      </v-row>
      <v-divider class="mt-4" />
    </v-container>

    <!-- 유의할 점 -->
    <v-container class="mt-7 mb-5">
      <v-row>
        <div class="info-label">요청사항</div>
      </v-row>
      <v-row v-for="(rq, index) in info.cusRequireDtos" :key="index">
        <v-col cols="12" md="1" align-self="center">
          <h3 class="secondary-color ml-7">{{ index + 1 }}</h3>
        </v-col>
        <v-col cols="12" md="11" align-self="center">
          <div class="info-text">
            {{ rq.context }}
          </div>
        </v-col>
      </v-row>
      <v-divider class="mt-4" />
    </v-container>

    <!-- 수정하기 : 해당 의뢰서 작성자의 id = 현재 유저의 id -->
    <v-container
      v-if="
        $store.state.login.cusId === info.customerId &&
        $store.state.item.exposeMB
      ">
      <v-row class="pt-16">
        <v-spacer />
        <v-col cols="12" md="4">
          <v-btn @click="clickModify" block size="70px" color="primary"
            >수정하기</v-btn
          >
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import format from '@/utillFunction/format';

export default {
  data() {
    return {};
  },
  props: {
    info: Object,
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
    dogTypeConvert(dogTypeCode) {
      if (dogTypeCode) {
        switch (dogTypeCode) {
          case 1:
            return '소형견';
          case 2:
            return '중형견';
          case 3:
            return '대형견';
          case 4:
            return '초대형견';
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
    clickModify() {
      // 수정페이지로 이동
      this.$router.push({
        name: 'detailCusMod',
        query: { commisionId: this.$store.state.item.comId },
      });
    },
    formatTime(h, m) {
      return format.formatTime(h, m);
    },
  },
};
</script>

<style>
.outlined {
  /*리뷰 작성자 정보*/
  border: solid 1px black;
}
.grey-zone {
  /*리뷰 작성부분*/
  background-color: grey;
}
.outlined-context {
  width: 700px;
  border: solid 3px green;
  margin: auto;
}
.info-label {
  margin: 5px;
}
.info-text {
  margin: 15px;
  padding-left: 10px;
}
</style>
