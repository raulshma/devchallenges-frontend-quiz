<template>
  <div class="center-page h-100 d-flex overflow-hidden">
    <div class="my-card m-auto">
      <h1 class="display-6 fw-bold text-white mb-3">COUNTRY QUIZ</h1>
      <div class="card border-radius-lg">
        <div class="card-body">
          <img
            src="../assets/untitled.svg"
            class="img-fluid position-absolute banner-image"
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
            class="d-flex flex-column gap-3"
          >
            <transition name="fade">
              <div v-if="questions[state.currentQuestionIndex].flag != null">
                <img
                  :src="questions[state.currentQuestionIndex].flag"
                  class="img-fluid zoom-in shadow"
                  style="height: 75px"
                  alt="Question flag image here"
                />
              </div>
            </transition>
            <h2 class="h4 text-primary fw-bolder">
              {{ questions[state.currentQuestionIndex].question }}
            </h2>
            <div class="d-grid gap-4">
              <template
                v-for="(option, i) in questions[state.currentQuestionIndex]
                  .answers"
                :key="i"
              >
                <button
                  @click="answerCheck(option, i)"
                  :disabled="state.buttonsDisabled"
                  :class="`btn ${
                    state.correctAnswerIndex === i
                      ? 'btn-success'
                      : state.selectedAnswerIndex === i
                      ? 'btn-danger'
                      : 'btn-outline-primary'
                  } d-inline-flex gap-4 fw-bold shadow-sm hover-orange border-radius-md p-3`"
                >
                  <p class="my-auto ms-2">{{ optionsChars[i] }}</p>
                  <p class="my-auto">{{ option.name }}</p>
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
                      }`"
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
                class="btn btn-warning fw-bold border-radius-md"
                @click="nextQuestion()"
              >
                Next
              </button>
              <button
                v-if="state.completed === -1"
                class="btn btn-warning fw-bold border-radius-md"
                @click="showResult()"
              >
                Result
              </button>
            </div>
          </div>
          <div
            v-if="state.completed === 1"
            style="height: 250px"
            class="d-flex flex-column"
          >
            <div class="m-auto">
              <h1 class="display-3 fw-bolder text-center">Results</h1>
              <p class="fw-normal text-secondary text-center">
                You got
                <span
                  :class="`fw-bolder fs-3 px-1 ${
                    state.score > 0 ? 'text-success' : 'text-danger'
                  }`"
                  >{{ state.score }}</span
                >
                correct answers
              </p>
              <div class="text-center mt-5">
                <button
                  class="
                    shadow-sm
                    btn-lg btn-outline-primary
                    fw-bold
                    fs-6
                    border-radius-md
                  "
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
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import useFetchCountries from '../hooks/use-fetch-countries';
export default {
  setup() {
    const totalQuestions = 10;
    const optionsChars = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };
    // GameState vars
    const score = ref(0);
    const currentQuestionIndex = ref(0);
    const correctAnswerIndex = ref(-1);
    const selectedAnswerIndex = ref(-1);
    const completed = ref(0);
    const buttonsDisabled = ref(false);

    const state = reactive({
      currentQuestionIndex,
      correctAnswerIndex,
      selectedAnswerIndex,
      buttonsDisabled,
      completed,
      score,
    });

    const {
      submitted,
      list: questions,
      val,
      error,
      fetching,
    } = useFetchCountries();

    function answerCheck(option, i) {
      selectedAnswerIndex.value = i;
      buttonsDisabled.value = true;

      if (option.correct) score.value = score.value + 1;
      else completed.value = -1;

      const idx = questions.value[currentQuestionIndex.value].answers.findIndex(
        (e) => e.correct === true
      );

      correctAnswerIndex.value = idx;
    }

    function nextQuestion() {
      currentQuestionIndex.value = currentQuestionIndex.value + 1;
      correctAnswerIndex.value = -1;
      selectedAnswerIndex.value = -1;
      if (currentQuestionIndex.value >= totalQuestions) completed.value = 1;
      buttonsDisabled.value = false;
    }

    function showResult() {
      completed.value = 1;
    }

    function reset() {
      submitted();
      currentQuestionIndex.value = 0;
      correctAnswerIndex.value = -1;
      selectedAnswerIndex.value = -1;
      completed.value = 0;
      buttonsDisabled.value = false;
      score.value = 0;
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
.border-radius-md {
  border-radius: 0.75rem !important;
}
.border-radius-lg {
  border-radius: 1rem !important;
}
.banner-image {
  width: 4rem;
  height: 4rem;
  top: -2rem;
  right: 0rem;
}
.w-40 {
  width: 40%;
}
.hover-orange:hover {
  background: #f9a826 !important;
  border-color: #f9a826 !important;
}
.my-card {
  width: 90vw;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media (min-width: 768px) {
  .my-card {
    width: 40vw;
  }
}
</style>
