import { addEmail } from 'services';
import { useZod } from 'hooks';
import { usePage } from 'components';

export const useAddEmailPage = ({ refetch }: { refetch: () => {} }) => {
  const { emailSchema: schema } = useZod();
  const flashMessage = 'Email added successfully';
  const { toggleDialog, open, goBack, isLoading, onSubmit, t } = usePage({
    refetch,
    schema,
    submitCb: addEmail,
    flashMessage,
  });
  return { toggleDialog, open, goBack, isLoading, onSubmit, t, schema };
};
