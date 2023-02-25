import { Button, Dialog, FormWrapper, Input } from 'components';
import { useUsernamePage } from './useUsernamePage';

const PasswordPage = ({ refetch }: { refetch: () => {} }) => {
  const {
    isLoading,
    schema,
    onSubmit,
    t,
    goBack,
    open,
    toggleDialog,
    trigger,
    handleTrigger,
    handleFormError,
  } = useUsernamePage({ refetch });

  return (
    <>
      <FormWrapper schema={schema} onSubmit={onSubmit} fill>
        <div className='flex flex-col'>
          <div className='flex w-full flex-col pb-10 pt-16'>
            <Input
              name='username'
              full
              placeholder={t('username') as string}
              label={t('enterNewUsername') as string}
              className='!min-h-[3rem]'
            />
          </div>
          <div className='relative'>
            <div className='flex items-end absolute w-full top-32'>
              <div onClick={() => goBack()} className='mr-auto py-2 lg:text-xl'>
                {t('cancel')}
              </div>
              <div
                className='ml-3 mt-10'
                onClick={() => {
                  toggleDialog(true);
                  handleTrigger(true);
                }}
              >
                <Button
                  typeButton
                  text={t('add') as string}
                  style='buttonRed'
                  className='lg:text-xl !px-4'
                  disabled={isLoading}
                />
              </div>
              <Dialog
                toggleDialog={toggleDialog}
                handleFormError={handleFormError}
                trigger={trigger}
                handleTrigger={() => handleTrigger(false)}
                open={open}
              />
            </div>
          </div>
        </div>
      </FormWrapper>
    </>
  );
};

export default PasswordPage;
