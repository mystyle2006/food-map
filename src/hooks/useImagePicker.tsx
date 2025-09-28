import { useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import useMutateImages from '@app/hooks/useMutateImages';
import { ImageUri } from '@app/types/domains';
import { getFormDataImages } from '@app/utils/images';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@app/components/ui/toast';
import { Alert } from 'react-native';

interface UseImagePickerProps {
  initialImages: ImageUri[];
  mode?: 'multiple' | 'single';
  onSettled?: () => void;
}

function useImagePicker({
  initialImages,
  mode = 'multiple',
  onSettled,
}: UseImagePickerProps) {
  const toast = useToast();
  const uploadImages = useMutateImages();
  const [imageUris, setImageUris] = useState<ImageUri[]>(initialImages);

  const addImageUris = (uris: string[]) => {
    setImageUris((prev) => [...prev, ...uris.map((uri) => ({ uri }))]);
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter((image) => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const replaceImageUri = (uris: string[]) => {
    if (uris.length > 1) {
      Alert.alert('Exceeded Image Count', 'You can add up to 1 image only.');
      return;
    }

    setImageUris([...uris.map((uri) => ({ uri }))]);
  };

  const handleChangeImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: mode === 'multiple' ? 5 : 1,
    })
      .then((images) => {
        const formData = getFormDataImages('images', images);
        uploadImages.mutate(formData, {
          onSuccess: (data) =>
            mode === 'multiple' ? addImageUris(data) : replaceImageUri(data),
          onSettled: () => onSettled && onSettled(),
        });
      })
      .catch((error) => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          toast.show({
            placement: 'bottom',
            duration: 3000,
            containerStyle: {
              marginBottom: 30,
            },
            render: ({ id }) => {
              const uniqueToastId = 'toast-' + id;
              return (
                <Toast
                  nativeID={uniqueToastId}
                  action="error"
                  variant="outline"
                >
                  <ToastTitle>Error</ToastTitle>
                  <ToastDescription>
                    Please allow photos permission.
                  </ToastDescription>
                </Toast>
              );
            },
          });
        }
      });
  };

  return { imageUris, handleChangeImage, handleDeleteImage: deleteImageUri };
}

export default useImagePicker;
