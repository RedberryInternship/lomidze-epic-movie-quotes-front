import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from 'services';
import { authActions, feedActions } from 'store';
import { z } from 'zod';
import { AddCommentProps } from 'types';
import { useAuthUser } from 'hooks';
import { useTranslation } from 'next-i18next';

export const useAddComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthUser();
  const dispatch = useDispatch();
  const { t } = useTranslation('shared');

  const schema = z.object({
    quote_id: z.coerce.number(),
    user_id: z.coerce.number(),
    comment: z
      .string()
      .max(500, { message: 'Maximum comment length exceeded' }),
  });

  const onSubmit = async (data: AddCommentProps) => {
    if (!data.comment.length) return;
    try { 
      setIsLoading(true);
      dispatch(feedActions.addComment({ ...data, user: authUser }));
      await addComment(data);
    } catch (e: any) {
      e.message === 'Request failed with status code 422'
        ? dispatch(authActions.setFormError(e?.response?.data?.errors))
        : dispatch(
            authActions.setFormError({
              name: 'comment',
              error: 'comment not sent',
            })
          );
    }
    setIsLoading(false);
  };

  return { isLoading, schema, onSubmit, authUser, t };
};
