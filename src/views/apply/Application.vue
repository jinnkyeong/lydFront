<template>
  <!-- 지원서 메인 이미지 -->
  <v-container fluid class="ma-0 pa-0 image-bg-apply">
    <v-spacer style="height: 300px" class="ma-0 pa-0" />
    <v-row class="ma-0 pa-0">
      <v-col cols="12" md="8" />
      <v-col cols="12" md="4">
        <v-row>
          <div class="main-title-white">
            <div>강아지와 산책하며</div>
            <div>행복하게 돈 벌어보세요</div>
          </div>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="2" />
          <v-col cols="12" md="6">
            <v-btn
              block
              style="height: 70px"
              class="ma-7 pa-6"
              rounded="xl"
              @click="goToApplyForm"
              color="primary">
              <div class="ma-5">
                <span class="text-regular white">도그워커 지원하기</span>
                <span class="text-regular white">
                  <font-awesome-icon
                    icon="fa-solid fa-arrow-right"
                    class="ml-2" />
                </span>
              </div>
            </v-btn>
          </v-col>
          <v-spacer />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-spacer style="height: 200px" />
  <!-- 광고1 -->
  <v-container fluid class="ma-0 pa-0">
    <!-- 첫줄 -->
    <v-row>
      <v-spacer />
      <!-- 첫번째 -->
      <v-col cols="12" md="3">
        <!-- 이미지 -->
        <v-row>
          <v-spacer />
          <v-col cols="12" md="5">
            <v-img
              aspect-ratio="1"
              src="@/assets/images/apply/calender.png"
              cover />
          </v-col>
          <v-spacer />
        </v-row>
        <!-- 타이틀 -->
        <v-row justify="center">
          <h3 class="secondary-color">산책 시간과 장소 선택 가능</h3>
        </v-row>
        <!-- 내용 -->
        <v-row>
          <v-spacer />
          <v-col cols="12" md="10">
            <div class="text-regular">
              도그워커는 산책할 시간과 지역을 직접 선택할 수 있습니다.
            </div>
            <div class="text-regular">
              ‘찾기 - 의뢰찾기’에서 바로 원하는 시간, 지역 등의 조건에 맞는
              의뢰를 찾아서 선택할 수 도 있습니다.
            </div>
          </v-col>
          <v-spacer />
        </v-row>
      </v-col>
      <!-- 두번째 -->
      <v-col cols="12" md="3">
        <!-- 이미지 -->
        <v-row>
          <v-spacer />
          <v-col cols="12" md="5">
            <v-img
              aspect-ratio="1"
              src="@/assets/images/apply/heart.png"
              cover />
          </v-col>
          <v-spacer />
        </v-row>
        <!-- 타이틀 -->
        <v-row justify="center">
          <h3 class="secondary-color">힐링받는 작업환경</h3>
        </v-row>
        <!-- 내용 -->
        <v-row>
          <v-spacer />
          <v-col cols="12" md="10">
            <div class="text-regular">
              사랑스러운 강아지와 함께 발맞춰 산책하는 과정은 힐링이 될 수
              있습니다
            </div>
          </v-col>
          <v-spacer />
        </v-row>
      </v-col>
      <v-spacer />
    </v-row>
    <!-- 경계선 -->
    <v-row>
      <v-spacer />
      <v-col cols="12" md="3">
        <v-divider thickness="2" class="mt-6 mb-6" />
      </v-col>
      <v-col cols="12" md="3">
        <v-divider thickness="2" class="mt-6 mb-6" />
      </v-col>
      <v-spacer />
    </v-row>
    <!-- 둘째줄 -->
    <v-row>
      <v-spacer />
      <!-- 세번째 -->
      <v-col cols="12" md="3">
        <!-- 이미지 -->
        <v-row>
          <v-spacer />
          <v-col cols="12" md="5">
            <v-img aspect-ratio="1" src="@/assets/images/apply/bag.png" cover />
          </v-col>
          <v-spacer />
        </v-row>
        <!-- 타이틀 -->
        <v-row justify="center">
          <h3 class="secondary-color">물품 대여 가능</h3>
        </v-row>
        <!-- 내용 -->
        <v-row>
          <v-spacer />
          <v-col cols="12" md="10">
            <div class="text-regular">
              산책 리드줄, 휴대용 수통, 배변봉투, 모바일 기기 등의 장비나 물품은
              대여할 수 있습니다.
            </div>
          </v-col>
          <v-spacer />
        </v-row>
      </v-col>
      <!-- 네번째 -->
      <v-col cols="12" md="3">
        <!-- 이미지 -->
        <v-row>
          <v-spacer />
          <v-col cols="12" md="5">
            <v-img
              aspect-ratio="1"
              src="@/assets/images/apply/wallet.png"
              cover />
          </v-col>
          <v-spacer />
        </v-row>
        <!-- 타이틀 -->
        <v-row justify="center">
          <h3 class="secondary-color">노동강도 대비 높은 보수</h3>
        </v-row>
        <!-- 내용 -->
        <v-row>
          <v-spacer />
          <v-col cols="12" md="10">
            <div class="text-regular">
              도그워커들의 평균 보수는 약 만천 원으로, 보통 노동강도 대비
              높습니다
            </div>
          </v-col>
          <v-spacer />
        </v-row>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
  <v-spacer style="height: 200px" />
  <!-- 도그워커 채용프로세스 -->
  <v-container fluid class="ma-0 pa-0 back-primary-light-square">
    <v-spacer style="height: 150px" />
    <!-- 제목 -->
    <v-row justify="center">
      <h1 class="grey">어떻게 도그워커가 될 수 있나요?</h1>
    </v-row>
    <!-- 설명 -->
    <v-row class="mt-6 mb-12">
      <v-spacer />
      <v-col cols="12" md="9">
        <div class="text-regular grey text-center">
          loveyourdog은 고객님에게 편리하고 안전한 산책 서비스를 제공하기 위하여
          반려견에 대한 애정과 이해가 있는 도그워커를 모집합니다.
        </div>
        <div class="text-regular grey text-center">
          따라서 아래와 같이 소정의 심사와 반려견 산책 교육을 이수한 지원자에
          대해서만 loveyourdog의 도그워커 자격을 부여하고 있습니다.
        </div>
      </v-col>
      <v-spacer />
    </v-row>
    <!-- 단계 -->
    <v-row no-gutters>
      <v-spacer />
      <!-- 첫번째 -->
      <v-col cols="12" md="2">
        <v-container class="pa-10 process-box">
          <v-row no-gutters class="mb-3">
            <h3>
              <div class="secondary-color mr-3">STEP 1</div>
              <div class="">지원서 작성</div>
            </h3>
          </v-row>
          <v-row no-gutters>
            <v-spacer />
            <v-col cols="12" md="12" class="text-regular">
              지원자의 자격과 열정을 알기 위해서 지원서류를 작성합니다
            </v-col>
            <v-spacer />
          </v-row>
        </v-container>
      </v-col>
      <span style="margin-top: 150px" class="pl-2 pr-2">
        <font-awesome-icon
          icon="fa-solid fa-chevron-right "
          size="xl"
          class="primary-color" />
      </span>
      <!-- 두번째 -->
      <v-col cols="12" md="2">
        <v-container class="pa-10 process-box">
          <v-row no-gutters class="mb-3">
            <h3>
              <div class="secondary-color mr-3">STEP 2</div>
              <div class="">온라인 교육</div>
            </h3>
          </v-row>
          <v-row no-gutters>
            <v-spacer />
            <v-col cols="12" md="12" class="text-regular">
              도그워커로서 알아야 할 산책지식, 매뉴얼, 그밖의 이론적인 지식을
              동영상으로 교육받습니다.
            </v-col>
            <v-spacer />
          </v-row>
        </v-container>
      </v-col>
      <span style="margin-top: 150px" class="pl-2 pr-2">
        <font-awesome-icon
          icon="fa-solid fa-chevron-right "
          size="xl"
          class="primary-color" />
      </span>
      <!-- 세번째 -->
      <v-col cols="12" md="2">
        <v-container class="pa-10 process-box">
          <v-row no-gutters class="mb-3">
            <h3>
              <div class="secondary-color mr-3">STEP 3</div>
              <div class="">테스트</div>
            </h3>
          </v-row>
          <v-row no-gutters>
            <v-spacer />
            <v-col cols="12" md="12" class="text-regular">
              온라인 교육 결과 도그워커로서 갖춰야 할 기본적인 지식과 기술을
              온라인 테스트로 검증합니다
            </v-col>
            <v-spacer />
          </v-row>
        </v-container>
      </v-col>
      <span style="margin-top: 150px" class="pl-2 pr-2">
        <font-awesome-icon
          icon="fa-solid fa-chevron-right "
          size="xl"
          class="primary-color" />
      </span>
      <!-- 네번째 -->
      <v-col cols="12" md="2">
        <v-container class="pa-10 process-box">
          <v-row no-gutters class="mb-3">
            <h3>
              <div class="secondary-color mr-3">STEP 4</div>
              <div class="">전화 인터뷰</div>
            </h3>
          </v-row>
          <v-row no-gutters>
            <v-spacer />
            <v-col cols="12" md="12" class="text-regular">
              지원자와의 1:1 전화 인터뷰를 진행하여 도그워커 합격여부를 결정하게
              됩니다
            </v-col>
            <v-spacer />
          </v-row>
        </v-container>
      </v-col>
      <v-spacer />
    </v-row>
    <v-spacer style="height: 200px" />
  </v-container>
</template>

<script>
export default {
  methods: {
    goToApplyForm() {
      this.$router.push('applicationForm');
    },
  },
};
</script>

<style>
.image-bg-apply {
  background: url('@/assets/images/apply/dog_run.jpg');
  background-size: cover;
  height: 100vh;
}
.process-box {
  border-radius: 30px;
  background-color: var(--color-white);
  min-height: 330px;
}
</style>
