import { Img } from 'components';
import { useProfileImageUpload } from './useProfileImageUpload';

const ProfileImageUpload = ({ name = '', className = '', path = '' }) => {
  const {
    register,
    readImage,
    errors,
    getRootProps,
    getInputProps,
    isMobile,
    image,
    t,
  } = useProfileImageUpload({ name });

  return (
    <div className={`group ${className}`}>
      <div
        {...getRootProps()}
        className='flex flex-col items-center justify-center gap-2 cursor-pointer'
      >
        <Img
          path={path}
          className='w-full max-w-[11.75rem] aspect-square rounded-full'
          image={image}
          priority
        />
        <div className='bg-app-gradient-dark opacity-80 inset-0 -z-10 rounded-ten text-xl' />
        <p className='group-hover:underline'>{t('changePhoto')}</p>
        <input
          id={name}
          type='file'
          className='hidden'
          {...register(name, {
            onChange: (e) => {
              readImage(e.target.files[0]);
            },
          })}
          {...getInputProps()}
        />
      </div>

      {errors?.[name] ? (
        <div className='mt-1 px-2'>
          <span className='text-app-red text-sm leading-6'>
            {errors?.[name] && <p>{errors[name]!.message as string}</p>}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileImageUpload;
