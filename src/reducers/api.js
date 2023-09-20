import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const storeApi = createApi({
    tagTypes:['tag'],
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5432/'}),
    endpoints: (builder) => ({
        
        getUsers: builder.query({
            query: 'api/users'
        }),
        getUserById: builder.query({
            query: (id) => `api/users/${id}`
        }),
        getPosts: builder.query({
            query: 'api/posts'
        }),
        getPostById: builder.query({
            query: (id) => `api/posts/${id}`
        }),
        getPostsByUserId: builder.query({
            query: (id) => `api/posts/user/${id}`
        }),
        addPost: builder.mutation({
            query: (body) => ({
                url: 'api/posts',
                method: "POST",
                body: body
            })
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `api/posts/${id}`,
                method: "DELETE"
            })
        }),
        editPost: builder.mutation({
            query(data){
                const {id, ...body} = data;
                return {
                    url: `api/posts/${id}`,
                    method: 'PUT',
                    body
                }
            }
        })

    })
})

export const {useGetUsersQuery, useGetUserByIdQuery, useGetPostsQuery, useGetPostByIdQuery, useGetPostsByUserIdQuery, useAddPostMutation, useDeletePostMutation, useEditPostMutation} = storeApi