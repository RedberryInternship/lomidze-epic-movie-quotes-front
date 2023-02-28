import { useCallback, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { getQuotes } from 'services';
import { feedActions } from 'store';
import { RootState } from 'types';
import { useGetUser } from 'hooks';

export const useAdmin = () => {
  useGetUser();
  const feedData = useSelector((state: RootState) => state.feed.feedData);
  const searchQuery = useSelector((state: RootState) => state.feed.query);

  const dispatch = useDispatch();
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, refetch } =
    useInfiniteQuery({
      queryHash: searchQuery,
      queryKey: ['feed-data'],
      queryFn: ({ pageParam = 1 }) =>
        getQuotes({ page: pageParam, query: searchQuery }),
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage?.data.current_page + 1;
        if (nextPage > lastPage?.data.last_page) return;
        return nextPage;
      },
      retry: 1,
    });

  const pages = data?.pages.length;
  const nextBatch = pages && data?.pages[pages - 1].data.data;
  const fetchNextPageData = useCallback(() => {
    if (hasNextPage && pages) {
      fetchNextPage();
      if (pages > 1) {
        dispatch(feedActions.updateFeed(nextBatch));
      }
    }
  }, [pages, hasNextPage, fetchNextPage, nextBatch, dispatch]);

  const firstBatch = data?.pages[0].data.data;

  useEffect(() => {
    if (!searchQuery) return;
    dispatch(feedActions.resetFeed());
    refetch();
  }, [searchQuery, dispatch, refetch]);

  useEffect(() => {
    if (feedData?.length > 0) return;

    if (pages === 1) {
      dispatch(feedActions.updateFeed(firstBatch));
    }
  }, [pages, dispatch, firstBatch, feedData?.length]);

  return {
    quotes: feedData,
    fetchNextPageData,
    pages,
    loading: isFetchingNextPage,
  };
};
