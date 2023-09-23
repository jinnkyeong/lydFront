<template>
  <v-container>
    <!-- 제목 -->
    <v-row>
      <v-col cols="12" md="11">
        <v-container>
          <v-row style="height: 50px"></v-row>
          <v-row>
            <div class="title">내 산책문의 목록</div>
            <!-- 의뢰서 나열 -->
          </v-row>
          <v-row>
            <div class="desc mt-7">
              <div>도그워커에게 산책대행 서비스를 문의하신 목록입니다.</div>
              <div>.</div>
            </div>
          </v-row>
        </v-container>
        <v-row style="height: 100px" />
      </v-col>
    </v-row>
    <v-row style="height: 100px" />

    <!-- 문의 나열 -->
    <v-container>
      <!-- tab -->
      <v-tabs
        v-model="tab"
        class="primary-color"
        align-tabs="center"
        fixed-tabs>
        <v-tab :value="'waiting'"><p>미수락 문의</p></v-tab>
        <v-tab :value="'canceled'"><p>취소된 문의</p></v-tab>
        <v-tab :value="'rejected'"><p>거절된 문의</p></v-tab>
      </v-tabs>
      <!-- tab 선택 시 출력될 window -->
      <v-spacer style="height: 80px" />

      <v-window v-model="tab">
        <v-window-item v-for="t in tabList" :key="t" :value="t">
          <!-- waiting 탭이 열리면-->
          <v-container v-if="t === 'waiting'">
            <!-- 하나라도 있는 경우 -->
            <v-row
              justify="center"
              v-for="inq in inquiryList"
              :key="inq"
              class="list-box pa-2">
              <!-- (의뢰한)고객 이미지 -->
              <v-col cols="12" md="2">
                <v-img
                  v-if="inq.imgUrl"
                  class="ma-5"
                  :src="inq.imgUrl"
                  height="100px"
                  width="150px"
                  aspect-ratio="4/3"
                  cover></v-img>
                <v-img
                  v-if="!inq.imgUrl"
                  class="ma-5"
                  src="@/assets/images/profile/profileImage.jpg"
                  height="100px"
                  width="150px"
                  aspect-ratio="4/3"
                  cover />
              </v-col>
              <v-spacer />
              <!-- 정보 -->
              <v-col cols="12" md="6">
                <!-- 문의날짜 -->
                <div class="ma-1">
                  <span class="pl-3 pr-3 secondary-color"> 문의 날짜 </span>
                  <span class="pr-1">
                    {{ formatDateTime(inq.inquiryCreatedAt) }}
                  </span>
                </div>
                <!-- 고객 닉네임 -->
                <div class="ma-1">
                  <span class="pl-3 pr-3 secondary-color"> 문의 대상</span>
                  <span class="pr-1">도그워커 {{ inq.dwNick }} </span>
                </div>
                <!-- 고객님 주소 -->
                <div class="ma-1">
                  <span class="pl-3 pr-3 grey-little-light">
                    <font-awesome-icon icon="fa-solid fa-location-dot" />
                  </span>
                  <span class="pr-1">{{ inq.addrState }}</span>
                  <span>{{ inq.addrTown }}</span>
                </div>
                <div class="ma-1">
                  <span class="pl-3 pr-3 grey-little-light">
                    <font-awesome-icon icon="fa-solid fa-calendar-days" />
                  </span>
                  <span class="pr-1">{{ inq.month }} 월</span>
                  <span>{{ inq.day }} 일</span>
                </div>
              </v-col>
              <!-- 버튼 -->
              <v-col align-self="center">
                <div class="primary-color text-micro text-center mb-2">
                  <div>미수락 된 문의는</div>
                  <div>취소할 수 있습니다</div>
                </div>
                <div>
                  <ConfirmCancel
                    @cancel="cancelInquiry"
                    :inquiryId="inq.inquiryId" />
                </div>
              </v-col>
              <!-- 버튼 -->
              <v-spacer />
              <v-col cols="12" md="1" align-self="center">
                <div
                  @click="clickDetail(inq.applicationId, inq.commisionId)"
                  class="pd-5">
                  <font-awesome-icon
                    icon="fa-solid fa-chevron-right "
                    size="xl"
                    class="left-modify" />
                </div>
              </v-col>
            </v-row>
            <!-- 하나도 없는 경우 -->
            <v-row justify="center" style="height: 200px">
              <v-col cols="12" md="8" align-self="center">
                <div>{{ messageW }}</div>
              </v-col>
            </v-row>
          </v-container>
          <!-- canceled 탭이 열리면-->
          <v-container v-if="t === 'canceled'">
            <!-- 하나라도 있는 경우 -->
            <v-row
              justify="center"
              v-for="inq in canceledInquiryList"
              :key="inq"
              class="list-box pa-2">
              <!-- (의뢰한)고객 이미지 -->
              <v-col cols="12" md="2">
                <v-img
                  v-if="inq.imgUrl"
                  class="ma-5"
                  :src="inq.imgUrl"
                  height="100px"
                  width="150px"
                  aspect-ratio="4/3"
                  cover></v-img>
                <v-img
                  v-if="!inq.imgUrl"
                  class="ma-5"
                  src="@/assets/images/profile/profileImage.jpg"
                  height="100px"
                  width="150px"
                  aspect-ratio="4/3"
                  cover></v-img>
              </v-col>
              <v-spacer />
              <!-- 정보 -->
              <v-col cols="12" md="6">
                <!-- 문의날짜 -->
                <div class="ma-1">
                  <span class="pl-3 pr-3 secondary-color"> 문의 날짜 </span>
                  <span class="pr-1">
                    {{ formatDateTime(inq.inquiryCreatedAt) }}
                  </span>
                </div>
                <!-- 고객 닉네임 -->
                <div class="ma-1">
                  <span class="pl-3 pr-3 secondary-color"> 문의 대상</span>
                  <span class="pr-1">도그워커 {{ inq.dwNick }} </span>
                </div>
                <!-- 고객님 주소 -->
                <div class="ma-1">
                  <span class="pl-3 pr-3 grey-little-light">
                    <font-awesome-icon icon="fa-solid fa-location-dot" />
                  </span>
                  <span class="pr-1">{{ inq.addrState }}</span>
                  <span>{{ inq.addrTown }}</span>
                </div>
                <div class="ma-1">
                  <span class="pl-3 pr-3 grey-little-light">
                    <font-awesome-icon icon="fa-solid fa-calendar-days" />
                  </span>
                  <span class="pr-1">{{ inq.month }} 월</span>
                  <span>{{ inq.day }} 일</span>
                </div>
              </v-col>
              <!-- 버튼 -->
              <v-spacer />
              <v-col align-self="center">
                <div class="grey-little-light text-center mb-2">
                  <div>{{ formatDateTime(inq.invalidatedAt) }}</div>
                  <div>문의 취소됨</div>
                </div>
              </v-col>
              <v-col cols="12" md="1" align-self="center">
                <div
                  @click="clickDetail(inq.applicationId, inq.commisionId)"
                  class="pd-5">
                  <font-awesome-icon
                    icon="fa-solid fa-chevron-right "
                    size="xl"
                    class="left-modify" />
                </div>
              </v-col>
            </v-row>
            <!-- 하나도 없는 경우 -->
            <v-row justify="center" style="height: 200px">
              <v-col cols="12" md="8" align-self="center">
                <div>{{ messageC }}</div>
              </v-col>
            </v-row>
          </v-container>
          <!-- rejected 탭이 열리면-->
          <v-container v-if="t === 'rejected'">
            <!-- 하나라도 있는 경우 -->
            <v-row
              justify="center"
              v-for="inq in rejectedInquiryList"
              :key="inq"
              class="list-box pa-2">
              <!-- (의뢰한)고객 이미지 -->
              <v-col cols="12" md="2">
                <v-img
                  class="ma-5"
                  :src="inq.imgUrl"
                  height="100px"
                  width="150px"
                  aspect-ratio="4/3"
                  cover></v-img>
              </v-col>
              <v-spacer />
              <!-- 정보 -->
              <v-col cols="12" md="6">
                <div>
                  <span class="pl-3 pr-3">
                    <font-awesome-icon icon="fa-solid fa-user"
                  /></span>
                  <span class="pr-1">{{ inq.cusNick }}</span>
                </div>
                <div>
                  <span class="pl-3 pr-3"
                    ><font-awesome-icon icon="fa-solid fa-location-dot"
                  /></span>
                  <span class="pr-1">{{ inq.addrState }}</span>
                  <span>{{ inq.addrTown }}</span>
                </div>
                <div>
                  <span class="pl-3 pr-3">
                    <font-awesome-icon icon="fa-solid fa-calendar-days" />
                  </span>
                  <span class="pr-1">{{ inq.month }} 월</span>
                  <span>{{ inq.day }} 일</span>
                </div>
                <div>
                  <span class="pl-3 pr-3 hightlight"> 문의날짜 </span>
                  <span class="pr-1">
                    {{ formatDateTime(inq.inquiryCreatedAt) }}
                  </span>
                </div>
              </v-col>
              <!-- 버튼 -->
              <v-spacer />
              <v-col align-self="center">
                <div class="grey-little-light text-center mb-2">
                  <div>{{ formatDateTime(inq.invalidatedAt) }}</div>
                  <div>문의 거절됨</div>
                </div>
              </v-col>
              <v-col cols="12" md="1" align-self="center">
                <div
                  @click="clickDetail(inq.applicationId, inq.commisionId)"
                  class="pd-5">
                  <font-awesome-icon
                    icon="fa-solid fa-chevron-right "
                    size="xl"
                    class="left-modify" />
                </div>
              </v-col>
            </v-row>
            <!-- 하나도 없는 경우 -->
            <v-row justify="center" style="height: 200px">
              <v-col cols="12" md="8" align-self="center">
                <div>{{ messageR }}</div>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
      </v-window>
    </v-container>
  </v-container>
  <router-view name="dialog" />
