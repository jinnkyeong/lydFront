<template>
  <!-- 메인페이지 제목 -->
  <v-container fluid class="image-bg-home">
    <v-spacer style="height: 230px" />

    <v-row>
      <v-col cols="12" md="1" />
      <v-col cols="12" md="5">
        <v-row>
          <div>
            <div class="main-title">
              <div class="text-center">애견러와 산책할 시간이 필요한</div>
              <div class="text-center">보호자를 연결하는 플랫폼</div>
            </div>
            <div class="main-logo text-center">loveyourdog</div>
            <!-- <router-link to="/cusInfo/purchase">결제버튼</router-link>
            {{ $store.state.login.alarmOpen }} -->
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <!-- 우리동네 인기 도그워커(4명 이하) -->
  <v-container v-if="$store.state.login.cusId">
    <v-spacer style="height: 200px" />
    <v-row class="ma-5">
      <h3>우리동네 인기 도그워커</h3>
    </v-row>
    <v-row justify="center">
      <v-item-group>
        <v-container>
          <v-row justify="center">
            <v-col v-for="app in apps" :key="app" cols="12" md="3">
              <v-item>
                <div
                  class="pt-15 pl-2 pr-2"
                  @click="selectApp(app.applicationId, app.dogwalkerId)">
                  <Figure :appl="app"></Figure>
                </div>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </v-row>
  </v-container>
  <!-- 광고1 -->
  <v-container>
    <v-row class="mt-10 mb-10" no-gutters>
      <v-spacer />
      <v-col cols="12" md="4">
        <v-spacer style="height: 200px" />
        <v-row class="mb-5">
          <h2>마음 놓고 일상을 보내세요</h2>
        </v-row>
        <v-row>
          <span class="icon">
            <font-awesome-icon icon="fa-solid fa-check" size="xl" />
          </span>
          <p>출근한 사이 강아지를 돌볼 사람이 없는 경우</p>
        </v-row>
        <v-row>
          <span class="icon">
            <font-awesome-icon icon="fa-solid fa-check" size="xl" />
          </span>
          <p>해외 여행, 명절 등 집을 비워야 하는 경우</p>
        </v-row>
        <v-row>
          <span class="icon">
            <font-awesome-icon icon="fa-solid fa-check" size="xl" />
          </span>
          <p>강아지가 활발한 기질을 가진 경우</p>
        </v-row>
        <v-row>
          <span class="icon">
            <font-awesome-icon icon="fa-solid fa-check" size="xl" />
          </span>
          <p>산책부족으로 강아지가 스트레스 받는 경우</p>
        </v-row>
        <v-row>
          <v-btn
            class="ml-16 mt-7"
            @click="clickCommit"
            color="primary"
            variant="outlined"
            rounded
            size="x-large">
            도그워커에게 의뢰하기
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="12" md="4">
        <v-img src="@/assets/images/home/dogtongue.png" cover />
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
  <!-- 광고2 -->
  <v-container>
    <!-- 1 -->
    <v-row>
      <v-spacer />
      <v-col cols="12" md="4" class="pa-5">
        <v-row>
          <v-img
            max-height="60"
            max-width="55"
            src="@/assets/images/home/rock.png"
            cover />
        </v-row>
        <v-row style="height: 50px"></v-row>
        <v-row>
          <div class="ml-10 mr-5 mt-5 mb-5">
            <h3>안전한 이중산책줄 사용</h3>
          </div>
        </v-row>
        <v-row>
          <div class="ml-10 mr-5 mt-5 mb-5">
            <p>
              강아지가 편안하게 산책할 수 있도록 가슴 하네스와 목줄이 연결된
              이중 산책줄을 사용합니다
            </p>
          </div>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" class="pa-5">
        <v-img aspect-ratio="1" src="@/assets/images/home/dog_rope.jpg" cover />
      </v-col>
      <v-spacer />
    </v-row>
    <!-- 2 -->
    <v-row>
      <v-spacer />
      <v-col cols="12" md="4" class="pa-5">
        <v-img
          aspect-ratio="1"
          src="@/assets/images/home/dog_stare.jpg"
          cover />
      </v-col>
      <v-col cols="12" md="4" class="pa-5">
        <v-row justify="end">
          <v-img
            max-height="60"
            max-width="55"
            src="@/assets/images/home/rock.png"
            cover />
          <v-img
            max-height="60"
            max-width="55"
            src="@/assets/images/home/rock.png"
            cover />
        </v-row>
        <v-row style="height: 50px"></v-row>
        <v-row>
          <div class="ml-10 mr-5 mt-5 mb-5">
            <h3>산책 중 급수 상비</h3>
          </div>
        </v-row>
        <v-row>
          <div class="ml-10 mr-5 mt-5 mb-5">
            <p>
              산책 중 탈수증상이 오지 않도록 하는 것이 중요합니다. 도그워커들은
              산책 중 휴대용 수통을 상비하여 수시로 물을 마시도록 합니다.
            </p>
          </div>
        </v-row>
      </v-col>
      <v-spacer />
    </v-row>
    <!-- 3 -->
    <v-row>
      <v-spacer />
      <v-col cols="12" md="4" class="pa-5">
        <v-row>
          <v-img
            max-height="60"
            max-width="55"
            src="@/assets/images/home/rock.png"
            cover />
          <v-img
            max-height="60"
            max-width="55"
            src="@/assets/images/home/rock.png"
            cover />
          <v-img
            max-height="60"
            max-width="55"
            src="@/assets/images/home/rock.png"
            cover />
        </v-row>
        <v-row style="height: 50px"></v-row>
        <v-row>
          <div class="ml-10 mr-5 mt-5 mb-5">
            <h3>맞춤형 산책 코스</h3>
          </div>
        </v-row>
        <v-row>
          <div class="ml-10 mr-5 mt-5 mb-5">
            <p>
              강아지의 나이, 견종, 건강 등에 따라 산책 코스의 선택, 속도 및
              강도를 조절합니다. 보호자는 산책코스를 지정할 수 도 있습니다.
            </p>
          </div>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" class="pa-5">
        <v-img
          aspect-ratio="1"
          src="@/assets/images/home/dog_running.jpg"
          cover />
      </v-col>
      <v-spacer />
    </v-row>

    <!-- 4 -->
    <v-row>
      <v-spacer />
      <v-col cols="12" md="4" class="pa-5">
        <v-img aspect-ratio="1" src="@/assets/images/home/diary.jpg" cover />
      </v-col>
      <v-col cols="12" md="4" class="pa-5">
        <v-row justify="end">
          <v-img
            max-height="60"
            max-width="55"
            src="@/assets/images/home/rock.png"
            cover />
          <v-img
            max-height="60"
            max-width="55"
            src="@/assets/images/home/rock.png"
            cover />
          <v-img
            max-height="60"
            max-width="55"
            src="@/assets/images/home/rock.png"
            cover />
          <v-img
            max-height="60"
            max-width="55"
            src="@/assets/images/home/rock.png"
            cover />
        </v-row>
        <v-row style="height: 50px"></v-row>
        <v-row>
          <div class="ml-10 mr-5 mt-5 mb-5">
            <h3>산책 일지 작성</h3>
          </div>
        </v-row>
        <v-row>
          <div class="ml-10 mr-5 mt-5 mb-5">
            <p>
              산책이 끝나면 도그워커는 강아지의 상태와 활동을 확인하도록
              꼼꼼하게 설계된 산책 일지를 작성합니다. 보호자는 loveyourdog ‘내
              정보 - 산책일지 보기’에서 확인할 수 있습니다.
            </p>
          </div>
        </v-row>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
  <!-- 광고3 -->
  <!-- <v-container>
    <v-row>
      <h3>믿고 맡길 수 있는 도그워커</h3>
    </v-row>
    <v-row>
      <v-col>
        <div>
          <v-row>
            <font-awesome-icon icon="fa-solid fa-address-card" size="2xl" />
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container> -->
  <v-row v-for="comment in list" :key="comment">
    <DropMain :comment="comment" />
  </v-row>
