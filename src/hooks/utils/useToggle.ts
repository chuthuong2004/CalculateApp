import {useCallback, useState} from 'react';

export function useToggle(initialState: boolean) {
  const [isOpen, setIsOpen] = useState(initialState);
  const toggle = useCallback(() => {
    setIsOpen(state => !state);
  }, [setIsOpen]);
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  return {isOpen, toggle, setValue: setIsOpen, onClose};
}
