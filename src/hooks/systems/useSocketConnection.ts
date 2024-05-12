import {selectUser} from '@/store/selectors';
// import {socketServices} from '@services/socket';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

export function useSocketConnection() {
  const {user} = useSelector(selectUser);
  // useEffect(() => {
  //   if (user) {
  //     socketServices.emit('connection', {
  //       user_id: user?._id,
  //     });
  //     socketServices.listen('connect', () => {
  //       console.log('Connect lại nè', socketServices.socket.id);

  //       socketServices.emit('connection', {
  //         user_id: user?._id,
  //       });
  //     });
  //   } else {
  //     socketServices.emit('remove-user');
  //   }
  // }, [user]);
}
