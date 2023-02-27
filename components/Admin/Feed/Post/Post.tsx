import {
  Avatar,
  Comment,
  Divider,
  ChatIcon,
  HeartIcon,
  ModalLoadingOverlay,
  Figure,
} from 'components';
import { getImage, loadText } from 'helpers';
import Image from 'next/image';
import { FC, LegacyRef } from 'react';
import { FeedData, Like } from 'types';
import { AddComment } from '../AddComment';
import { Post } from './types';
import { usePost } from './usePost';

const Post: FC<Post> = ({ post, lastFeedElementRef, modal }) => {
  const { lang, handleLike, authUser } = usePost();
  return (
    <>
      {post?.length &&
        post?.map((item: FeedData, index: number) =>
          item ? (
            <div
              key={item.id}
              className={`col-span-2 rounded-xl bg-app-black-dark ${
                !modal && 'xl:px-6 px-9 pt-6 lg:pb-10 pb-4'
              } mb-8 lg:m-0 ${!modal && '-mx-8'}`}
              ref={lastFeedElementRef as LegacyRef<HTMLDivElement>}
            >
              {!modal && (
                <Avatar
                  text={loadText(item.user.username)}
                  img={getImage(item.user.avatar)}
                  className='lg:h-[3.25rem] lg:w-[3.25rem] w-10 h-10'
                  size={52}
                  loading={false}
                />
              )}
              {modal ? (
                <div className='mb-8 flex flex-col'>
                  <p className='flex py-3 pl-3 mb-4 rounded-ten text-2xl border border-app-dark-gray border-opacity-70'>
                    &ldquo;{item.quote_title?.en}&rdquo;
                    <span className='ml-auto mr-5 text-xl text-app-dark-gray'>
                      Eng
                    </span>
                  </p>
                  <p className='flex py-3 pl-3 rounded-ten text-2xl border border-app-dark-gray border-opacity-70'>
                    &ldquo;{item.quote_title?.ka}&rdquo;
                    <span className='ml-auto mr-5 text-xl text-app-dark-gray'>
                      ქარ
                    </span>
                  </p>
                </div>
              ) : (
                <p className='xl:text-xl xl:leading-7 font-normal mt-4 mb-7'>
                  <span className='mr-2'>
                    &ldquo;{item.quote_title?.[lang]}&rdquo;
                  </span>
                  <span className='font-medium text-app-yellow mr-2'>
                    {item.movie.movie_title?.[lang]}
                  </span>
                  <span>{`(${item.movie.year})`}</span>
                </p>
              )}

              <div className='relative lg:h-[31rem] max-w-full w-full aspect-9/5 rounded-ten overflow-hidden'>
                <Image
                  src={
                    item.quote_image?.length > 200
                      ? item.quote_image
                      : getImage(item.quote_image)
                  }
                  alt={item.quote_title?.[lang] || 'quote_image'}
                  fill
                  sizes='(max-width: 700px) 50vw, 90vw'
                  className='min-w-full h-full object-cover'
                  priority={index < 2 ? true : false}
                />
              </div>
              <div className='flex gap-8 mt-6 mb-5'>
                <Figure count={item.comments.length} className='gap-4'>
                  <ChatIcon className='w-6 lg:w-auto' />
                </Figure>
                <Figure count={item.likes.length}>
                  <div
                    onClick={() =>
                      handleLike({
                        userId: parseInt(authUser.id),
                        quoteId: item.id,
                      })
                    }
                    className='cursor-pointer'
                  >
                    {item.likes.some(
                      (e: Like) => e.user_id == parseInt(authUser?.id)
                    ) ? (
                      <HeartIcon active className='w-6 lg:w-auto' />
                    ) : (
                      <HeartIcon className='w-6 lg:w-auto' />
                    )}
                  </div>
                </Figure>
              </div>
              <Divider />
              <Comment data={item.comments} />
              <div className='flex mt-6'>
                <Avatar
                  className='lg:h-[3.25rem] lg:w-[3.25rem] w-10 h-10'
                  img={
                    authUser?.gmail
                      ? authUser?.avatar
                      : getImage(authUser?.avatar)
                  }
                  size={52}
                  loading={!authUser?.avatar}
                />
                <AddComment quoteId={item.id} />
              </div>
            </div>
          ) : (
            <ModalLoadingOverlay key={index} />
          )
        )}
    </>
  );
};

export default Post;
