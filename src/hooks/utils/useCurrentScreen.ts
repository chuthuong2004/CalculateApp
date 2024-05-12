import {setCurrentScreen} from '@/store/actions';
import {useAppDispatch} from '@/store/index';
import {useRoute} from '@react-navigation/native';
import {useEffect} from 'react';

export function useCurrentScreen() {
  const route = useRoute();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setCurrentScreen(
        (route.params as any)?.conversationId
          ? route.name + (route.params as any)?.conversationId
          : route.name,
      ),
    );
    return () => {
      dispatch(setCurrentScreen(''));
    };
  }, [route.name, dispatch, route.params]);
}
