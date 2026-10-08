import { useQuery } from '@tanstack/react-query';

export const useCustomQuery = ({ queryFn, queryKey, ...rest }) => useQuery({ queryFn, queryKey, ...rest });

export default useCustomQuery;
