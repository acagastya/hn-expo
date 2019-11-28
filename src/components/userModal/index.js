import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native';
import HTML from 'react-native-render-html';

import {
  APIurl,
  version
} from '../../../assets/constants/API';
import styles from '../../../assets/styles';

function UserModal({ userID, setShowUserModal }) {
  const [userData, setUserData] = useState(undefined);
  useEffect(() => {
    let isMounted = true;
    async function getUserData() {
      if (isMounted) {
        const data = await fetch(
          `${APIurl}/${version}/user/${userID}.json`
        );
        const res = await data.json();
        setUserData(res);
      }
    }
    getUserData();
    return () => {
      setUserData(undefined);
      isMounted = false;
    };
  }, []);
  return userData ? (
    <SafeAreaView style={styles.modelContainer}>
      <TouchableOpacity
        onPress={() => setShowUserModal(false)}
      >
        <View style={styles.userModalContainer}>
          <Text style={styles.userModalName}>
            {userData.id}
          </Text>
          {userData.about ? (
            <HTML
              html={userData.about}
              style={styles.userModalAbout}
              onLinkPress={(_, href) =>
                Linking.openURL(href)
              }
            />
          ) : (
            <Null />
          )}
          <Text style={styles.userModalKarma}>
            {userData.karma} karma
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  ) : (
    <Null />
  );
}

function Null() {
  return <></>;
}

export default UserModal;
