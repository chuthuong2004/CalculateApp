import {Subjects} from '@/types/commons';
import {useAbility} from '@casl/react';
import {useNavigation} from '@react-navigation/native';
import {AbilityContext} from '../../acl';
import {useEffect} from 'react';

export function usePrivateScreen(subject: Subjects) {
  const navigation = useNavigation();
  const ability = useAbility(AbilityContext);
  useEffect(() => {
    if (!ability.can('read', subject)) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Acl' as never}],
      });
    }
  }, [ability, subject, navigation]);
}
