import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'

import { userReducer } from './features/user'

export type HydrateAction = {
  type: typeof HYDRATE
  payload: RootState
}

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  })
}

export const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore)
