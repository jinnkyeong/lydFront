import { createWebHistory, createRouter } from "vue-router";
import EmptyRouterView from "@/views/EmptyRouterView"
import Home from "@/views/Home"
import SignUp from "@/views/dialog/login/SignUp"
import SignUpForm from "@/views/dialog/login/SignUpForm"
import SignUpSuccess from "@/views/dialog/login/SignUpSuccess"
import Login from "@/views/dialog/login/Login"
import LoginForm from "@/views/dialog/login/LoginForm"
import FindPwd from "@/views/dialog/login/FindPwd"
import FindPwdSuccess from "@/views/dialog/login/FindPwdSuccess"
import SearchDw from "@/views/search/SearchDw"
import SearchCus from "@/views/search/SearchCus"
import DetailCus from "@/views/search/DetailCus"
import DetailDwMod from "@/views/search/DetailDwMod"
import DetailCusMod from "@/views/search/DetailCusMod"
import CertOpt from "@/views/dialog/search/common/CertOpt" // 공통
import PriceOpt from "@/views/dialog/search/common/PriceOpt"
import DateOpt from "@/views/dialog/search/searchDw/DateOpt" // 도그워커만
import AgeOpt from "@/views/dialog/search/searchDw/AgeOpt"
import GenOpt from "@/views/dialog/search/searchDw/GenOpt"
import WeekdayOpt from "@/views/dialog/search/searchCus/WeekdayOpt" // 고객만
import DogAggrOpt from "@/views/dialog/search/searchCus/DogAggrOpt"
import DogTypeOpt from "@/views/dialog/search/searchCus/DogTypeOpt"
import TimeOpt from "@/views/dialog/search/searchCus/TimeOpt"
import ApplicationForm from "@/views/apply/ApplicationForm"
import ApplySuccess from "@/views/apply/ApplySuccess"
import Application from "@/views/apply/Application"
import CommisionForm from "@/views/commit/CommisionForm"
import CommitSuccess from "@/views/commit/CommitSuccess"
import Lecture from "@/views/lecture/Lecture"
import Test from "@/views/test/Test"
const DetailDw = () => import('@/views/search/DetailDw');
import Inquiry from '@/views/dialog/ask/Inquiry'
import InquirySuccess from '@/views/dialog/ask/InquirySuccess'

const MyInfoDwLayout = () => import('@/layouts/myInfo/MyDwLayout')
const MyInfoCusLayout = () => import('@/layouts/myInfo/MyCusLayout')

import store from '@/store/index'







// 네이게이션 가드(beforeEnter)
// localstorage에 atk가 있으면 enter. 없으면 alert
// const requireAuth = () => (from, to, next) => {
//     const token = localStorage.getItem('login.accessToken')
//     if (token) {
//         return next()
//     } 
//     next('/') 
//     alert("로그인하세요")
//     // store.dispatch('updateAlert', {alert: true, type: 'warning', text: '로그인이 필요합니다'});
// }


