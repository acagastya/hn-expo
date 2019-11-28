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

function BestStories() {
  const [bestStories, setBestStories] = useState([]);
  useEffect(() => {
    let isMounted = true;
    async function loadBestStories() {
      if (isMounted) {
        const data = await fetch(
          `${APIurl}/${version}/beststories.json`
        );
        const res = await data.json();
        setBestStories(res);
      }
    }
    loadBestStories();
    return () => {
      setBestStories([]);
      isMounted = false;
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Best stories</Text>
      </View>

      {bestStories ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={bestStories}
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
  return <Text>Loading...</Text>;
}

export default BestStories;
