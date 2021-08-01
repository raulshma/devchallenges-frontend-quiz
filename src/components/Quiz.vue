<template>
  <div class="center-page h-100 d-flex overflow-hidden font-monospace">
    <div class="my-card m-auto">
      <h1 class="display-6 text-white">Country Quiz</h1>
      <div class="card rounded-3">
        <div class="card-body">
          <div v-if="fetching">
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
          <div
            v-if="!fetching && questions.length > 0"
            class="d-flex flex-column gap-3"
          >
            <!-- <span>Question No. {{ currentQuestion + 1 }}</span> -->
            <div v-if="questions[currentQuestion].flag != null" class="w-25">
              <img
                :src="questions[currentQuestion].flag"
                class="img-fluid"
                alt="Question flag image here"
              />
            </div>
            <h2 class="h4 text-primary fw-bolder">
              {{ questions[currentQuestion].question }}
            </h2>
            <div class="d-grid gap-2">
              <template
                v-for="(option, i) in questions[currentQuestion].answers"
                :key="i"
              >
                <button
                  @click="answerCheck(option, i)"
                  :disabled="buttonsDisabled"
                  :class="`btn ${
                    correctAnswerIndex === i
                      ? 'btn-success'
                      : selectedAnswerIndex === i
                      ? 'btn-danger'
                      : 'btn-outline-primary'
                  } d-inline-flex gap-4`"
                >
                  <p class="my-auto">{{ optionsChars[i] }}</p>
                  <p class="my-auto">{{ option.name }}</p>
                </button>
              </template>
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
    // GameState vars
    const gameState = ref(0);
    const totalQuestions = ref(10);
    const currentQuestion = ref(0);
    const correctAnswerIndex = ref(-1);
    const selectedAnswerIndex = ref(-1);
    const buttonsDisabled = ref(false);
    const optionsChars = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };

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
      console.log(option);
      const idx = questions.value[currentQuestion.value].answers.findIndex(
        (e) => e.correct === true
      );
      correctAnswerIndex.value = idx;
    }

    onMounted(() => {
      submitted();
    });

    return {
      totalQuestions,
      currentQuestion,
      gameState,
      optionsChars,
      correctAnswerIndex,
      selectedAnswerIndex,
      buttonsDisabled,
      submitted,
      answerCheck,
      questions,
      val,
      error,
      fetching,
    };
  },
};
</script>

<style>
.my-card {
  width: 75vw;
}
@media (min-width: 768px) {
  .my-card {
    width: 40vw;
  }
}
</style>
