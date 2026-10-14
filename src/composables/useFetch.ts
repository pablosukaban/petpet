import { ref, toValue, watchEffect, type MaybeRefOrGetter, type Ref } from "vue";

export const useFetch = <T>(
  url: MaybeRefOrGetter<string>,
): { data: Ref<T | null>; error: Ref<Error | null> } => {
  const data = ref<T | null>(null) as Ref<T | null>;
  const error = ref(null);

  watchEffect(() => {
    data.value = null;
    error.value = null;

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err));
  });

  return { data, error };
};
