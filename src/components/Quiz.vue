<template>
  <div class="d-flex flex-column h-100">
    <div class="flex-grow-1 d-grid">
      <div class="center-page my-card m-auto m-2">
        <h1 class="dc-heading">COUNTRY QUIZ</h1>
        <div class="card card-width">
          <div
            class="card-body p-0"
            :style="
              state.completed === 1 ? 'display:flex;flex-flow:column' : ''
            "
          >
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
                    @click="(e) => answerCheck(option, i)"
                    :disabled="state.buttonsDisabled"
                    :class="`btn ${
                      state.correctAnswerIndex === i
                        ? 'btn-success'
                        : state.selectedAnswerIndex === i
                        ? 'btn-danger dc-btn-hover-danger'
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

    function answerCheck(option, i) {
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
  font-size: 2.5714rem;
  line-height: 3.8571rem;
  color: #f2f2f2;
  text-transform: uppercase;
}
.dc-banner-image {
  width: 11.5714rem;
  height: 8.2857rem;
  top: calc(-5rem + 6px);
  right: 0rem;
}
.dc-banner-image-result {
  margin: 3.5rem auto 5.1429rem auto;
}
.dc-flag-img {
  height: 4.2857rem !important;
  margin-top: 0.2857rem;
  margin-bottom: 0.2857rem;
  border-radius: 0.8571rem;
}
.dc-question-mt {
  margin-top: 4.857rem !important;
}
.dc-question {
  line-height: 2.5714rem;
  font-size: 1.7143rem;
  font-weight: 700;
  color: #2f527b;
  margin-bottom: 2.2857rem;
}
.dc-answers {
  gap: 1.7857rem;
}
.dc-btn-hover-danger:hover {
  background: #dc3545 !important;
}
.dc-answer-btn {
  font-style: normal;
  font-weight: 500;
  font-size: 1.2857rem;
  line-height: 1.9286rem;
  color: #ffffff;
  border-radius: 0.8571rem !important;
  outline: 0 !important;
}
.dc-answer-text-span1 {
  padding: 0;
  margin: 0;
  padding-top: 0.7143rem;
  padding-bottom: 0.7143rem;
  margin-left: 1.3571rem;
  font-style: normal;
  font-weight: 500;
  font-size: 1.7143rem;
  line-height: 2.5714rem;
}
.dc-answer-text-span2 {
  padding: 0;
  margin: 0;
  padding-top: 1.0714rem;
  padding-bottom: 1.0714rem;
  margin-left: 3.2857rem;
  font-style: normal;
  font-weight: 500;
  font-size: 1.2857rem;
  line-height: 1.9286rem;
  text-align: left;
  word-break: break-all;
}
.dc-btn-icon {
  margin: 1.3571rem 1.2143rem 1.2857rem auto;
  width: 1.4286rem;
  height: 1.4286rem;
}
.dc-answers-b-m {
  margin-bottom: 4.8571rem;
}
.dc-p-left {
  margin-left: 2.286rem;
  margin-right: 2.286rem;
}
.dc-btn-next {
  margin-top: 1.7143rem;
  margin-bottom: 2.2857rem;
  padding: 1.0714rem 2.5714rem 1rem 2.6429rem !important;
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 1.2857rem !important;
  line-height: 1.9286rem !important;
  background: #f9a826 !important;
  box-shadow: 0rem 0.1429rem 0.2857rem rgba(252, 168, 47, 0.4) !important;
  border-radius: 0.8571rem !important;
}
.dc-result-text {
  margin-bottom: 0;
  font-style: normal;
  font-weight: bold;
  font-size: 3.4286rem;
  line-height: 5.1429rem;
  color: #1d355d;
}
.dc-score-text {
  font-style: normal;
  font-weight: normal;
  font-size: 1.2857rem;
  line-height: 1.9286rem;
  color: #1d355d;
  margin-bottom: 0;
}
.dc-score-num {
  font-style: normal;
  font-weight: bold;
  font-size: 2.5714rem;
  line-height: 3.8571rem;
  color: #1d355d;
  margin-bottom: 0;
}
.dc-btn-again {
  margin-top: 5.0714rem;
  margin-bottom: 2.3571rem;
  padding: 1.2857rem 4.3571rem 1.2143rem 4.3571rem !important;
  font-style: normal !important;
  font-weight: 600 !important;
  font-size: 1.2857rem !important;
  line-height: 1.9286rem !important;
  color: #1d355d !important;
  background: #ffff;
  border: 0.1429rem solid #1d355d !important;
  box-sizing: border-box !important;
  border-radius: 0.8571rem !important;
  transition: all 0.3s ease;
}
.dc-btn-again:hover,
.dc-btn-again:focus {
  color: #fff !important;
  background: #f9a826 !important;
  border: 0.1429rem solid #f9a826 !important;
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
  width: 22.8571rem;
  border-radius: 1.7857rem !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media (max-width: 480px) {
  .card-width {
    width: 26.1429rem;
  }
}
@media (min-width: 768px) {
  .card-width {
    width: 33.1429rem;
  }
}
</style>
