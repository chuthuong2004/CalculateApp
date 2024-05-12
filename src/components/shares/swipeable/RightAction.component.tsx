import {TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';

// ** Global styles
import {flex, spacing} from '@styles';

// ** Share components
import {AppVectorIcons} from '@components/shares';

// ** Constants
import {COLORS_APP, ICON} from '@utils/constants';

// ** Types
import {Subjects} from '@/types/commons';

// ** Casl
import {Can} from '@/acl/index';
import {hp} from '@utils/helpers';

type RightActionProps = {
  onPressEdit?: () => void;
  onPressDelete: () => void;
  subject: Subjects;
  onPressBlock?: () => void; // for subject 'User'
  onPressRole?: () => void; // for subject 'User'
  onSendDiscount?: () => void; // for subject 'Discount'
};
const RightActionComponent = ({
  onPressEdit,
  onPressDelete,
  subject,
  onPressRole,
  onPressBlock,
  onSendDiscount,
}: RightActionProps) => {
  return (
    <View
      style={[
        flex.row,
        flex.alignItemsCenter,
        flex.justifyContentCenter,
        spacing('padding').horizontal,
        flex.gap10,
      ]}>
      <Can I="delete" a={subject}>
        <TouchableOpacity onPress={onPressDelete}>
          <AppVectorIcons
            type="Ionicons"
            name={ICON.Ionicons.trashOutline}
            size={hp(2.4)}
            color={COLORS_APP.danger}
          />
        </TouchableOpacity>
      </Can>
      <Can I="update" a={subject}>
        {onPressEdit && (
          <TouchableOpacity onPress={onPressEdit}>
            <AppVectorIcons
              type="Feather"
              name={ICON.Feather.edit}
              size={hp(2.4)}
              color={COLORS_APP.primary}
            />
          </TouchableOpacity>
        )}
      </Can>
      {subject === 'User' && (
        <>
          <Can I="update" a={subject}>
            <TouchableOpacity onPress={onPressBlock}>
              <AppVectorIcons
                type="Feather"
                name={ICON.Feather.lock}
                size={hp(2.4)}
                color={COLORS_APP.primary}
              />
            </TouchableOpacity>
          </Can>
          <Can I="update" a={subject}>
            {onPressRole && (
              <TouchableOpacity onPress={onPressRole}>
                <AppVectorIcons
                  type="Feather"
                  name={'shield'}
                  size={hp(2.4)}
                  color={COLORS_APP.warning}
                />
              </TouchableOpacity>
            )}
          </Can>
        </>
      )}
      {subject === 'Role' && (
        <Can I="update" a={subject}>
          {onPressRole && (
            <TouchableOpacity onPress={onPressRole}>
              <AppVectorIcons
                type="Feather"
                name={'shield'}
                size={hp(2.4)}
                color={COLORS_APP.warning}
              />
            </TouchableOpacity>
          )}
        </Can>
      )}
      {subject === 'Discount' && (
        <Can I="update" a={subject}>
          {onSendDiscount && (
            <TouchableOpacity onPress={onSendDiscount}>
              <AppVectorIcons
                type="Ionicons"
                name={ICON.Ionicons.send}
                size={hp(2.4)}
                color={COLORS_APP.primary}
              />
            </TouchableOpacity>
          )}
        </Can>
      )}
    </View>
  );
};

export default memo(RightActionComponent);
