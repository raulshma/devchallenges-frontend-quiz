import { toRefs, reactive, getTransitionRawChildren } from 'vue';

export default function (url, options) {
  const state = reactive({
    response: [],
    error: null,
    fetching: false,
    cache: null,
  });
  const fetchData = async () => {
    state.fetching = true;
    try {
      const data = await makeRequest(url, options);

      const reduced = data.reduce((a, item, i) => {
        a[i] = {
          name: item.name,
          flag: item.flag,
          capital: item.capital,
          region: item.region,
          subregion: item.subregion,
        };
        return a;
      }, []);

      const questionKeys = new Map();
      const generatedQuestions = [];

      for (let i = 0; i < 10; i++) {
        const [numItem, ans1, ans2, ans3] = getRandomValues(reduced.length, 4);

        const item = reduced[numItem];
        if (!item.capital) {
          i--;
          continue;
        }
        const questionType = Math.round(Math.random());
        const questionText =
          questionType === 0
            ? `${item.capital} is the capital of`
            : `Which country does this flag belong to`;
        if (questionKeys.has(item.name) === false) {
          questionKeys.set(item.name);
          const question = {
            question: questionText,
            country: item.name,
            flag: questionType ? item.flag : null,
            answers: [
              {
                name: item.name,
                correct: true,
              },
              {
                name: reduced[ans1].name,
                correct: false,
              },
              {
                name: reduced[ans2].name,
                correct: false,
              },
              {
                name: reduced[ans3].name,
                correct: false,
              },
            ],
          };
          shuffle(question.answers);
          generatedQuestions.push(question);
        } else {
          i--;
        }
      }

      state.response = generatedQuestions;
    } catch (errors) {
      state.error = errors;
    } finally {
      state.fetching = false;
    }
  };
  return { ...toRefs(state), fetchData };
}

async function makeRequest(url, options) {
  if (localStorage.data) {
    const { countries, time } = JSON.parse(localStorage.data);
    const elapsedMilliseconds = Date.now() - time;
    if (elapsedMilliseconds / 1000 / 60 < 4320) {
      return countries;
    }
  }
  const res = await fetch(url, options);
  const json = await res.json();
  localStorage.data = JSON.stringify({
    countries: json,
    time: Date.now(),
  });
  return json;
}

const getRandomValues = (length, n) => {
  if (length < n) throw 'length cannot be greater than the numbers to generate';

  if (n === 1) return [Math.floor(Math.random() * length)];

  const generatedNumbers = {};

  while (Object.keys(generatedNumbers).length <= n) {
    const randNumber = Math.floor(Math.random() * length);
    if (generatedNumbers[randNumber] == null) {
      generatedNumbers[randNumber] = randNumber;
    }
  }

  return Object.keys(generatedNumbers);
};

function shuffle(t) {
  let last = t.length;
  let n;
  while (last > 0) {
    n = rand(last);
    swap(t, n, --last);
  }
}

const rand = (n) => Math.floor(Math.random() * n);

function swap(t, i, j) {
  let q = t[i];
  t[i] = t[j];
  t[j] = q;
  return t;
}
