import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  Linking,
  FlatList,
  Platform,
  View,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import HTML from 'react-native-render-html';
import renderSeparator from '../renderSeparator';

import Comment from '../comment';

import {
  APIurl,
  version
} from '../../../assets/constants/API';
import styles from '../../../assets/styles';

function StoryModal({ storyData, setShowStoryModal }) {
  return (
    <SafeAreaView style={styles.storyModalContainer}>
      <Text style={styles.storyUser}>
        {storyData.by} • {parseTime(storyData.time)}
      </Text>
      <TouchableOpacity
        onPress={() => setShowStoryModal(false)}
      >
        <Text style={styles.storyTitle}>
          {storyData.title}
        </Text>
      </TouchableOpacity>

      {storyData.text ? (
        <HTML html={storyData.text} />
      ) : (
        <></>
      )}
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
      <View style={styles.commentSeperator} />
      <Text style={styles.commentStarter}>Comments</Text>
      {storyData.kids ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={storyData.kids}
          renderItem={comment => (
            <Comment commentID={comment.item} />
          )}
          keyExtractor={comment => {
            return String(comment);
          }}
          ItemSeparatorComponent={
            Platform.OS == 'ios' && renderSeparator
          }
        />
      ) : (
        <Null />
      )}
    </SafeAreaView>
  );
}

function Null() {
  return (
    <View>
      <Text>No comments so far.</Text>
    </View>
  );
}

function parseTime(UNIXtime) {
  return moment(UNIXtime * 1000).fromNow();
}

export default StoryModal;
