import { useEffect } from 'react';

export function useInterval(action: () => void, interval: number) {
  useEffect(() => {
    action();
    const id = setInterval(action, interval);
    return () => clearInterval(id);
  }, []);
}
