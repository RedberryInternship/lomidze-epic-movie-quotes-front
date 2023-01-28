import { FC } from 'react';
import {
  Avatar,
  ChatIcon,
  Comment,
  Divider,
  FormWrapper,
  HeartIcon,
  InputText,
  Textarea,
  Figure,
} from 'components';
import { FeedData, FeedProps } from './types';
import Image from 'next/image';
import { getImage } from 'helpers';
import { useFeed } from './useFeed';

const Feed: FC<FeedProps> = ({ data, nextPage, loading }) => {
  const { authUser, lastFeedElementRef } = useFeed({ nextPage, loading });
  return (
    <div className='grid grid-cols-3 min-h-full gap-10 pb-28'>
      {data?.map((item: FeedData) => (
        <div
          key={item.id}
          className='col-span-2 rounded-xl bg-app-black-dark px-6 pt-6 pb-10'
          ref={lastFeedElementRef}
        >
          <Avatar
            text={item.user.username}
            img={getImage(item.user.avatar)}
            size={52}
            loading={false}
          />
          <p className='text-xl leading-7 font-normal mt-4 mb-7'>
            <span className='mr-2'>&ldquo;{item.quote_title}&rdquo;</span>
            <span className='font-medium text-app-yellow mr-2'>
              {item.movie.movie_title}
            </span>
            <span>{`(${item.movie.year})`}</span>
          </p>
          <div className='relative h-[31rem] rounded-[.625rem] overflow-hidden'>
            <Image
              src={getImage(item.quote_image)}
              alt={item.quote_title}
              fill
              className='min-w-full h-full object-cover'
            />
          </div>
          <div className='flex gap-8 mt-6 mb-5'>
            <Figure count={item.comments.length} className='gap-4'>
              <ChatIcon />
            </Figure>
            <Figure count={item.likes.length}>
              <HeartIcon />
            </Figure>
          </div>
          <Divider />
          <Comment data={item.comments} />
          <div className='flex mt-6'>
            <Avatar
              className='h-[3.25rem] w-[3.25rem]'
              img={getImage(authUser?.avatar)}
              size={52}
              loading={!authUser?.avatar}
            />
            <FormWrapper fill>
              <InputText name='quote_id' type='hidden' value={item.id} />
              <InputText name='user_id' type='hidden' value={item.user_id} />
              <Textarea
                name='comment'
                placeholder='Write a comment'
                className='min-w-full'
                rows={1}
              />
              <button type='submit' className='hidden' />
            </FormWrapper>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
