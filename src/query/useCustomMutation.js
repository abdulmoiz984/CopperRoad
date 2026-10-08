import { useMutation } from '@tanstack/react-query';
import { formatBackendErrors } from '../utils';

export const useCustomMutation = ({ mutationFn, mutationKey = null, onSuccess, onError, on422Error, ...rest }) =>
  useMutation({
    mutationKey,
    mutationFn,
    onError: (error, variables, context) => {
      const response = error?.response;
      if (response?.status === 422) on422Error?.(formatBackendErrors(response.data?.errors), response.data?.message);
      onError?.(error, variables, context);
    },
    onSuccess: (response, reqData) => onSuccess?.(response, reqData),
    ...rest,
  });

export default useCustomMutation;
