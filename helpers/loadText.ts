export const loadText = (text: string | undefined, isLoading?: boolean) => {
  return !isLoading || !text?.includes('undefined') ? text : '...';
};
