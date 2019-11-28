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

function TopStories() {
  const [topStories, setTopStories] = useState([]);
  useEffect(() => {
    let isMounted = true;
    async function loadTopStories() {
      if (isMounted) {
        const data = await fetch(
          `${APIurl}/${version}/topstories.json`
        );
        const res = await data.json();
        setTopStories(res);
      }
    }
    loadTopStories();
    return () => {
      setTopStories([]);
      isMounted = false;
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Top stories</Text>
      </View>

      {topStories ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={topStories}
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

export default TopStories;
