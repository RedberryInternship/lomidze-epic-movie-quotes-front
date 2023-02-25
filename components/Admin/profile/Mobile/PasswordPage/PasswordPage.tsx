import { Button, Dialog, FormWrapper, Password } from 'components';
import { usePasswordPage } from './usePasswordPage';

const PasswordPage = ({ refetch }: { refetch: () => {} }) => {
  const {
    isLoading,
    schema,
    onSubmit,
    t,
    goBack,
    open,
    toggleDialog,
    handleFormError,
    trigger,
    handleTrigger,
  } = usePasswordPage({ refetch });

  return (
    <>
      <FormWrapper schema={schema} onSubmit={onSubmit} fill>
        <div className='flex flex-col'>
          <div className='flex w-full flex-col '>
            <Password />
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
                  className='lg:!text-xl !px-4'
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
