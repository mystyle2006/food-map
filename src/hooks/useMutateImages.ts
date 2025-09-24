import { useMutation } from '@tanstack/react-query';
import { uploadImages } from '@app/api/images';
import { UseMutationCustomOptions } from '@app/types/api/api';

function useMutateImages(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: uploadImages,
    ...mutationOptions,
  });
}

export default useMutateImages;
