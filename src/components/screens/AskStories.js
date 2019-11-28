import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  Platform,
  Text,
  View
} from 'react-native';

import fetch from 'node-fetch';

import styles from '../../../assets/styles';
import Story from '../story';

import {
  APIurl,
  version
} from '../../../assets/constants/API';

import renderSeparator from '../renderSeparator';

function AskStories() {
  const [askStories, setAskStories] = useState([]);
  useEffect(() => {
    let isMounted = true;
    async function loadAskStories() {
      if (isMounted) {
        const data = await fetch(
          `${APIurl}/${version}/askstories.json`
        );
        const res = await data.json();
        setAskStories(res);
      }
    }
    loadAskStories();
    return () => {
      setAskStories([]);
      isMounted = false;
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Ask stories</Text>
      </View>

      {askStories ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={askStories}
          renderItem={story => (
            <Story storyID={story.item} />
          )}
          keyExtractor={story => String(story)}
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
  return <></>;
}

export default AskStories;
