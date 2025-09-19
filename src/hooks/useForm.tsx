import { useEffect, useState } from 'react';

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChangeValue = (name: keyof T, text: string) => {
    setValues((prev) => ({ ...prev, [name]: text }));
  };

  const handleBlur = (name: keyof T) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChangeText = (v: string) => handleChangeValue(name, v);
    const onBlur = () => handleBlur(name);

    return {
      value,
      onChangeText,
      onBlur,
    };
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return { values, touched, errors, getTextInputProps };
}

export default useForm;
