export const validateAddPost = (values: { title: string }) => {
  const errors = {
    title: '',
    description: '',
    date: '',
    color: '',
    score: '',
  };

  if (values.title.trim() === '' || values.title.length > 30) {
    errors.title = 'Please enter a title between 1 and 30 characters.';
  }

  return errors;
};
