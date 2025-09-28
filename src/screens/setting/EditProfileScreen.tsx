import React from 'react';
import { Image, Keyboard, Platform, Pressable, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { baseUrls } from '@app/api/axios';
import { colors } from '@app/constants/colors';
import FixedBottomCTA from '@app/components/FixedBottomCTA';
import { validateEditProfile } from '@app/validations/account.validation';
import { useModal } from '@app/hooks/useModal';
import { useAuth } from '@app/hooks/useAuth';
import useImagePicker from '@app/hooks/useImagePicker';
import useForm from '@app/hooks/useForm';
import EditProfileActionSheet from '@app/components/setting/EditProfileActionSheet';
import { Toast, ToastDescription, useToast } from '@app/components/ui/toast';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@app/components/ui/form-control';
import { Input, InputField } from '@app/components/ui/input';

function EditProfileScreen() {
  const { auth, profileMutation } = useAuth();
  const toast = useToast();
  const imageAction = useModal();
  const imagePicker = useImagePicker({
    initialImages: auth.imageUri ? [{ uri: auth.imageUri }] : [],
    mode: 'single',
    onSettled: imageAction.hide,
  });
  const editProfile = useForm({
    initialValue: { nickname: auth.nickname ?? '' },
    validate: validateEditProfile,
  });

  const handlePressImage = () => {
    imageAction.show();
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    profileMutation.mutate(
      {
        ...editProfile.values,
        imageUri: imagePicker.imageUris[0]?.uri,
      },
      {
        onSuccess: () =>
          toast.show({
            placement: 'bottom',
            duration: 3000,
            containerStyle: {
              marginBottom: 30,
            },
            render: ({ id }) => {
              const uniqueToastId = 'toast-' + id;
              return (
                <Toast nativeID={uniqueToastId} action="info" variant="outline">
                  <ToastDescription>Profile has been updated.</ToastDescription>
                </Toast>
              );
            },
          }),
      },
    );
  };

  return (
    <>
      <View className="flex-1 p-5">
        <View className="items-center mt-5 mb-10">
          <Pressable
            className="w-[100px] h-[100px] rounded-full justify-center items-center border border-[#E7E7E7]"
            onPress={handlePressImage}
          >
            {imagePicker.imageUris.length === 0 ? (
              <Ionicons
                name="camera-outline"
                size={30}
                color={colors.GRAY_500}
              />
            ) : (
              <Image
                source={{
                  uri: `${
                    Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
                  }/${imagePicker.imageUris[0]?.uri}`,
                }}
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            )}
          </Pressable>
        </View>

        <FormControl isInvalid={!!editProfile.errors.nickname} size="md">
          <FormControlLabel>
            <FormControlLabelText>Nickname</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size="md">
            <InputField
              autoFocus
              submitBehavior="submit"
              returnKeyType="join"
              onSubmitEditing={handleSubmit}
              type="text"
              autoCapitalize="none"
              {...editProfile.getTextInputProps('nickname')}
            />
          </Input>
          <FormControlError>
            <FormControlErrorText className="text-red-500">
              {editProfile.errors.nickname}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      </View>
      <FixedBottomCTA label="Save" onPress={handleSubmit} />

      <EditProfileActionSheet
        isVisible={imageAction.isVisible}
        hideAction={imageAction.hide}
        onChangeImage={imagePicker.handleChangeImage}
      />
    </>
  );
}

export default EditProfileScreen;
