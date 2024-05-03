import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const commentsApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '',
    }),
    endpoints: (builder) => ({
        getArticleComments: builder.query({
            query: ( params ) => {
                return `/api/comments/${params.id}?canHaveChildren=true&skip=${params.nextSet}&orderBy=${params.orderBy}`
            },
        }),
        getComment : builder.query({
            query: (id) => `/api/comments/${id}/comment`,
        }),
        getNestedComments: builder.query({
            query: ( articleId ) => {
                return `/api/comments/${articleId}?canHaveChildren=true&skip=0&orderBy=0`
            },
        }),
        commentLike: builder.mutation({
            query: (id) => ({
                url: `/api/comments/${id}/like`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    commentId: id,
                }),
            }),
        }),
        flagComment: builder.mutation({
            query: (id) => ({
                url: `/api/comments/${id}/flag`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    commentId: id,
                }),
            }),
        }),
        postComment: builder.mutation({
            query: (payload) => {
                console.log(payload);
                return {
                    url: '/api/comments/',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                };
            },
        }),
        postArticleLike: builder.mutation({
            query: (pageId) => {
                console.log(pageId);
                return {
                    url: `/Rating/LikeAsync/`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pageId: pageId,
                    }),
                };
            },
        }),
    }),
});

export const { 
    useGetArticleCommentsQuery, 
    useGetCommentQuery,
    useCommentLikeMutation, 
    useGetNestedCommentsQuery, 
    useFlagCommentMutation, 
    usePostCommentMutation,
    usePostArticleLikeMutation } = commentsApi;

export default commentsApi;

// Custom hook to retrieve the parameters from the store
