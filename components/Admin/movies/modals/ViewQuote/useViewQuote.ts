import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuote } from 'services';
import { z } from 'zod';
import { Quote } from 'types';
import { useAuthUser, useLang } from 'hooks';
import { authActions } from 'store';

export const useViewQuote = () => {
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('shared');
  const { lang } = useLang();
  const authUser = useAuthUser();
  const router = useRouter();
  const dispatch = useDispatch();

  const schema = z.object({
    quote_title_en: z
      .string()
      .regex(
        new RegExp('^[a-zA-Z0-9.,!@#$%^&*()_+-;\':"|,.<>? ]+$'),
        'Please, use Latin symbols only'
      ),
    quote_title_ka: z
      .string()
      .regex(
        new RegExp('^[ა-ჰ0-9.,!@#$%^&*()_+-;\':"|,.<>? ]+$'),
        'Please, use Georgian symbols only'
      ),
    quote_image: z.any(),
    movie_id: z.number(),
  });

  const handleImage = (img: string) => {
    setImage(img);
  };

  const onSubmit = async (quote: Quote) => {
    try {
      setIsLoading(true);
      await addQuote(quote);
      router.back();
    } catch (e: any) {
      e.message === 'Request failed with status code 422'
        ? dispatch(authActions.setFormError(e?.response?.data?.errors))
        : dispatch(
            authActions.setFormError({
              name: 'quote_title_ka',
              error: 'something wrong',
            })
          );
    }
    setIsLoading(false);
  };

  const user = useAuthUser();
  return {
    isLoading,
    schema,
    onSubmit,
    user,
    handleImage,
    image,
    lang,
    t,
  };
};
