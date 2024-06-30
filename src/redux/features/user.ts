import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { HydrateAction, RootState } from '../store'
import { UserType } from '@/utils/api/types/user'

export interface UserStateProps {
  data: UserType | null
  isAuthModal: boolean
}

const initialState: UserStateProps = {
  data: null,
  isAuthModal: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserType>) => {
      state.data = action.payload
    },
    setAuthModal: (state, action: PayloadAction<boolean>) => {
      state.isAuthModal = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: HydrateAction) => {
      return {
        ...state,
        ...action.payload.user,
      }
    })
  },
})

export const { setUserData, setAuthModal } = userSlice.actions

export const selectUser = (state: RootState) => state.user.data
export const selectAuth = (state: RootState) => state.user.isAuthModal

export const userReducer = userSlice.reducer