</template>

<script>
import myInfoApi from '@/api/myInfoApi';
import inquiryApi from '@/api/inquiryApi';
import ConfirmCancel from '@/views/dialog/confirm/ConfirmCancel.vue';

export default {
  components: {
    ConfirmCancel,
  },
  mounted() {
    // dogwalker id -> offer list (status 1,4)
    // key 1: alive(1,4)  2: canceled(0)  3: rejected(3)
    // 미수락 문의 리스트
    const info = {
      userId: this.$store.state.login.cusId,
      userType: 'customer',
      key: 1,
    };
    inquiryApi
      .getInquiries(1, info)
      .then((res) => {
        if (res.data.content.length > 0) {
          this.inquiryList = res.data.content;
          console.log('this.inquiryList', this.inquiryList);

          for (let i = 0; i < this.inquiryList.length; i++) {
            const dirName = this.inquiryList[i].dwDirName;
            const fileName = this.inquiryList[i].dwFileName;
            const extension = this.inquiryList[i].dwExtension;
            if (dirName && fileName && extension) {
              const urlfront =
                'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
              const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
              this.inquiryList[i].imgUrl = imgUrl;
            }
          }
        } else {
          // 없으면
          console.log('부족');
          this.messageW = '문의 내역이 존재하지 않습니다';
        }
      })
      .catch((e) => {
        console.log(e);
      });
    // 취소 리스트
    const info2 = {
      userId: this.$store.state.login.cusId,
      userType: 'customer',
      key: 2,
    };
    inquiryApi
      .getInquiries(1, info2)
      .then((res) => {
        if (res.data.content.length > 0) {
          this.canceledInquiryList = res.data.content;
          console.log('this.canceledInquiryList', this.canceledInquiryList);

          for (let i = 0; i < this.canceledInquiryList.length; i++) {
            const dirName = this.canceledInquiryList[i].dwDirName;
            const fileName = this.canceledInquiryList[i].dwFileName;
            const extension = this.canceledInquiryList[i].dwExtension;
            if (dirName && fileName && extension) {
              const urlfront =
                'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
              const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
              this.canceledInquiryList[i].imgUrl = imgUrl;
            }
          }
        } else {
          // 없으면
          console.log('부족');
          this.messageC = '취소된 문의 내역이 존재하지 않습니다';
        }
      })
      .catch((e) => {
        console.log(e);
      });
    // 거절 리스트
    const info3 = {
      userId: this.$store.state.login.cusId,
      userType: 'customer',
      key: 3,
    };
    inquiryApi
      .getInquiries(1, info3)
      .then((res) => {
        if (res.data.content.length > 0) {
          this.rejectedInquiryList = res.data.content;
          console.log('this.rejectedInquiryList', this.rejectedInquiryList);
        } else {
          // 없으면
          console.log('부족');
          this.messageR = '거절된 문의 내역이 존재하지 않습니다';
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      inquries: [],
      messageW: '',
      messageC: '',
      messageR: '',
      key: null, // key 1: alive(1,4)  2: canceled(0)  3: rejected(3)
      inquiryList: [],
      canceledInquiryList: [],
      rejectedInquiryList: [],

      // tab
      tab: null,
      tabList: ['waiting', 'canceled', 'rejected'],
    };
  },
  methods: {
    // 날짜 포맷(2023-08-19T20:11:29 -> 2023-08-19)
    formatDateTime(dt) {
      return new Date(dt).toISOString().split('T')[0];
    },
    // 문의의 양 당사자 app inq 확인용
    clickDetail(appId, comId) {
      this.$store.commit('setAppId', appId);
      this.$store.commit('setComId', comId);
      this.$store.commit('setOpen', true);
      this.$router.push('/cusInfo/cusInfoInquiry/cusInquiryDetail');
    },
    cancelInquiry(cancel) {
      if (cancel) {
        inquiryApi
          .invalidateInquiry(this.$store.state.item.inquiryId, 0) // 취소
          .then((res) => {
            console.log('invalidateInquiry ', res.data);
            this.$router.push('/cusInfo/cusInfoInquiry/cancelInqSuccess'); // 거절 완료 창
            this.$store.commit('setOpen', true); // 거절 완료 창 열기
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>

<style></style>
