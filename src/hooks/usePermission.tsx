import { useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { alerts } from '@app/constants/messages';

type PermissionType = 'LOCATION' | 'PHOTO';

const androidPermissions = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermissions = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

const showPermissionAlert = (type: PermissionType) => {
  Alert.alert(
    alerts[`${type}_PERMISSION`].TITLE,
    alerts[`${type}_PERMISSION`].DESCRIPTION,
    [
      { text: 'Settings', onPress: () => Linking.openSettings() },
      { text: 'Cancel', style: 'cancel' },
    ],
  );
};

function usePermission(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid ? androidPermissions : iosPermissions;
      const checked = await check(permissionOS[type]);

      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionAlert(type);
            return;
          }

          await request(permissionOS[type]);
          break;
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAlert(type);
          break;
      }
    })();
  }, [type]);
}

export default usePermission;
