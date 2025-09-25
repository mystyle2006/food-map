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

interface UseImagePickerProps {
  initialImages: ImageUri[];
}

function useImagePicker({ initialImages }: UseImagePickerProps) {
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

  const handleChangeImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
    })
      .then((images) => {
        const formData = getFormDataImages('images', images);
        uploadImages.mutate(formData, {
          onSuccess: (data) => addImageUris(data),
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