</template>

<script>
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';

import searchApi from '@/api/searchApi';
import Figure from '@/components/Figure';

import DropMain from '@/components/DropMain';
import reviewApi from '@/api/reviewApi';

export default {
  name: 'App',

  components: {
    Figure,
    DropMain,
  },

  created() {
    // 소켓 연결
    this.connect();

    // 알림창 닫아 놓은 상태로 시작
    if (this.$store.state.login.alarmOpen) {
      // 분명 초기치를 false로 줬는데 true로 시작됨... 일단 여기서 false로 만들어줌;;
      this.$store.commit('setAlarmOpen');
    }

    // 우리동네 인기 도그워커
    if (this.$store.state.login.cusId) {
      searchApi
        .getPopluarAppsByCusId(this.$store.state.login.cusId)
        .then((res) => {
          this.apps = res.data;
          // 이미지
          for (let i = 0; i < this.apps.length; i++) {
            const dirName = this.apps[i].dirName;
            const fileName = this.apps[i].fileName;
            const extension = this.apps[i].extension;
            if (dirName && fileName && extension) {
              const urlfront =
                'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
              const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
              this.apps[i].imgUrl = imgUrl;
            }
          }
          console.log('this.apps : ', this.apps); // 4개 이하
        })
        .catch((e) => {
          console.log(e);
        });
    }

    // temp

    // reviewApi
    //   .getCommentsByReviewId(8)
    //   .then((res) => {
    //     this.list = res.data;
    //     console.log('getCommentsByReviewId', this.list);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  },

  data: () => ({
    userName: '',
    message: '',
    recvList: [],
    // list: [],

    // 인기 도그워커
    apps: [],
  }),
  methods: {
    // 선택 시 상세보기
    selectApp(appId, dwId) {
      this.$store.commit('setAppId', appId);
      this.$router.push({ name: 'detailDw', query: { applicationId: appId } }); // 상세보기
    },
    clickCommit() {
      this.$router.push('commisionForm');
    },
    sendMessage() {
      let userId;
      let userType;
      // stomp 연결되었다면
      if (this.stompClient && this.stompClient.connected) {
        // 서버로 메세지 보내기(userid, userType)
        if (this.$store.state.login.dwId) {
          userId = this.$store.state.login.dwId;
          userType = 'dogwalker';
        } else {
          userId = this.$store.state.login.cusId;
          userType = 'customer';
        }
        const msg = {
          userId: userId,
          userType: userType,
        };
        console.log('Send message:' + msg);
        this.stompClient.send('/api/app/receive', JSON.stringify(msg), {});
      }
      // this.message = ''; 이거뭐지
    },

    // 웹소켓 연결, 성공시 메세지 받기
    connect() {
      const serverURL = 'https://loveyourdog.co.kr:443/api/ws';

      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      // jwt
      let headers = {
        Authorization: `Bearer ${this.$store.state.login.accessToken}`,
      };
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
      this.stompClient.connect(
        headers, //{},
        (frame) => {
          // 소켓 연결 성공
          this.connected = true;
          console.log('소켓 연결 성공.  frame : ', frame);

          // publish to '/app/receive' : userId, userType 보내기
          this.sendMessage();

          // subscribe to '/send' -> 메세지 받음
          this.stompClient.subscribe('/api/send', (res) => {
            // str -> obj(Array)
            this.recvList = JSON.parse(res.body);
            let unreadCnt = 0;
            for (let i = 0; i < this.recvList.length; i++) {
              // 이미지 넣어주기
              const dirName = this.recvList[i].dirName;
              const fileName = this.recvList[i].fileName;
              const extension = this.recvList[i].extension;
              if (dirName && fileName && extension) {
                const urlfront =
                  'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
                const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
                this.recvList[i].imgUrl = imgUrl;
              }
              // 안 읽은 알람갯수 세기
              if (this.recvList[i].checked === 1) {
                unreadCnt++;
              }
            }
            this.$store.commit('setUnreadAlarmCnt', unreadCnt); // 안 읽은 알람갯수 - 앱 바 벨 옆에 표시
            this.$store.commit('setAlarmList', this.recvList); // 전체 알람리스트
          });
        },
        (error) => {
          // 소켓 연결 실패
          this.connected = false;
          console.log('소켓 연결 실패', error);
        }
      );
    },
  },
};
</script>

<style>
.image-bg-home {
  background: url('@/assets/images/home/home.gif');
  background-size: cover;
  height: 100vh;
}
.icon {
  padding-top: 8px;
  margin-right: 12px;
  color: var(--color-primary);
}
</style>
