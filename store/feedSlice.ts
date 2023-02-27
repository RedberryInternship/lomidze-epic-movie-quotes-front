import { createSlice } from '@reduxjs/toolkit';
import { AddComment, Like, ToggleLike, FeedData } from 'types';

const initialFeedState = {
  feedData: [] as FeedData[],
  query: '',
};

const feedSlice = createSlice({
  name: 'infiniteFeedScroll',
  initialState: initialFeedState,
  reducers: {
    addQuote(state, action: { payload: FeedData }) {
      if (state.feedData?.some((q) => q?.id === action.payload?.id)) return;
      state.feedData.unshift(action.payload);
    },
    updateQuote(state, action: { payload: Partial<FeedData> }) {
      const index = state.feedData.findIndex((e) => e.id === action.payload.id);
      state.feedData[index] = { ...state.feedData[index], ...action.payload };
    },
    resetFeed(state) {
      state.feedData = [];
    },
    deleteQuote(state, action: { payload: number }) {
      const index = state.feedData.findIndex((e) => e.id === action.payload);
      state.feedData.splice(index, 1);
    },
    setQuery(state, action: { payload: string }) {
      state.query = action.payload;
    },
    updateFeed(state, action: { payload: FeedData[] }) {
      let feed = state.feedData;
      if (feed?.some((e: FeedData) => e.id === action.payload[0].id)) return;
      if (feed?.length > 1) {
        state.feedData = [...feed, ...action.payload];
        return;
      }
      state.feedData = action.payload;
    },
    addComment(state, action: { payload: AddComment }) {
      const feed = state.feedData;
      const quoteId = action.payload.quote_id;
      const userId = action.payload.user_id;
      const quoteIndex = feed.findIndex((e) => e.id == quoteId);

      if (quoteIndex < 0) return;
      const newComment = {
        id: new Date().valueOf(),
        quote_id: quoteId,
        user_id: userId,
        comment: action.payload.comment,
        user: action.payload.user,
      };
      state.feedData[quoteIndex].comments.push(newComment);
    },
    toggleLike(state, action: { payload: ToggleLike }) {
      const feed = state.feedData;
      const quoteId = action.payload.quoteId;
      const userId = action.payload.userId;
      const quoteIndex = feed.findIndex((e) => e.id == quoteId);
      const likeIndex = feed.findIndex(
        (e) =>
          e?.id == quoteId && e.likes.some((l: Like) => l.user_id == userId)
      );

      if (likeIndex >= 0) {
        state.feedData[likeIndex].likes = feed[likeIndex].likes.filter(
          (like: Like) => like.user_id != userId
        );
        return;
      }
      state.feedData[quoteIndex]?.likes.push({
        id: new Date().valueOf(),
        quote_id: quoteId,
        user_id: userId,
        like: 1,
      });
    },
  },
});

export const feedActions = feedSlice.actions;

export default feedSlice.reducer;
