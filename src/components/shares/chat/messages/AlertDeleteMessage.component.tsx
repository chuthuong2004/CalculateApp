import {AlertComponent} from '@components/shares/alerts';
import {ButtonComponent} from '@components/shares/button';
import {CheckCircleAnimatedComponent} from '@components/shares/checkbox';
import {TextNormalComponent} from '@components/shares/text';
import {useToggle} from '@hooks/utils';
import {flex} from '@styles/flex.style';
import React, {memo, useCallback} from 'react';
import {Pressable, View} from 'react-native';

type AlertDeleteMessageProps = {
  onConfirm: (isDeleteAll: boolean, onDismiss: () => void) => void;
  show: boolean;
  onClose: () => void;
  type?: 'message' | 'image';
  checkBoxTitle: React.ReactNode;
};
const AlertDeleteMessageComponent = ({
  onConfirm,
  onClose,
  show,
  type = 'message',
  checkBoxTitle,
}: AlertDeleteMessageProps) => {
  // ** ======= Custom hook =======
  const {
    isOpen: isDeleteAll,
    toggle: toggleDeleteAll,
    onClose: closeDeleteAll,
  } = useToggle(false);
  const handleDismiss = useCallback(() => {
    onClose();
    closeDeleteAll();
  }, [closeDeleteAll, onClose]);
  // ** Handle confirm delete message
  const handleConfirmDeleteMessage = () => {
    onConfirm(isDeleteAll, handleDismiss);
  };
  const renderCheckboxDelete = () => {
    return (
      <Pressable
        onPress={toggleDeleteAll}
        style={[flex.row, flex.gap4, flex.alignItemsCenter]}>
        <CheckCircleAnimatedComponent
          checked={isDeleteAll}
          onChecked={toggleDeleteAll}
        />
        {checkBoxTitle}
      </Pressable>
    );
  };
  return (
    <AlertComponent
      show={show}
      title={type === 'image' ? 'Delete image' : 'Delete message'}
      message={
        type === 'image'
          ? 'Are you sure you want to delete this image ?'
          : 'Are you sure you want to delete this message ?'
      }
      contentContainerStyle={[flex.widthFull]}
      onDismiss={handleDismiss}
      confirmText="Delete"
      customView={
        <View style={[flex.gap10, flex.widthFull]}>
          <TextNormalComponent>
            {type === 'image' ? 'Delete image' : 'Delete message'}
          </TextNormalComponent>
          <TextNormalComponent variant="secondary">
            {type === 'image'
              ? 'Are you sure you want to delete this image ?'
              : 'Are you sure you want to delete this message ?'}
          </TextNormalComponent>
          {renderCheckboxDelete()}

          <View style={[flex.row, flex.gap10]}>
            <View style={[flex.flex1]}>
              <ButtonComponent onPress={handleDismiss} rounded color="info">
                Cancel
              </ButtonComponent>
            </View>
            <View style={[flex.flex1]}>
              <ButtonComponent
                onPress={handleConfirmDeleteMessage}
                rounded
                color="danger">
                Delete
              </ButtonComponent>
            </View>
          </View>
        </View>
      }
    />
  );
};

export default memo(AlertDeleteMessageComponent);
