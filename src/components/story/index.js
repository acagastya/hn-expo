import React, { useEffect, useState } from 'react';
import {
  Alert,
  TouchableOpacity,
  Text,
  View,
  Linking,
  Modal
} from 'react-native';
import moment from 'moment';
import HTML from 'react-native-render-html';

import fetch from 'node-fetch';

import {
  APIurl,
  version
} from '../../../assets/constants/API';
import styles from '../../../assets/styles';
import UserModal from '../userModal';
import StoryModal from '../storyModal';

function Story({ storyID }) {
  const [storyData, setStoryData] = useState(undefined);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(
    false
  );
  useEffect(() => {
    let isMounted = true;
    async function getStoryData() {
      if (isMounted) {
        const data = await fetch(
          `${APIurl}/${version}/item/${storyID}.json`
        );
        const res = await data.json();
        setStoryData(res);
      }
    }
    getStoryData();
    return () => {
      setStoryData(undefined);
      isMounted = false;
    };
  }, []);
  {
    return storyData && !storyData.deleted ? (
      <View style={styles.storyContainer}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={showUserModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <UserModal
            userID={storyData.by}
            setShowUserModal={setShowUserModal}
          />
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={showStoryModal}
        >
          <StoryModal
            setShowStoryModal={setShowStoryModal}
            storyData={storyData}
          />
        </Modal>
        <TouchableOpacity
          onPress={() => setShowUserModal(true)}
        >
          <Text style={styles.storyUser}>
            {storyData.by} • {parseTime(storyData.time)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowStoryModal(true)}
        >
          <Text style={styles.storyTitle}>
            {storyData.title}
          </Text>

          {storyData.text ? (
            <HTML
              html={storyData.text}
              onLinkPress={(_, href) =>
                Linking.openURL(href)
              }
            />
          ) : (
            <></>
          )}
        </TouchableOpacity>
        {storyData.url ? (
          <Text
            style={styles.storyUrl}
            onPress={() => Linking.openURL(storyData.url)}
          >
            Open URL 🔗
          </Text>
        ) : (
          <></>
        )}
        <Text>
          {storyData.score} upvote
          {storyData.score == 1 ? '' : 's'} •{' '}
          {storyData.descendants} comment
          {storyData.descendants == 1 ? '' : 's'}
        </Text>
      </View>
    ) : (
      <Null />
    );
  }
}

function Null() {
  return <></>;
}

function parseTime(UNIXtime) {
  return moment(UNIXtime * 1000).fromNow();
}

export default Story;
