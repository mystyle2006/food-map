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
import { EditIcon, TrashIcon } from '@app/components/ui/icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FeedDetailActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

function FeedDetailActionSheet({
  isOpen,
  onClose,
}: FeedDetailActionSheetProps) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem onPress={onClose}>
          <ActionsheetIcon className="stroke-background-700" as={TrashIcon} />
          <ActionsheetItemText>Delete</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={onClose}>
          <ActionsheetIcon className="stroke-background-700" as={EditIcon} />
          <ActionsheetItemText>Edit</ActionsheetItemText>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
}

export default FeedDetailActionSheet;
