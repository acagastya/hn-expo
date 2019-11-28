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

function NewStories() {
  const [newStories, setNewStories] = useState([]);
  useEffect(() => {
    let isMounted = true;
    async function loadNewStories() {
      if (isMounted) {
        const data = await fetch(
          `${APIurl}/${version}/newstories.json`
        );
        const res = await data.json();
        setNewStories(res);
      }
    }
    loadNewStories();
    return () => {
      setNewStories([]);
      isMounted = false;
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>New stories</Text>
      </View>

      {newStories ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={newStories}
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

export default NewStories;
