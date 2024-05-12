import {Actions, Subjects} from '@/types/commons';
import {useAbility} from '@casl/react';
import {AbilityContext} from '../../acl';

// ** The return value will be an array of granted permissions corresponding to the passed actions array;
// ** Ex: actions: ['create', 'update'], subject: 'Medical'
// ** => return [grantedCreateMedical, grantedUpdateMedical] : These values are of type boolean
export function useGrantedAbility(
  actions: Actions[],
  subject: Subjects,
): boolean[] {
  const ability = useAbility(AbilityContext);
  return actions.map(action => ability.can(action, subject));
}
