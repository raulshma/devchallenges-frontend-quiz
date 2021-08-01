var e=Object.defineProperty,t=Object.defineProperties,s=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,c=(t,s,n)=>s in t?e(t,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[s]=n,o=(e,t)=>{for(var s in t||(t={}))a.call(t,s)&&c(e,s,t[s]);if(n)for(var s of n(t))r.call(t,s)&&c(e,s,t[s]);return e},l=(e,n)=>t(e,s(n));import{p as i,a as d,o as u,c as f,w as h,b as g,r as m,t as b,d as p,e as w,f as x,g as v,T as y,h as I,i as k,F as Q,j as A,k as q,l as O}from"./vendor.9804ba0b.js";const j={},_=h("data-v-c20228e4");i("data-v-c20228e4");const C={class:"outer-menu"},D=g('<input class="checkbox-toggle" type="checkbox" data-v-c20228e4><div class="hamburger" data-v-c20228e4><div data-v-c20228e4></div></div><div class="menu" data-v-c20228e4><div data-v-c20228e4><div class="d-flex flex-column justify-content-center gap-3" data-v-c20228e4><a href="https://raulshma.xyz" target="__blank" rel="noopener" class="fs-2" data-v-c20228e4>created by raulshma</a><a href="https://github.com/raulshma/devchallenges-frontend-quiz" target="__blank" rel="noopener" data-v-c20228e4><i class="bi bi-github fs-1" data-v-c20228e4></i></a><a href="https://devchallenges.io/portfolio/raulshma" target="__blank" rel="noopener" class="fs-6" data-v-c20228e4> devChallenges.io </a></div></div></div>',3);d();const R=_(((e,t,s,n,a,r)=>(u(),f("div",C,[D]))));function M(e,t){const s=m({response:[],error:null,fetching:!1,cache:null});return l(o({},b(s)),{fetchData:async()=>{s.fetching=!0;try{const n=(await async function(e,t){if(localStorage.data){const{countries:e,time:t}=JSON.parse(localStorage.data);if((Date.now()-t)/1e3/60<4320)return e}const s=await fetch(e,t),n=await s.json();return localStorage.data=JSON.stringify({countries:n,time:Date.now()}),n}(e,t)).reduce(((e,t,s)=>(e[s]={name:t.name,flag:t.flag,capital:t.capital,region:t.region,subregion:t.subregion},e)),[]),a=new Map,r=[];for(let e=0;e<10;e++){const[t,s,c,o]=B(n.length,4),l=n[t];if(!l.capital){e--;continue}const i=Math.round(Math.random()),d=0===i?`${l.capital} is the capital of`:"Which country does this flag belong to";if(!1===a.has(l.name)){a.set(l.name);const e={question:d,country:l.name,flag:i?l.flag:null,answers:[{name:l.name,correct:!0},{name:n[s].name,correct:!1},{name:n[c].name,correct:!1},{name:n[o].name,correct:!1}]};S(e.answers),r.push(e)}else e--}s.response=r}catch(n){s.error=n}finally{s.fetching=!1}}})}j.render=R,j.__scopeId="data-v-c20228e4";const B=(e,t)=>{if(e<t)throw"length cannot be greater than the numbers to generate";if(1===t)return[Math.floor(Math.random()*e)];const s={};for(;Object.keys(s).length<=t;){const t=Math.floor(Math.random()*e);null==s[t]&&(s[t]=t)}return Object.keys(s)};function S(e){let t,s=e.length;for(;s>0;)t=z(s),P(e,t,--s)}const z=e=>Math.floor(Math.random()*e);function P(e,t,s){let n=e[t];return e[t]=e[s],e[s]=n,e}const N={setup(){const e=m({currentQuestionIndex:0,correctAnswerIndex:-1,selectedAnswerIndex:-1,buttonsDisabled:!1,showResult:!1,completed:0,score:0}),{submitted:t,list:s,val:n,error:a,fetching:r}=function(){let e=m({list:[],error:null,fetching:!1});const t=p("");return l(o({submitted:async()=>{const{response:t,error:s,fetchData:n,fetching:a}=M("https://restcountries.eu/rest/v2/all",{});n(),e.list=t,e.error=s,e.fetching=a}},b(e)),{val:t})}();return w((()=>{t()})),{totalQuestions:10,optionsChars:{0:"A",1:"B",2:"C",3:"D"},state:e,answerCheck:function(t,n,a){console.log(t),e.selectedAnswerIndex=a,e.buttonsDisabled=!0,n.correct?e.score=e.score+1:(e.completed=-1,e.showResultButton=!0);const r=s.value[e.currentQuestionIndex].answers.findIndex((e=>!0===e.correct));e.correctAnswerIndex=r,9===e.currentQuestionIndex&&(e.showResultButton=!0)},nextQuestion:function(){9===e.currentQuestionIndex?(e.completed=1,e.showResultButton=!0):(e.currentQuestionIndex=e.currentQuestionIndex+1,e.correctAnswerIndex=-1,e.selectedAnswerIndex=-1,e.buttonsDisabled=!1)},showResult:function(){e.completed=1,e.showResultButton=!1},reset:function(){t(),e.currentQuestionIndex=0,e.correctAnswerIndex=-1,e.selectedAnswerIndex=-1,e.completed=0,e.buttonsDisabled=!1,e.score=0,e.showResult=!1},questions:s,val:n,error:a,fetching:r}}},$={class:"d-flex flex-column h-100"},T={class:"flex-grow-1 d-grid"},J={class:"center-page my-card m-auto m-2"},U=x("h1",{class:"dc-heading"},"COUNTRY QUIZ",-1),Y={class:"card card-width"},E={class:"card-body p-0"},F={key:0,src:"/devchallenges-frontend-quiz/assets/undraw_adventure_4hum1.492ada81.svg",class:"img-fluid position-absolute dc-banner-image"},L={key:1,src:"/devchallenges-frontend-quiz/assets/undraw_winners_ao2o2.04e61641.svg",class:"img-fluid dc-banner-image-result"},W={key:2},Z=x("div",{class:"d-flex justify-content-center"},[x("div",{class:"spinner-border",role:"status"},[x("span",{class:"visually-hidden"},"Loading...")])],-1),G={key:3,class:"d-flex flex-column dc-p-left"},H={key:0},K={class:"d-grid dc-answers"},V={class:"dc-answer-text-span1"},X={class:"dc-answer-text-span2"},ee={key:0,class:"flex-grow-1 d-flex flex-row-reverse"},te={class:"ms-auto"},se={key:4,class:"d-flex flex-column"},ne={class:"m-auto"},ae=x("h1",{class:"dc-result-text text-center"},"Results",-1),re={class:"dc-score-text"},ce=q(" You got "),oe=q(" correct answers "),le={class:"text-center"};N.render=function(e,t,s,n,a,r){return u(),f("div",$,[x("div",T,[x("div",J,[U,x("div",Y,[x("div",E,[1!==n.state.completed?(u(),f("img",F)):v("",!0),1===n.state.completed?(u(),f("img",L)):v("",!0),n.fetching?(u(),f("div",W,[Z])):v("",!0),!n.fetching&&n.questions.length>0&&(0===n.state.completed||-1===n.state.completed)?(u(),f("div",G,[x(y,{name:"fade"},{default:I((()=>[null!=n.questions[n.state.currentQuestionIndex].flag?(u(),f("div",H,[x("img",{src:n.questions[n.state.currentQuestionIndex].flag,class:"img-fluid zoom-in shadow-sm dc-flag-img",alt:"Question flag image here"},null,8,["src"])])):v("",!0)])),_:1}),x("h2",{class:"dc-question "+(null===n.questions[n.state.currentQuestionIndex].flag?"dc-question-mt":"")},k(n.questions[n.state.currentQuestionIndex].question),3),x("div",K,[(u(!0),f(Q,null,A(n.questions[n.state.currentQuestionIndex].answers,((e,t)=>(u(),f("button",{key:t,onClick:s=>n.answerCheck(s,e,t),disabled:n.state.buttonsDisabled,class:`btn ${n.state.correctAnswerIndex===t?"btn-success":n.state.selectedAnswerIndex===t?"btn-danger":"btn-outline-primary"} d-inline-flex shadow-sm hover-orange p-0 dc-answer-btn ${3===t&&!1===n.state.buttonsDisabled?"dc-answers-b-m":""}`},[x("p",V,k(n.optionsChars[t]),1),x("p",X,k(e.name),1),-1!==n.state.selectedAnswerIndex?(u(),f("span",ee,[x("i",{class:`bi ${n.state.correctAnswerIndex===t?"bi-check-circle":n.state.selectedAnswerIndex===t?"bi-x-circle":""} dc-btn-icon`},null,2)])):v("",!0)],10,["onClick","disabled"])))),128))]),x("div",te,[-1!==n.state.selectedAnswerIndex&&-1!==n.state.completed&&9!==n.state.currentQuestionIndex?(u(),f("button",{key:0,class:"btn btn-warning text-white dc-btn-next",onClick:t[1]||(t[1]=e=>n.nextQuestion())}," Next ")):v("",!0),n.state.showResultButton?(u(),f("button",{key:1,class:"btn btn-warning text-white dc-btn-next",onClick:t[2]||(t[2]=e=>n.showResult())}," Result ")):v("",!0)])])):v("",!0),1===n.state.completed?(u(),f("div",se,[x("div",ne,[ae,x("p",re,[ce,x("span",{class:"dc-score-num "+(n.state.score>0?"text-success":"text-danger")},k(n.state.score),3),oe]),x("div",le,[x("button",{class:"shadow-sm btn-lg dc-btn-again",onClick:t[3]||(t[3]=e=>n.reset())}," Try Again ")])])])):v("",!0)])])])])])};O({setup:e=>(e,t)=>(u(),f(Q,null,[x(j),x(N)],64))}).mount("#app");
