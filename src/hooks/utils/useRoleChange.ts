import {useEffect} from 'react';
import {useAppDispatch} from '../../store';
import {setCredentials} from '@/store/actions';
import {Subjects} from '@/types/commons';

export function useRoleChange(subject: Subjects) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        setCredentials({
          _id: '12312312',
          full_name: {
            first: 'Đào',
            last: 'Văn Thương',
          },
          address: '520 QL13',
          username: 'vanthuong.dao2004@gmail.com',
          birthday: '',
          is_block: false,
          createdAt: '',
          email: 'vanthuong.dao2004@gmail.com',
          phone: '0333729170',
          refresh_token: '',
          sex: 'Male',
          status: 'active',
          type_service: 'DOCTOR_MANAGER',
          avatar: '',
          updatedAt: '',
          roles: [
            {
              permissions: [
                {
                  _id: 'ReadUser',
                  name: 'read User',
                  can: true,
                  action: 'read',
                  subject: 'User',
                },
                {
                  _id: 'CreateUser',
                  name: 'create User',
                  can: true,
                  action: 'create',
                  subject: 'User',
                },
                {
                  _id: 'UpdateUser',
                  name: 'update User',
                  can: true,
                  action: 'update',
                  subject: 'User',
                },
                {
                  _id: 'DeleteUser',
                  name: 'delete User',
                  can: true,
                  action: 'delete',
                  subject: 'User',
                },
                {
                  _id: 'BlockUser',
                  name: 'block User',
                  can: true,
                  action: 'update',
                  subject: 'User',
                },
                {
                  _id: 'ReadSub',
                  name: 'read Sub',
                  can: true,
                  action: 'delete',
                  subject: 'Doctor',
                },
                {
                  _id: 'CreateSub',
                  name: 'create Sub',
                  can: true,
                  action: 'create',
                  subject: 'Doctor',
                },
                {
                  _id: 'UpdateSub',
                  name: 'update Sub',
                  can: true,
                  action: 'delete',
                  subject: 'Doctor',
                },
                {
                  _id: 'DeleteSub',
                  name: 'delete Sub',
                  can: true,
                  action: 'delete',
                  subject: 'Doctor',
                },
                {
                  _id: 'BlockSub',
                  name: 'block Sub',
                  can: true,
                  action: 'update',
                  subject: 'sub',
                },
                {
                  _id: 'ReadRole',
                  name: 'read Role',
                  can: subject === 'Role' ? false : true,
                  action: 'read',
                  subject: 'Role,Permission',
                },
                {
                  _id: 'CreateRole',
                  name: 'create Role',
                  can: true,
                  action: 'create',
                  subject: 'Role,Permission',
                },
                {
                  _id: 'UpdateRole',
                  name: 'update Role',
                  can: true,
                  action: 'update',
                  subject: 'Role,Permission',
                },
                {
                  _id: 'DeleteRole',
                  name: 'delete Role',
                  can: true,
                  action: 'delete',
                  subject: 'Role,Permission',
                },
                {
                  _id: 'ReadCategory',
                  name: 'read Category',
                  can: subject === 'Category' ? false : true,
                  action: 'read',
                  subject: 'Category',
                },
                {
                  _id: 'CreateCategory',
                  name: 'create Category',
                  can: true,
                  action: 'create',
                  subject: 'Category',
                },
                {
                  _id: 'UpdateCategory',
                  name: 'update Category',
                  can: true,
                  action: 'update',
                  subject: 'Category',
                },
                {
                  _id: 'DeleteCategory',
                  name: 'delete Category',
                  can: true,
                  action: 'delete',
                  subject: 'Category',
                },
                {
                  _id: 'ReadStore',
                  name: 'read Store',
                  can: true,
                  action: 'read',
                  subject: 'Store,Permission',
                },
                {
                  _id: 'CreateStore',
                  name: 'create Store',
                  can: true,
                  action: 'create',
                  subject: 'Store,Permission',
                },
                {
                  _id: 'UpdateStore',
                  name: 'update Store',
                  can: true,
                  action: 'update',
                  subject: 'Store,Permission',
                },
                {
                  _id: 'DeleteStore',
                  name: 'delete Store',
                  can: true,
                  action: 'delete',
                  subject: 'Store,Permission',
                },
                {
                  _id: 'ReadPaymentMethod',
                  name: 'read PaymentMethod',
                  can: true,
                  action: 'read',
                  subject: 'PaymentMethod',
                },
                {
                  _id: 'CreatePaymentMethod',
                  name: 'create PaymentMethod',
                  can: true,
                  action: 'create',
                  subject: 'PaymentMethod',
                },
                {
                  _id: 'UpdatePaymentMethod',
                  name: 'update PaymentMethod',
                  can: true,
                  action: 'update',
                  subject: 'PaymentMethod',
                },
                {
                  _id: 'DeletePaymentMethod',
                  name: 'delete PaymentMethod',
                  can: true,
                  action: 'delete',
                  subject: 'PaymentMethod',
                },
                {
                  _id: 'ReadPayment',
                  name: 'read Payment',
                  can: true,
                  action: 'read',
                  subject: 'Payment',
                },
                {
                  _id: 'CreatePayment',
                  name: 'create Payment',
                  can: true,
                  action: 'create',
                  subject: 'Payment',
                },
                {
                  _id: 'UpdatePayment',
                  name: 'update Payment',
                  can: true,
                  action: 'update',
                  subject: 'Payment',
                },
                {
                  _id: 'DeletePayment',
                  name: 'delete Payment',
                  can: true,
                  action: 'delete',
                  subject: 'Payment',
                },
                {
                  _id: 'ReadMedical',
                  name: 'read Medical',
                  can: subject === 'Medical' ? false : true,
                  action: 'read',
                  subject: 'Medical',
                },
                {
                  _id: 'CreateMedical',
                  name: 'create Medical',
                  can: true,
                  action: 'create',
                  subject: 'Medical',
                },
                {
                  _id: 'UpdateMedical',
                  name: 'update Medical',
                  can: true,
                  action: 'update',
                  subject: 'Medical',
                },
                {
                  _id: 'DeleteMedical',
                  name: 'delete Medical',
                  can: true,
                  action: 'delete',
                  subject: 'Medical',
                },
                {
                  _id: 'ReadPrescription',
                  name: 'read Prescription',
                  can: subject === 'Prescription' ? false : true,
                  action: 'read',
                  subject: 'Prescription',
                },
                {
                  _id: 'CreatePrescription',
                  name: 'create Prescription',
                  can: true,
                  action: 'create',
                  subject: 'Prescription',
                },
                {
                  _id: 'UpdatePrescription',
                  name: 'update Prescription',
                  can: true,
                  action: 'update',
                  subject: 'Prescription',
                },
                {
                  _id: 'DeletePrescription',
                  name: 'delete Prescription',
                  can: true,
                  action: 'delete',
                  subject: 'Prescription',
                },
                {
                  _id: 'ReadDiscount',
                  name: 'create Discount',
                  can: true,
                  action: 'read',
                  subject: 'Discount',
                },
                {
                  _id: 'CreateDiscount',
                  name: 'create Discount',
                  can: true,
                  action: 'create',
                  subject: 'Discount',
                },
                {
                  _id: 'UpdateDiscount',
                  name: 'update Discount',
                  can: true,
                  action: 'update',
                  subject: 'Discount',
                },
                {
                  _id: 'DeleteDiscount',
                  name: 'delete Discount',
                  can: true,
                  action: 'delete',
                  subject: 'Discount',
                },
              ],
              sub_roles: [],
              _id: '652f572df4052bff427f0630',
              name: 'DoctorManager',
            },
          ],
        }),
      );
    }, 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, subject]);
}
