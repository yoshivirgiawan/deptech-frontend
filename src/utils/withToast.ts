// ** Redux imports
import { useDispatch } from 'react-redux'

// ** Third Party Components
import type { Action, createAsyncThunk } from '@reduxjs/toolkit'
import type { Renderable, ValueOrFunction } from 'react-hot-toast'
import toast from 'react-hot-toast'

import type { AppDispatch } from '@/redux-store'

type ArgumentTypes<F extends CallableFunction> = F extends (...args: infer A) => any ? A[0] : never

type ToastPromiseParams = {
  loading: Renderable
  success: ValueOrFunction<Renderable, unknown>
  error: ValueOrFunction<Renderable, any>
}

const useAppDispatch: () => AppDispatch = useDispatch

// Refactored the withToast function to improve readability and adhere to coding standards

/**
 * Wraps an action with toast notifications.
 * @template T - Type of the action.
 * @param action - The action to be dispatched.
 * @param toastParams - Object containing the toast parameters.
 * @returns A function that dispatches the action and shows toast notifications.
 */
export const withToast = <T = Action | typeof createAsyncThunk>(action: T, toastParams: ToastPromiseParams) => {
  return (dispatch: ReturnType<typeof useAppDispatch>, actionParams?: ArgumentTypes<T & CallableFunction> | void) => {
    // Dispatch the action and get the resulting promise
    const promise = dispatch((action as CallableFunction)(actionParams as any)).unwrap()

    // Show toast notifications based on the promise status
    toast.promise(promise, {
      loading: toastParams.loading,
      error: toastParams.error,
      success: toastParams.success
    })
  }
}
