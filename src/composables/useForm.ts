import { reactive } from "vue";

export const useForm = <T extends Record<string, string>>(
  params: T,
  funcs: Partial<Record<keyof T, (v: string) => string>>,
) => {
  const values = reactive({ ...params }) as T;
  const errors: Partial<Record<keyof T, string>> = reactive({});

  const validate = () => {
    let isValid = true;

    (Object.keys(values) as (keyof T)[]).forEach((key) => {
      const v = values[key];
      const func = funcs[key];

      if (typeof v === "string" && func) {
        const result = func(v);

        if (result !== "") {
          errors[key] = result;
          isValid = false;
        } else if (errors[key]) {
          errors[key] = "";
        }
      }
    });

    return isValid;
  };

  return { values, errors, validate };
};
