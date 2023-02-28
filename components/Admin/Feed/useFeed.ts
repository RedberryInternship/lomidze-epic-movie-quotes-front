import { useClickOutSide } from 'hooks';
import { useTranslation } from 'next-i18next';
import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UseFeedProps } from './types';

export const useFeed = ({ nextPage, loading = false }: UseFeedProps) => {
  const observer = useRef<IntersectionObserver | null>();
  const { t } = useTranslation('shared');

  const lastFeedElementRef = useCallback(
    (node: Element) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) nextPage();
      });

      if (node) observer!.current!.observe(node);
    },
    [loading, nextPage]
  );

  const [search, setSearch] = useState(false);
  const handleSearch = () => setSearch(true);
  const ref = useClickOutSide({ cb: () => setSearch(false) });

  return {
    lastFeedElementRef,
    search,
    ref,
    handleSearch,
    t,
  };
};
