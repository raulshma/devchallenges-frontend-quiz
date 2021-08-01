<template>
  <div class="d-flex flex-column h-100">
    <div class="flex-grow-1 d-grid">
      <div class="center-page my-card m-auto m-2">
        <h1 class="dc-heading">COUNTRY QUIZ</h1>
        <div class="card card-width">
          <div class="card-body p-0">
            <img
              src="../assets/undraw_adventure_4hum1.svg"
              class="img-fluid position-absolute dc-banner-image"
              v-if="state.completed !== 1"
            />
            <img
              src="../assets/undraw_winners_ao2o2.svg"
              class="img-fluid dc-banner-image-result"
              v-if="state.completed === 1"
            />
            <div v-if="fetching">
              <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
            <div
              v-if="
                !fetching &&
                questions.length > 0 &&
                (state.completed === 0 || state.completed === -1)
              "
              class="d-flex flex-column dc-p-left"
            >
              <transition name="fade">
                <div v-if="questions[state.currentQuestionIndex].flag != null">
                  <img
                    :src="questions[state.currentQuestionIndex].flag"
                    class="img-fluid zoom-in shadow-sm dc-flag-img"
                    alt="Question flag image here"
                  />
                </div>
              </transition>
              <h2
                :class="`dc-question ${
                  questions[state.currentQuestionIndex].flag === null
                    ? 'dc-question-mt'
                    : ''
                }`"
              >
                {{ questions[state.currentQuestionIndex].question }}
              </h2>
              <div class="d-grid dc-answers">
                <template
                  v-for="(option, i) in questions[state.currentQuestionIndex]
                    .answers"
                  :key="i"
                >
                  <button
                    @click="(e) => answerCheck(e, option, i)"
                    :disabled="state.buttonsDisabled"
                    :class="`btn ${
                      state.correctAnswerIndex === i
                        ? 'btn-success'
                        : state.selectedAnswerIndex === i
                        ? 'btn-danger'
                        : 'btn-outline-primary'
                    } d-inline-flex shadow-sm hover-orange p-0 dc-answer-btn ${
                      i === 3 && state.buttonsDisabled === false
                        ? 'dc-answers-b-m'
                        : ''
                    }`"
                  >
                    <p class="dc-answer-text-span1">{{ optionsChars[i] }}</p>
                    <p class="dc-answer-text-span2">
                      {{ option.name }}
                    </p>
                    <span
                      v-if="state.selectedAnswerIndex !== -1"
                      class="flex-grow-1 d-flex flex-row-reverse"
                      ><i
                        :class="`bi ${
                          state.correctAnswerIndex === i
                            ? 'bi-check-circle'
                            : state.selectedAnswerIndex === i
                            ? 'bi-x-circle'
                            : ''
                        } dc-btn-icon`"
                      ></i
                    ></span>
                  </button>
                </template>
              </div>
              <div class="ms-auto">
                <button
                  v-if="
                    state.selectedAnswerIndex !== -1 &&
                    state.completed !== -1 &&
                    state.currentQuestionIndex !== 9
                  "
                  class="btn btn-warning text-white dc-btn-next"
                  @click="nextQuestion()"
                >
                  Next
                </button>
                <button
                  v-if="state.showResultButton"
                  class="btn btn-warning text-white dc-btn-next"
                  @click="showResult()"
                >
                  Result
                </button>
              </div>
            </div>
            <div v-if="state.completed === 1" class="d-flex flex-column">
              <div class="m-auto">
                <h1 class="dc-result-text text-center">Results</h1>
                <p class="dc-score-text">
                  You got
                  <span
                    :class="`dc-score-num ${
                      state.score > 0 ? 'text-success' : 'text-danger'
                    }`"
                    >{{ state.score }}</span
                  >
                  correct answers
                </p>
                <div class="text-center">
                  <button
                    class="shadow-sm btn-lg dc-btn-again"
                    @click="reset()"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import useFetchCountries from '../hooks/use-fetch-countries';
export default {
  setup() {
    const totalQuestions = 10;
    const optionsChars = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };
    // GameState
    const state = reactive({
      currentQuestionIndex: 0,
      correctAnswerIndex: -1,
      selectedAnswerIndex: -1,
      buttonsDisabled: false,
      showResult: false,
      completed: 0,
      score: 0,
    });

    const {
      submitted,
      list: questions,
      val,
      error,
      fetching,
    } = useFetchCountries();

    function answerCheck(event, option, i) {
      console.log(event)
      state.selectedAnswerIndex = i;
      state.buttonsDisabled = true;

      if (option.correct) state.score = state.score + 1;
      else {
        state.completed = -1;
        state.showResultButton = true;
      }

      const idx = questions.value[state.currentQuestionIndex].answers.findIndex(
        (e) => e.correct === true
      );

      state.correctAnswerIndex = idx;
      if (state.currentQuestionIndex === totalQuestions - 1) {
        state.showResultButton = true;
      }
    }

    function nextQuestion() {
      if (state.currentQuestionIndex === totalQuestions - 1) {
        state.completed = 1;
        state.showResultButton = true;
      } else {
        state.currentQuestionIndex = state.currentQuestionIndex + 1;
        state.correctAnswerIndex = -1;
        state.selectedAnswerIndex = -1;
        state.buttonsDisabled = false;
      }
    }

    function showResult() {
      state.completed = 1;
      state.showResultButton = false;
    }

    function reset() {
      submitted();
      state.currentQuestionIndex = 0;
      state.correctAnswerIndex = -1;
      state.selectedAnswerIndex = -1;
      state.completed = 0;
      state.buttonsDisabled = false;
      state.score = 0;
      state.showResult = false;
    }

    onMounted(() => {
      submitted();
    });

    return {
      totalQuestions,
      optionsChars,
      state,
      answerCheck,
      nextQuestion,
      showResult,
      reset,
      questions,
      val,
      error,
      fetching,
    };
  },
};
</script>

<style>
.dc-heading {
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 54px;
  color: #f2f2f2;
  text-transform: uppercase;
}
.dc-banner-image {
  width: 162px;
  height: 116px;
  top: calc(-5rem + 6px);
  right: 0rem;
}
.dc-banner-image-result {
  margin: 49px 113px 72px 113px;
}
.dc-flag-img {
  height: 60px !important;
  margin-top: 4px;
  margin-bottom: 4px;
  border-radius: 12px;
}
.dc-question-mt {
  margin-top: 4.857rem !important;
}
.dc-question {
  line-height: 36px;
  font-size: 24px;
  font-weight: 700;
  color: #2f527b;
  margin-bottom: 32px;
}
.dc-answers {
  gap: 25px;
}
.dc-answer-btn {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  color: #ffffff;
  border-radius: 12px !important;
  outline: 0 !important;
}
.dc-answer-text-span1 {
  padding: 0;
  margin: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 19px;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
}
.dc-answer-text-span2 {
  padding: 0;
  margin: 0;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-left: 46px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  text-align: left;
  word-break: break-all;
}
.dc-btn-icon {
  margin: 19px 17px 18px auto;
  width: 20px;
  height: 20px;
}
.dc-answers-b-m {
  margin-bottom: 68px;
}
.dc-p-left {
  margin-left: 2.286rem;
  margin-right: 2.286rem;
}
.dc-btn-next {
  margin-top: 24px;
  margin-bottom: 32px;
  padding: 15px 36px 14px 37px !important;
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 18px !important;
  line-height: 27px !important;
  background: #f9a826 !important;
  box-shadow: 0px 2px 4px rgba(252, 168, 47, 0.4) !important;
  border-radius: 12px !important;
}
.dc-result-text {
  margin-bottom: 0;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 72px;
  color: #1d355d;
}
.dc-score-text {
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 27px;
  color: #1d355d;
  margin-bottom: 0;
}
.dc-score-num {
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 54px;
  color: #1d355d;
  margin-bottom: 0;
}
.dc-btn-again {
  margin-top: 71px;
  margin-bottom: 33px;
  padding: 18px 61px 17px 61px !important;
  font-style: normal !important;
  font-weight: 600 !important;
  font-size: 18px !important;
  line-height: 27px !important;
  color: #1d355d !important;
  background: #ffff;
  border: 2px solid #1d355d !important;
  box-sizing: border-box !important;
  border-radius: 12px !important;
  transition: all 0.3s ease;
}
.dc-btn-again:hover,
.dc-btn-again:focus {
  color: #fff !important;
  background: #f9a826 !important;
  border: 2px solid #f9a826 !important;
}
.center-page {
  place-items: center;
}
.w-40 {
  width: 40%;
}
.hover-orange:hover {
  background: #f9a826 !important;
  border-color: #f9a826 !important;
}
/* .my-card {
  width: 90vw;
} */
.card-width {
  width: 320px;
  border-radius: 25px !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media (min-width: 768px) {
  /* .my-card {
    width: 40vw;
  } */
  .card-width {
    width: 464px;
    /* height: 515px; */
    /* max-height: 559px; */
  }
}
</style>
