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
import { useNavigation } from '@react-navigation/native';
import { useMutateDeletePost } from '@app/hooks/useMutateDeletePost';
import { Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '@app/types/navigation';

interface FeedDetailActionSheetProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

function FeedDetailActionSheet({
  id,
  isOpen,
  onClose,
}: FeedDetailActionSheetProps) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const deletePost = useMutateDeletePost();
  const handleDeletePost = () => {
    Alert.alert(
      'Do you want to delete?',
      'The post will be deleted from feed and map.',
      [
        {
          text: 'Delete',
          onPress: () =>
            deletePost.mutate(id, {
              onSuccess: () => {
                onClose();
                navigation.goBack();
              },
            }),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const handleEditPost = () => {
    navigation.navigate('EditLocation', { id });
    onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem onPress={handleDeletePost}>
          <ActionsheetIcon className="stroke-red-700" as={TrashIcon} />
          <ActionsheetItemText className="text-red-700">
            Delete
          </ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={handleEditPost}>
          <ActionsheetIcon className="stroke-background-700" as={EditIcon} />
          <ActionsheetItemText>Edit</ActionsheetItemText>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
}

export default FeedDetailActionSheet;
