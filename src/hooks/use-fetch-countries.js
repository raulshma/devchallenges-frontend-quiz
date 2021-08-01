import { ref, toRefs, reactive } from 'vue';
import useFetch from './useFetch';
export default function () {
  let countries = reactive({ list: [], error: null, fetching: false });
  const val = ref('');
  const submitted = async () => {
    const { response, error, fetchData, fetching } = useFetch(
      `https://restcountries.eu/rest/v2/all`,
      {}
    );
    fetchData();
    countries.list = response;
    countries.error = error;
    countries.fetching = fetching;
  };
  return { submitted, ...toRefs(countries), val };
}
