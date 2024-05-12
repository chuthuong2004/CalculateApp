import {useEffect, useState} from 'react';

/**
 * This hook will create a loading state
 * @param delay The time at which the status will update loading
 * @returns {Object} Status is loading
 *  @property {boolean} isLoading True if is loading
 */
export function useLoading(delay: number) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handler = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay]);
  return {isLoading};
}
