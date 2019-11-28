import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  headingContainer: {
    paddingTop: 20,
    paddingBottom: 10
  },
  heading: {
    fontSize: 32,
    fontWeight: '800'
  },
  seperator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#777'
  },
  commentSeperator: {
    marginTop: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#777'
  },
  storyComment: {
    marginBottom: 5
  },
  storyContainer: {
    marginTop: 10,
    marginBottom: 10
  },
  storyTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10
  },
  storyUrl: {
    marginBottom: 5
  },
  storyUser: {
    color: 'rgb(147,147,149)',
    marginBottom: 5
  },
  userModalName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
    color: 'white'
  },
  userModalAbout: {
    color: 'white',
    marginBottom: 5
  },
  userModalContainer: {
    backgroundColor: '#777',
    borderRadius: 5,
    padding: 20
  },
  userModalKarma: {
    marginTop: 5,
    color: 'white'
  },
  modelContainer: {
    flex: 1,
    padding: 20,
    marginHorizontal: 20,
    justifyContent: 'center'
  },
  storyModalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 20
  },
  commentStarter: {
    marginTop: 20,
    fontWeight: '700',
    fontSize: 20
  }
});

export default styles;
