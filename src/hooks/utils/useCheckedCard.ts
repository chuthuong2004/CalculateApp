import {useCallback, useState} from 'react';

/**
 *
 * @param listData Data need checked
 * @returns
 */
export function useCheckedCard<T extends {_id: string}>(listData?: T[]) {
  // ** Show option select to select item
  const [showSelect, setShowSelect] = useState(false);

  // ** Store list item selected
  const [listItemSelected, setListItemSelected] = useState<Array<T>>([]);

  // ** Handle long press -> show option select & set list item selected

  /**
   * This callback will be show state select & append item info list selected
   *
   * @param value giá trị truyền vào
   * @returns Navigation prop of the parent screen.
   */
  const handleLongPress = useCallback((value: T) => {
    setShowSelect(true);
    setListItemSelected(prev => {
      if (prev.find(item => item._id === value._id)) {
        return prev.filter(item => item._id !== value._id);
      }
      return [...prev, value];
    });
  }, []);

  const handleCheckedItem = useCallback((value: T) => {
    setListItemSelected(prev => {
      if (prev.find(item => item._id === value._id)) {
        return prev.filter(item => item._id !== value._id);
      }
      return [...prev, value];
    });
  }, []);

  const handleCancelSelected = useCallback(() => {
    setListItemSelected([]);
  }, []);

  const handleToggleAll = useCallback(() => {
    setListItemSelected(prev => {
      if (!listData) {
        return prev;
      }
      if (prev.length === listData.length) {
        return [];
      }
      return listData;
    });
  }, [listData]);
  return {
    showSelect,
    listItemSelected,
    handleCheckedItem,
    handleLongPress,
    handleCancelSelected,
    handleToggleAll,
    setListItemSelected,
  };
}
