import React, { useState, useEffect } from 'react';
import {
  Linking,
  Text,
  View,
  Modal,
  TouchableOpacity
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

function Comment({ commentID }) {
  const [commentData, setCommentData] = useState();
  const [showUserModal, setShowUserModal] = useState(false);
  useEffect(() => {
    let isMounted = true;
    async function getCommentData() {
      if (isMounted) {
        const data = await fetch(
          `${APIurl}/${version}/item/${commentID}.json`
        );
        const res = await data.json();
        setCommentData(res);
      }
    }
    getCommentData();
    return () => {
      setCommentData(undefined);
      isMounted = false;
    };
  }, []);
  return commentData && !commentData.deleted ? (
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
          userID={commentData.by}
          setShowUserModal={setShowUserModal}
        />
      </Modal>
      <TouchableOpacity
        onPress={() => setShowUserModal(true)}
      >
        <Text style={styles.storyUser}>
          {commentData.by} • {parseTime(commentData.time)}
        </Text>
      </TouchableOpacity>
      {commentData.text ? (
        <HTML
          html={commentData.text}
          onLinkPress={(_, href) => Linking.openURL(href)}
        />
      ) : (
        <></>
      )}
      {commentData.url ? (
        <Text
          style={styles.storyUrl}
          onPress={() => Linking.openURL(commentData.url)}
        >
          Open URL 🔗
        </Text>
      ) : (
        <></>
      )}
    </View>
  ) : (
    <Null />
  );
}

function Null() {
  return <></>;
}

function parseTime(UNIXtime) {
  return moment(UNIXtime * 1000).fromNow();
}

export default Comment;
