import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "administratorApi",
    tagTypes: [
        "Attendee",
        "FeedBacks",
        "Attendees",
        "DataFinalists",
        "Events",
        "Administrators",
        "Performance",
        "Dashboard",
        "AttendeeStatus",
    ],
    endpoints: (build) => ({
        getAttendee: build.query({
            query: (id) => `general/attendee/${id}`,
            transformResponse: (res) => res.sort((a, b) => b.id - a.id),
            providesTags: ["Attendee"],
        }),
        getFeedBacks: build.query({
            query: () => "client/feedBacks",
            providesTags: ["FeedBacks"],
        }),
        getAttendees: build.query({
            query: () => "client/attendees",
            transformResponse: (res) => res.sort((a, b) => b.id - a.id),
            providesTags: ["Attendees"],
        }),
        CreateAttendees: build.mutation({
            query: (newAttendee) => ({
                url: "client/attendees",
                method: "POST",
                body: newAttendee,
            }),
            invalidatesTags: ["Attendees"],
        }),
        UpdateAttendees: build.mutation({
            query: (updatedAttendee) => ({
                url: `client/attendees/${updatedAttendee._id}`,
                method: "PATCH",
                body: updatedAttendee,
            }),
            invalidatesTags: ["Attendees"],
        }),

        DeleteAttendees: build.mutation({
            query: (id) => ({
                url: `client/attendees/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Attendees"],
        }),

        getDataFinalists: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/dataFinalists",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["DataFinalists"],
        }),
        getCreateDataFinalist: build.mutation({
            query: (newDataFinalist) => ({
                url: "client/dataFinalists",
                method: "POST",
                body: newDataFinalist,
            }),
            providesTags: ["DataFinalists"],
        }),
        getUpdateDataFinalist: build.mutation({
            query: (updatedDataFinalist) => ({
                url: `client/dataFinalists/${updatedDataFinalist._id}`,
                method: "PATCH",
                body: updatedDataFinalist,
            }),
            providesTags: ["DataFinalists"],
        }),
        getDeleteDataFinalist: build.mutation({
            query: (id) => ({
                url: `client/dataFinalists/${id}`,
                method: "DELETE",
            }),
            providesTags: ["DataFinalists"],
        }),
        getEvents: build.query({
            query: () => "events/events",
            providesTags: ["Events"],
        }),
        getAdministrators: build.query({
            query: () => "management/administrator",
            method: "GET",
            providesTags: ["Administrators"],
        }),
        
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"],
        }),

        getAttendeeStatus: build.query({
            query: () => `client/attendeeStatus`,
            providesTags: ["AttendeeStatus"],
        }),

        createAttendeeStatus: build.mutation({
            query(newAttendeeStatus) {
                return {
                    url: `client/attendeeStatus`,
                    method: "POST",
                    body: newAttendeeStatus,
                };
            },
        }),
        udaptedAttendeeStatus: build.mutation({
            query(updatedAttendeeStatus) {
                return {
                    url: `client/attendeeStatus/${updatedAttendeeStatus._id}`,
                    method: "PATCH",
                    body: updatedAttendeeStatus,
                };
            },
        }),
        deleteAttendeeeStatus: build.mutation({
            query(id) {
                return {
                    url: `client/attendeeStatus/${id}`,
                    method: "DELETE",
                };
            },
        }),

        createAdminsitrator: build.mutation({
            query(newAdminsitrator) {
                return {
                    url: `management/administrator`,
                    method: "POST",
                    body: newAdminsitrator,
                };
            },
            invalidatesTags: ["Administrators"],
        }),

        updateAdminsitrator: build.mutation({
            query(updatedAdminsitrator) {
                return {
                    url: `management/administrator/${updatedAdminsitrator._id}`,
                    method: "PATCH",
                    body: updatedAdminsitrator,
                };
            },
            invalidatesTags: ["Administrators"],
        }),

        deleteAdminsitrator: build.mutation({
            query(id) {
                return {
                    url: `management/administrator/${id}`,
                    method: "DELETE",
                };
              
            },
            invalidatesTags: ["Administrators"],
        }),
    }),
});

export const {
    useGetAttendeeQuery,
    useGetFeedBacksQuery,
    useGetAttendeesQuery,
    useGetDataFinalistsQuery,
    useGetEventsQuery,
    useGetAdministratorsQuery,
    useGetAttendeePerformanceQuery,
    useGetDashboardQuery,
    useGetCreateDataFinalistMutation,
    useGetUpdateDataFinalistMutation,
    useGetDeleteDataFinalistMutation,
    useCreateAttendeesMutation,
    useUpdateAttendeesMutation,
    useDeleteAttendeesMutation,
    useGetAttendeeStatusQuery,
    useCreateAttendeeStatusMutation,
    useUdaptedAttendeeStatusMutation,
    useDeleteAttendeeeStatusMutation,
    useCreateAdminsitratorMutation,
    useUpdateAdminsitratorMutation,
    useDeleteAdminsitratorMutation,
} = api;
