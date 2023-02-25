import {
  Button,
  Divider,
  FormWrapper,
  InputText,
  Modal,
  ModalLoadingOverlay,
} from 'components';
import Link from 'next/link';
import { useAddEmail } from './useAddEmail';

const AddEmail = ({ refetch }: { refetch: () => {} }) => {
  const { isLoading, schema, onSubmit, t } = useAddEmail({ refetch });

  return (
    <>
      <div className='bg-app-black fixed inset-0 -z-10 opacity-20' />

      <Modal
        z
        containerStyle='!items-start lg:mt-80 !lg:max-w-[60rem] !h-auto'
        className='lg:min-w-[38.5rem] mt !bg-black !px-0 !py-10 !z-50'
      >
        <FormWrapper schema={schema} onSubmit={onSubmit} fill>
          {isLoading && <ModalLoadingOverlay admin />}
          <div className='px-8 mb-6'>
            <h3 className='lg:text-2xl text-xl text-left'>
              {t('addNewEmail')}
            </h3>
          </div>
          <Divider />

          <div className='flex flex-col px-8 mt-14'>
            <div className='flex w-full flex-col gap-6'>
              <InputText
                name='email'
                placeholder={t('enterNewEmail') as string}
                label={t('newEmail') as string}
              />
            </div>
            <div className='flex justify-end items-end'>
              <Link href='' className='ml-auto p-2 px-5 lg:text-xl'>
                {t('cancel')}
              </Link>
              <Button
                text={t('add') as string}
                style='buttonRed'
                className='ml-3 mt-10 lg:!text-xl !px-4'
                disabled={isLoading}
              />
            </div>
          </div>
        </FormWrapper>
      </Modal>
    </>
  );
};

export default AddEmail;