const routes = [
    {
        path: '/',
        component: () => import('@/layouts/default/Default.vue'), // 레이아웃
        children: [
            {
                path: '',
                name: 'Home',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
            },
            {
                path: '/qna',
                name: 'qna',
                component: () => import('@/views/qna/Qna'),
            },
            {
                path : '/signUp',
                name : "signUp",
                components: {
                    default: Home,
                    dialog: SignUp
                }
            },
            {
                path : '/signUp',
                name : "signUp",
                components: {
                    default: Home,
                    dialog: SignUp
                }
            },
            {
                path : '/signUpForm',
                name : "signUpForm",
                components: {
                    default: Home,
                    dialog: SignUpForm
                }
            },
            {
                path : '/signUpSuccess',
                name : "signUpSuccess",
                components: {
                    default: Home,
                    dialog: SignUpSuccess
                }
            },
            {
                path : '/loginPage',
                name : "loginPage",
                components: {
                    default: Home,
                    dialog: Login
                }
            },
            {
                path : '/loginForm',
                name : "loginForm",
                components: {
                    default: Home,
                    dialog: LoginForm
                }
            },
            {
                path : '/findPwd',
                name : "findPwd",
                components: {
                    default: Home,
                    dialog: FindPwd
                }
            },
            {
                path : '/findPwdSuccess',
                name : "findPwdSuccess",
                components: {
                    default: Home,
                    dialog: FindPwdSuccess
                }
            },
            {   
                path: '/searchDw',
                component: SearchDw,
                children:[
                    {
                        path : '/certOpt_dw',
                        name : "certOpt_dw",
                        components: {
                            default: SearchDw,
                            dialog: CertOpt
                        }
                    },
                    {
                        path : '/priceOpt_dw',
                        name : "priceOpt_dw",
                        components: {
                            default: SearchDw,
                            dialog: PriceOpt
                        }
                    },
                    {
                        path : '/dateOpt_dw',
                        name : "dateOpt_dw",
                        components: {
                            default: SearchDw,
                            dialog: DateOpt
                        }
                    },
                    {
                        path : '/ageOpt_dw',
                        name : "ageOpt_dw",
                        components: {
                            default: SearchDw,
                            dialog: AgeOpt
                        }
                    },
                    {
                        path : '/genOpt_dw',
                        name : "genOpt_dw",
                        components: {
                            default: SearchDw,
                            dialog: GenOpt
                        }
                    },
                ]
            },
            {   
                path: '/searchCus',
                component: SearchCus,
                children:[
                    {
                        path : '/certOpt_cus',
                        name : "certOpt_cus",
                        components: {
                            default: SearchCus,
                            dialog: CertOpt
                        }
                    },
                    {
                        path : '/priceOpt_cus',
                        name : "priceOpt_cus",
                        components: {
                            default: SearchCus,
                            dialog: PriceOpt
                        }
                    },
                    {
                        path : '/weekdayOpt_cus',
                        name : "weekdayOpt_cus",
                        components: {
                            default: SearchCus,
                            dialog: WeekdayOpt
                        }
                    },
                    {
                        path : '/dogAggrOpt_cus',
                        name : "dogAggrOpt_cus",
                        components: {
                            default: SearchCus,
                            dialog: DogAggrOpt
                        }
                    },
                    {
                        path : '/dogTypeOpt_cus',
                        name : "dogTypeOpt_cus",
                        components: {
                            default: SearchCus,
                            dialog: DogTypeOpt
                        }
                    },
                    {
                        path : '/timeOpt_cus',
                        name : "timeOpt_cus",
                        components: {
                            default: SearchCus,
                            dialog: TimeOpt
                        }
                    },
                ]
            },
            {   
                path: '/detailDw',
                name: 'detailDw',
                component: DetailDw,
                children:[
                    {
                        path : '/comDetail',
                        name : "comDetail",
                        components: {
                            default: DetailDw,
                            dialog: ()=> import('@/views/dialog/ask/ComDetail')
                        }
                    },
                ]
            },
            {   
                path: '/detailCus',
                name: 'detailCus',
                component: DetailCus,
                children:[
                    {
                        path : '/appDetail',
                        name : "appDetail",
                        components: {
                            default: DetailDw,
                            dialog: ()=> import('@/views/dialog/ask/AppDetail')
                        }
                    },
                ]
            },
            {   
                path: '/detailDwMod',
                name: 'detailDwMod',
                component: DetailDwMod
            },
            {   
                path: '/detailCusMod',
                name: 'detailCusMod',
                component: DetailCusMod
            },
            {   
                path: '/application',
                name: 'application',
                component: Application,
            },
            {   
                path: '/applicationForm',
                name: 'applicationForm',
                component: ApplicationForm,
                // beforeEnter: (from, to, next) => {
                //     const token = store.state.accessToken
                //     const dwId = store.state.dwId
                //     if (token && dwId) {
                //         return next()
                //     } 
                //     next('/') 
                //     store.dispatch('updateAlert', {alert: true, type: 'warning', 
                //     text: '도그워커로 로그인 해야만 도그워커로 지원할 수 있습니다'});
                // }
            },
            {   
                path: '/applySuccess',
                name: 'applySuccess',
                component: ApplySuccess,
                // beforeEnter: (from, to, next) => {
                //     const token = store.state.accessToken
                //     const dwId = store.state.dwId
                //     if (token && dwId) {
                //         return next()
                //     } 
                //     next('/') 
                //     store.dispatch('updateAlert', {alert: true, type: 'warning', 
                //     text: '도그워커로 로그인 해야만 도그워커로 지원할 수 있습니다'});
                // }
            },
            {   
                path: '/commisionForm',
                name: 'commisionForm',
                component: CommisionForm,
                // beforeEnter: (from, to, next) => {
                //     const token = store.state.accessToken
                //     const cusId = store.state.cusId
                //     if (token && cusId) {
                //         return next()
                //     } 
                //     next('/') 
                //     store.dispatch('updateAlert', {alert: true, type: 'warning', 
                //     text: '고객으로 로그인 해야만 의뢰서를 작성할 수 있습니다.'});
                // }
            },
            {   
                path: '/commitSuccess',
                name: 'commitSuccess',
                component: CommitSuccess,
                // beforeEnter: (from, to, next) => {
                //     const token = store.state.accessToken
                //     const cusId = store.state.cusId
                //     if (token && cusId) {
                //         return next()
                //     } 
                //     next('/') 
                //     store.dispatch('updateAlert', {alert: true, type: 'warning', 
                //     text: '고객으로 로그인 해야만 의뢰서를 작성할 수 있습니다.'});
                // }
            },
            {   
                path: '/lecture',
                name: 'lecture',
                component: Lecture,
                children:[
                    {
                        path: '/lectureView',
                        name: 'lectureView',
                        components: {
                            default: Lecture,
                            dialog: ()=> import('@/views/dialog/lecture/LectureView')
                        }
                    }
                ]
            },
            {   
                path: '/lectureSuccess',
                name: 'lectureSuccess',
                component: ()=> import('@/views/lecture/LectureSuccess'),
            },
            {   
                path: '/test',
                name: 'test',
                component: Test,
            },
            {   
                path: '/testSuccess',
                name: 'testSuccess',
                component: ()=> import('@/views/test/TestSuccess'),
            },
            {   
                path: '/testFail',
                name: 'testFail',
                component: ()=> import('@/views/test/TestFail'),
            },
            {
                path : '/inquiry', // 문의하기 모달
                name : "inquiry",
                components: {
                    default: DetailDw,
                    dialog: Inquiry
                }
            },
            {
                path : '/inquirySuccess', // 문의 성공 모달
                name : "inquirySuccess",
                components: {
                    default: DetailDw,
                    dialog: InquirySuccess
                }
            },

            {
                path : '/offer', // 제안하기 모달
                name : "offer",
                components: {
                    default: DetailCus,
                    dialog: ()=> import('@/views/dialog/ask/Offer')
                }
            },
            {
                path : '/offerSuccess', // 제안 성공 모달
                name : "offerSuccess",
                components: {
                    default: DetailCus,
                    dialog: ()=> import('@/views/dialog/ask/OfferSuccess')
                }
            },




        ],
    },
    // 마이페이지 - 도그워커
    {
        path: '/dwInfo',
        component: MyInfoDwLayout, // 내 정보 레이아웃
        children:[
            {
                path: '',
                name: 'dwInfo',
                component: () => import('@/views/myInfo/myInfoDw/MyInfoMain'),
                children:[
                    {
                        path:'/dwInfo/changePwd',
                        components:{
                            default: () => import('@/views/myInfo/myInfoDw/MyInfoMain'),
                            dialog: ()=> import('@/views/dialog/myInfo/ChangePwd')
                        }
                    },
                    {
                        path:'/dwInfo/changePhone',
                        components:{
                            default: () => import('@/views/myInfo/myInfoDw/MyInfoMain'),
                            dialog: ()=> import('@/views/dialog/myInfo/ChangePhone')
                        }
                    }
                ]
            },
            {
                path: '/dwInfo/passed',
                name: 'passed',
                component: () => import('@/views/myInfo/myInfoDw/Passed'),
            },
            {
                path: '/dwInfo/dwInfoMod',
                name: 'dwInfoMod',
                component: () => import('@/views/myInfo/myInfoDw/MyInfoMainMod'),
            },
            {
                path: '/dwInfo/dwInfoStudy', // 학습내역
                name: 'dwInfoStudy',
                component: () => import('@/views/myInfo/myInfoDw/MyStudy'),
               
            },
            {
                path: '/dwInfo/dwInfoInquiry', // 도그워커가 받은 문의
                name: 'dwInfoInquiry',
                component: () => import('@/views/myInfo/myInfoDw/MyInquiry'),
                children:[
                    {
                        path: '/dwInfo/dwInfoInquiry/acceptInq', 
                        name: 'acceptInq',
                        components: {
                            default: () => import('@/views/myInfo/myInfoDw/MyInquiry'),
                            dialog: ()=> import('@/views/dialog/answer/AcceptInq')
                        }
                    },
                    {
                        path: '/dwInfo/dwInfoInquiry/acceptChangeInq', 
                        name: 'acceptChangeInq',
                        components: {
                            default: () => import('@/views/myInfo/myInfoDw/MyInquiry'),
                            dialog: ()=> import('@/views/dialog/answer/AcceptChangeInq')
                        }
                    },
                    {
                        path: '/dwInfo/dwInfoInquiry/acceptInqSuccess', 
                        name: 'acceptInqSuccess',
                        components: {
                            default: () => import('@/views/myInfo/myInfoDw/MyInquiry'),
                            dialog: ()=> import('@/views/dialog/answer/AcceptInqSuccess')
                        }
                    },
                    {
                        path: '/dwInfo/dwInfoInquiry/inquiryDetail', // 문의 상세보기
                        name: 'inquiryDetail',
                        components: {
                            default: () => import('@/views/myInfo/myInfoDw/MyInquiry'),
                            dialog: ()=> import('@/views/dialog/answer/InquiryDetail')
                        }
                    },
                    {
                        path: '/dwInfo/dwInfoInquiry/rejectInq', 
                        name: 'rejectInq',
                        components: {
                            default: () => import('@/views/myInfo/myInfoDw/MyInquiry'),
                            dialog: ()=> import('@/views/dialog/answer/RejectInq')
                        }
                    },
                    {
                        path: '/dwInfo/dwInfoInquiry/rejectInqSuccess', 
                        name: 'rejectInqSuccess',
                        components: {
                            default: () => import('@/views/myInfo/myInfoDw/MyInquiry'),
                            dialog: ()=> import('@/views/dialog/answer/RejectInqSuccess')
                        }
                    },
                ]
            },
            {
                path: '/dwInfo/dwInfoApply', // 도그워커 지원서
                name: 'dwInfoApply',
                component: () => import('@/views/myInfo/myInfoDw/MyApply'),
            },
            {
                path: '/dwInfo/dwInfoOffer', // 도그워커가 한 제안
                name: 'dwInfoOffer',
                component: () => import('@/views/myInfo/myInfoDw/MyOffer'),
                children:[
                    {
                        path: '/dwInfo/dwInfoOffer/offerDetail', 
                        name: 'dwOfferDetail',
                        components: {
                            default: () => import('@/views/myInfo/myInfoDw/MyOffer'),
                            dialog: ()=> import('@/views/dialog/answer/OfferDetail')
                        }
                    },
                    {
                        path: '/dwInfo/dwInfoOffer/cancelOfrSuccess', 
                        name: 'cancelOfrSuccess',
                        components: {
                            default: () => import('@/views/myInfo/myInfoDw/MyOffer'),
                            dialog: ()=> import('@/views/dialog/answer/OfferCancelSuccess')
                        }
                    },
                ]
            },
            {
                path: '/dwInfo/dwInfoReserv', // 예약 내역
                name: 'dwInfoReserv',
                component: () => import('@/views/myInfo/myInfoDw/MyReserv'),
            },



            {
                path: '/dwInfo/reservDetail',
                name: 'reservDetail',
                component: () => import('@/views/myInfo/myInfoDw/ReservDetail'),
                children:[
                    {
                        path: '/dwInfo/reservDetail/diaryManual',// 산책일지 매뉴얼
                        name: 'diaryManual',
                        components: {
                            default: () => import('@/views/myInfo/myInfoDw/ReservDetail'),
                            dialog: ()=> import('@/views/dialog/myInfo/DiaryManual')
                        }        
                    },
                    {
                        path: '/dwInfo/reservDetail/diaryForm',// 산책일지 폼
                        name: 'diaryForm',
                        components: {
                            default: () => import('@/views/myInfo/myInfoDw/ReservDetail'),
                            dialog: ()=> import('@/views/dialog/myInfo/DiaryForm')
                        }        
                    },
                   
                ]
            },
        ]
    },
    // 마이페이지 - 고객
    {
        path: '/cusInfo',
        component: MyInfoCusLayout, // 내 정보 레이아웃
        children:[
            {
                path: '',
                name: 'cusInfo',
                component: () => import('@/views/myInfo/myInfoCus/MyInfoMain'),
                children:[
                    {
                        path:'/cusInfo/changePwd',
                        components:{
                            default: () => import('@/views/myInfo/myInfoCus/MyInfoMain'),
                            dialog: ()=> import('@/views/dialog/myInfo/ChangePwd')
                        }
                    },
                    {
                        path:'/cusInfo/changePhone',
                        components:{
                            default: () => import('@/views/myInfo/myInfoCus/MyInfoMain'),
                            dialog: ()=> import('@/views/dialog/myInfo/ChangePhone')
                        }
                    }
                ]
            },
            {
                path: '/cusInfo/cusInfoMod',
                name: 'cusInfoMod',
                component: () => import('@/views/myInfo/myInfoCus/MyInfoMainMod'),
            },
            {
                path: '/cusInfo/cusInfoCommit', 
                name: 'cusInfoCommit',
                component: () => import('@/views/myInfo/myInfoCus/MyCommit'),
            },
            {
                path: '/cusInfo/cusInfoInquiry', 
                name: 'cusInfoInquiry',
                component: () => import('@/views/myInfo/myInfoCus/MyInquiry'),
                children:[
                    {
                        path: '/cusInfo/cusInfoInquiry/cusInquiryDetail', 
                        name: 'cusInquiryDetail',
                        components: {
                            default: () => import('@/views/myInfo/myInfoCus/MyInquiry'),
                            dialog: ()=> import('@/views/dialog/answer/CusInquiryDetail')
                        }
                    },
                    {
                        path: '/cusInfo/cusInfoInquiry/cancelInqSuccess', 
                        name: 'cancelOInqSuccess',
                        components: {
                            default: () => import('@/views/myInfo/myInfoCus/MyInquiry'),
                            dialog: ()=> import('@/views/dialog/answer/InquiryCancelSuccess')
                        }
                    },
                ]
            },
            {
                path: '/cusInfo/cusInfoOffer', 
                name: 'cusInfoOffer',
                component: () => import('@/views/myInfo/myInfoCus/MyOffer'),
                children:[
                    {
                        path: '/cusInfo/cusInfoOffer/acceptOfr', 
                        name: 'acceptOfr',
                        components:{
                            default:() => import('@/views/myInfo/myInfoCus/MyOffer'),
                            dialog: ()=> import('@/views/dialog/answer/AcceptOfr')
                        }
                    },
                    {
                        path: '/cusInfo/cusInfoOffer/acceptOfrSuccess', 
                        name: 'acceptOfrSuccess',
                        components: {
                            default: () => import('@/views/myInfo/myInfoCus/MyOffer'),
                            dialog: ()=> import('@/views/dialog/answer/AcceptOfrSuccess')
                        }
                    },
                    {
                        path: '/cusInfo/cusInfoOffer/offerDetail', // 문의 상세보기
                        name: 'cusOfferDetail',
                        components: {
                            default: () => import('@/views/myInfo/myInfoCus/MyOffer'),
                            dialog: ()=> import('@/views/dialog/answer/OfferDetail') // 맞나?
                        }
                    },
                    {
                        path: '/cusInfo/cusInfoOffer/rejectOfr', 
                        name: 'rejectOfr',
                        components: {
                            default: () => import('@/views/myInfo/myInfoCus/MyOffer'),
                            dialog: ()=> import('@/views/dialog/answer/RejectOfr')
                        }
                    },
                    {
                        path: '/cusInfo/cusInfoOffer/rejectOfrSuccess', 
                        name: 'rejectOfrSuccess',
                        components: {
                            default: () => import('@/views/myInfo/myInfoCus/MyOffer'),
                            dialog: ()=> import('@/views/dialog/answer/RejectOfrSuccess')
                        }
                    },
                    

                ]
            },
            {
                path: '/cusInfo/cusInfoReserv', 
                name: 'cusInfoReserv',
                component: () => import('@/views/myInfo/myInfoCus/MyReserv'),
            },
            {
                path: '/cusInfo/reservDetail',
                name: 'cusReservDetail',
                component: () => import('@/views/myInfo/myInfoCus/ReservDetail'),
                children:[
                    {
                        path: '/cusInfo/reservDetail/reviewForm',
                        name: 'reviewForm',
                        components: {
                            default: () => import('@/views/myInfo/myInfoCus/ReservDetail'),
                            dialog: ()=> import('@/views/dialog/review/ReviewForm')
                        }        
                    },
                 
                ]
            },
            {
                path: '/cusInfo/cusInfoDiary', 
                name: 'cusInfoDiary',
                component: () => import('@/views/myInfo/myInfoCus/MyDiary'),
                children:[
                    {
                        path:'/cusInfo/cusInfoDiary/diaryDetail',
                        name: 'diaryDetail',
                        components:{
                            default:() => import('@/views/myInfo/myInfoCus/MyDiary'),
                            dialog: ()=> import('@/views/dialog/myInfo/DiaryDetail')
                        } 
                    }
                ]
            },
            {
                path: '/cusInfo/purchase', 
                name: 'purchase',
                component: () => import('@/views/myInfo/myInfoCus/Purchase'),
            },
            {
                path: '/cusInfo/purchaseSuccess', 
                name: 'purchaseSuccess',
                component: () => import('@/views/myInfo/myInfoCus/PurchaseSuccess'),
            },
          
        ]
    },
    // admin
    {
        path: '/admin',
        component: ()=> import('@/layouts/admin/AdminLayout'), // admin 레이아웃
        children:[
            {
                path: '', 
                name: 'adminHome',
                component: () => import('@/views/admin/AdminHome'),
              
            },
            {
                path: '/admin/dwManage', // 도그워커 관리 
                name: 'dwManage',
                component: () => import('@/views/admin/DwManage'),
                  beforeEnter: (from, to, next) => {
                    const token = store.state.login.accessToken
                    const adminId = store.state.login.adminId
                    if (token && adminId) {
                        return next()
                    } 
                    next('/admin') 
                    alert('관리자 권한이 필요한 요청입니다')
                }
            },
            {
                path: '/admin/reservManage', // 예약 관리 
                name: 'reservManage',
                component: () => import('@/views/admin/ReservManage'),
            },
        ]
    },
    // 404 page not found
    // {
    //     path: "/notFound",
    //     name: "notFound",
    //     component: () => import("@/NotFound")
    // },
    // {
    //     path: "/:pathMatch(.*)*",
    //     redirect: "/notFound"
    // }
]





// 라우터 인스턴스 생성 및 export
// main.js에서 import
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router