import React from 'react';
import { View } from 'react-native';
import { LatLng, Marker, MyMapMarkerProps } from 'react-native-maps';

interface CustomMarkerProps extends MyMapMarkerProps {
  coordinate?: LatLng;
  color: string;
  score?: number;
}

function CustomMarker({
  coordinate,
  color,
  score = 5,
  ...props
}: CustomMarkerProps) {
  const markerView = (
    <View className="h-[35px] w-[32px] items-center">
      <View
        className="w-[27px] h-[27px] rotate-45 rounded-[27px] border border-black rounded-br-[1px]"
        style={{ backgroundColor: color }}
      >
        <View className="absolute w-[4px] h-[4px] rounded-[4px] bg-black top-[12px] left-[5px]" />
        <View className="absolute w-[4px] h-[4px] rounded-[4px] bg-black top-[5px] left-[12px]" />
        {score > 3 && (
          <View className="w-[12px] h-[12px] border rounded-[12px] rotate-45 ml-[5px] mt-[5px] border-t-[rgba(255,255,255,0)] border-b-[rgba(255,255,255,0)] border-l-[rgba(255,255,255,0)]" />
        )}
        {score === 3 && (
          <View className="w-[8px] h-[8px] border-l border-black ml-[13px] mt-[13px] rotate-45" />
        )}
        {score <= 1 && (
          <View className="w-[12px] h-[12px] border rounded-[12px] rotate-45 ml-[12px] mt-[12px] border-t-[rgba(255,255,255,0)] border-b-[rgba(255,255,255,0)] border-r-[rgba(255,255,255,0)]" />
        )}
      </View>
    </View>
  );

  return coordinate ? (
    <Marker coordinate={coordinate} {...props}>
      {markerView}
    </Marker>
  ) : (
    markerView
  );
}

export default CustomMarker;
