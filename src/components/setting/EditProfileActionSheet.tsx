import React from 'react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetIcon,
  ActionsheetItem,
  ActionsheetItemText,
} from '@app/components/ui/actionsheet';
import { EditIcon, PaperclipIcon } from '@app/components/ui/icon';

interface EditProfileActionSheetProps {
  isVisible: boolean;
  onChangeImage: () => void;
  hideAction: () => void;
}

function EditProfileActionSheet({
  isVisible,
  onChangeImage,
  hideAction,
}: EditProfileActionSheetProps) {
  return (
    <Actionsheet isOpen={isVisible} onClose={hideAction}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem onPress={onChangeImage}>
          <ActionsheetIcon as={PaperclipIcon} />
          <ActionsheetItemText>Choose from Album</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={hideAction}>
          <ActionsheetIcon className="stroke-background-700" as={EditIcon} />
          <ActionsheetItemText>Cancel</ActionsheetItemText>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
}

export default EditProfileActionSheet;
