import useForm from '@app/hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { FeedStackParamList } from '@app/types/navigation';
import { validateAddPost } from '@app/validations/location.validate';
import { ScrollView, TextInput, TextInputProps, View } from 'react-native';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@app/components/ui/form-control';
import { Input, InputField } from '@app/components/ui/input';
import React, { useRef, useState } from 'react';
import { Textarea, TextareaInput } from '@app/components/ui/textarea';
import { VStack } from '@app/components/ui/vstack';
import DatePicker from 'react-native-date-picker';
import { getDateWithSeparator } from '@app/utils/dates';
import { colors } from '@app/constants/colors';
import MarkerColorInput from '@app/components/MarkerColorInput';
import { Card } from '@app/components/ui/card';
import { Text } from '@app/components/ui/text';
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@app/components/ui/slider';
import FixedBottomCTA from '@app/components/FixedBottomCTA';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageInput } from '@app/components/ImageInput';
import usePermission from '@app/hooks/usePermission';
import useImagePicker from '@app/hooks/useImagePicker';
import PreviewImageList from '@app/components/feed/PreviewImageList';
import { useNavigation } from '@react-navigation/native';
import useGetPost from '@app/hooks/useGetPost';
import useMutateUpdatePost from '@app/hooks/useMutateUpdatePost';

type EditLocationScreenProps = StackScreenProps<
  FeedStackParamList,
  'EditLocation'
>;

function EditLocationScreen({ route }: EditLocationScreenProps) {
  const descriptionRef = useRef<TextInputProps & TextInput>(null);
  const { id } = route.params;
  const { data: post } = useGetPost(id);
  const navigation = useNavigation();
  const [openDate, setOpenDate] = useState(false);
  const locationForm = useForm({
    initialValue: {
      title: post?.title || '',
      description: post?.description || '',
      date: post?.date ? new Date(post.date) : new Date(),
      color: post?.color || colors.PINK_500,
      score: post?.score || 3,
    },
    validate: validateAddPost,
  });
  const inset = useSafeAreaInsets();
  const imagePicker = useImagePicker({ initialImages: post?.imageUris ?? [] });
  const updatePost = useMutateUpdatePost();

  usePermission('PHOTO');

  const handleSubmit = () => {
    updatePost.mutate(
      {
        id,
        body: {
          ...locationForm.values,
          imageUris: imagePicker.imageUris,
        },
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[{ paddingBottom: inset.bottom + 100 }]}
      >
        <VStack className="p-container-x gap-3">
          {/* Address */}
          <FormControl size="md">
            <FormControlLabel>
              <FormControlLabelText>Selected Location</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1 bg-gray-100" size="md" isReadOnly>
              <InputField value={post?.address || ''} type="text" />
            </Input>
          </FormControl>

          {/* Date */}
          <FormControl size="md">
            <FormControlLabel>
              <FormControlLabelText>Date</FormControlLabelText>
            </FormControlLabel>

            <Input className="my-1 bg-gray-100" size="md" isReadOnly>
              <InputField
                type="text"
                className="w-full text-center cursor-pointer"
                value={getDateWithSeparator(locationForm.values.date, '. ')}
                editable={false}
                onPress={() => setOpenDate(true)}
              />
            </Input>
          </FormControl>

          {/* Title */}
          <FormControl
            isInvalid={
              !!(locationForm.touched.title && locationForm.errors.title)
            }
            size="md"
          >
            <FormControlLabel>
              <FormControlLabelText>Title</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1" size="md">
              <InputField
                autoFocus
                submitBehavior="submit"
                returnKeyType="next"
                onSubmitEditing={() => descriptionRef?.current?.focus()}
                type="text"
                placeholder="Please enter the title."
                autoCapitalize="none"
                {...locationForm.getTextInputProps('title')}
              />
            </Input>
            <FormControlError>
              <FormControlErrorText className="text-red-500">
                {locationForm.errors.title}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* description */}
          <FormControl
            isInvalid={
              !!(
                locationForm.touched.description &&
                locationForm.errors.description
              )
            }
            size="md"
          >
            <FormControlLabel>
              <FormControlLabelText>Description</FormControlLabelText>
            </FormControlLabel>
            <Textarea className="my-1" size="md">
              <TextareaInput
                returnKeyType="join"
                type="text"
                placeholder="Please enter the description. (Optional)"
                autoCapitalize="none"
                {...locationForm.getTextInputProps('description')}
              />
            </Textarea>
            <FormControlError>
              <FormControlErrorText className="text-red-500">
                {locationForm.errors.description}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl size="md">
            <FormControlLabel>
              <FormControlLabelText>Marker</FormControlLabelText>
            </FormControlLabel>
            <Card size="md" variant="outline" className="my-1">
              <MarkerColorInput
                color={locationForm.values.color}
                onChangeColor={(value) => locationForm.onChange('color', value)}
              />
            </Card>
            <FormControlError>
              <FormControlErrorText className="text-red-500">
                {locationForm.errors.color}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl size="md">
            <FormControlLabel>
              <FormControlLabelText>Rating</FormControlLabelText>
            </FormControlLabel>
            <Card size="md" variant="outline" className="my-1">
              <View className="items-end mb-5">
                <Text>{locationForm.values.score} points</Text>
              </View>
              <Slider
                size="md"
                orientation="horizontal"
                step={1}
                minValue={1}
                maxValue={5}
                value={locationForm.values.score}
                onChange={(value) => locationForm.onChange('score', value)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Card>
            <FormControlError>
              <FormControlErrorText className="text-red-500">
                {locationForm.errors.score}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <DatePicker
            modal
            locale="en"
            mode="date"
            title={null}
            cancelText="Cancel"
            confirmText="Done"
            date={locationForm.values.date}
            open={openDate}
            onConfirm={(date) => {
              locationForm.onChange('date', date);
              setOpenDate(false);
            }}
            onCancel={() => setOpenDate(false)}
          />

          <View className="flex-row">
            <ImageInput onChange={imagePicker.handleChangeImage} />
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.handleDeleteImage}
            />
          </View>
        </VStack>
      </ScrollView>
      <FixedBottomCTA label="Edit" onPress={handleSubmit} />
    </>
  );
}

export default EditLocationScreen;
