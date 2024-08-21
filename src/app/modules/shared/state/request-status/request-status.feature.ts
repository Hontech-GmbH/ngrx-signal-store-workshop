import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';
import { computed } from '@angular/core';

export type RequestStatus = 'idle' | 'loading' | 'fulfilled' | 'error';

export type RequestStatusState = {
  requestStatus: RequestStatus;
};

export const initialRequestStatusState: RequestStatusState = {
  requestStatus: 'idle',
};

export function withRequestStatus() {
  return signalStoreFeature(
    withState<RequestStatusState>(initialRequestStatusState),
    withComputed(({ requestStatus }) => ({
      isRequestStatusIdle: computed(() => requestStatus() === 'idle'),
      isRequestStatusLoading: computed(() => requestStatus() === 'loading'),
      isRequestStatusFulfilled: computed(() => requestStatus() === 'fulfilled'),
      isRequestStatusFailed: computed(() => requestStatus() === 'error'),
    })),
  );
}

export function setRequestStatusLoading(): RequestStatusState {
  return { requestStatus: 'loading' };
}

export function setRequestStatusFulfilled(): RequestStatusState {
  return { requestStatus: 'fulfilled' };
}

export function setRequestStatusFailed(): RequestStatusState {
  return { requestStatus: 'error' };
}
