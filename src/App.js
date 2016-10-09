import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Switch
} from 'react-native';
import { TabViewAnimated, TabViewPage } from 'react-native-tab-view';

var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import DrawerLayout from 'react-native-drawer-layout';
import PulseLoader from './PulseLoader';

const ALBUMS = {
  'Abbey Road': require('./img/album-art-1.jpg'),
  'Bat Out of Hell': require('./img/album-art-2.jpg'),
  Homogenic: require('./img/album-art-3.jpg'),
  'Number of the Beast': require('./img/album-art-4.jpg'),
  'It\'s Blitz': require('./img/album-art-5.jpg'),
  'The Man-Machine': require('./img/album-art-6.jpg'),
  'The Score': require('./img/album-art-7.jpg'),
  'Lost Horizons': require('./img/album-art-8.jpg'),
};

class App extends Component {
  state = {
    index: 0,
    routes: Object.keys(ALBUMS).map(key => ({key})),
    activeDrawer: null,
    loaded: false
  };

  _buildCoverFlowStyle = ({ layout, position, route, navigationState }) => {
    const { width } = layout;
    const { routes } = navigationState;
    const currentIndex = routes.indexOf(route);
    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [ -1, ...routes.map((x, i) => i) ];
    const translateOutputRange = inputRange.map(i => {
      return width * (currentIndex - i) - ((width / 3.25) * (currentIndex - i));
    });
    const scaleOutputRange = inputRange.map(i => {
      if (currentIndex === i) {
        return 1;
      } else {
        return 0.7;
      }
    });
    const opacityOutputRange = inputRange.map(i => {
      if (currentIndex === i) {
        return 1;
      } else {
        return 0.3;
      }
    });

    const translateX = position.interpolate({
      inputRange,
      outputRange: translateOutputRange,
    });
    const scale = position.interpolate({
      inputRange,
      outputRange: scaleOutputRange,
    });
    const opacity = position.interpolate({
      inputRange,
      outputRange: opacityOutputRange,
    });

    return {
      width,
      transform: [
        { translateX },
        { scale },
      ],
      opacity,
    };
  };

  _handleChangeTab = (index) => {
    this.setState({
      index,
    });
  };

  _renderScene = ({ route }) => {
    return (
      <View style={styles.page}>
        <View style={styles.album}>
          <Image source={ALBUMS[route.key]} style={styles.cover} />
        </View>
        <View style={styles.float}>
          <TouchableOpacity style={{flex: 1}}>
            <View style={styles.roundButton}>
              <Icon name="play-arrow" size={27} color={'#fff'}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>{route.key}</Text>
          <Text style={styles.subtitle}>Lorem ipsum dolor</Text>
          <Text style={styles.description} numberOfLines={3}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea</Text>
          <View style={styles.action}>
            <TouchableOpacity style={{flex: 1}}>
              <View style={styles.button}>
                <Icon name="code" size={20} color={'#fff'}/>
                <Text style={styles.buttonText}>View Code</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1}}>
              <View style={styles.button}>
                <Icon name="play-arrow" size={20} color={'#fff'}/>
                <Text style={styles.buttonText}>View Demo</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  _renderPage = (props) => {
    return (
      <TabViewPage
        {...props}
        style={this._buildCoverFlowStyle(props)}
        renderScene={this._renderScene}
      />
    );
  };

  _renderLeftDrawer = () => {
    return (
      <View style={{flex: 1, backgroundColor: '#1d243c'}}>
        <ScrollView style={{flex: 1}}>
          <View style={{padding: 20, paddingBottom: 15}}>
            <Text style={{color: '#fff'}}>Sort By</Text>
          </View>
          <TouchableOpacity style={{flex: 1, padding: 20, paddingVertical: 15}}>
            <View style={styles.left}>
              <Icon name="star" size={20} color={'#fff'}/>
              <Text style={styles.heading}>Most Popular</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  _renderRightDrawer = () => {
    return (
      <View style={{flex: 1, backgroundColor: '#1d243c'}}>
        <ScrollView style={{flex: 1}}>
          <View style={{padding: 20, paddingBottom: 15}}>
            <Text style={{color: '#fff'}}>Filter By Category</Text>
          </View>
          <View style={{flex: 1, padding: 20, paddingVertical: 15}}>
            <View style={styles.left}>
              <Switch />
              <Text style={styles.heading}>All Categories</Text>
            </View>
          </View>
          <View style={{flex: 1, padding: 20, paddingVertical: 15}}>
            <View style={styles.left}>
              <Switch />
              <Text style={styles.heading}>UI Framework</Text>
            </View>
          </View>
          <View style={{flex: 1, padding: 20, paddingVertical: 15}}>
            <View style={styles.left}>
              <Switch />
              <Text style={styles.heading}>Material UI</Text>
            </View>
          </View>
          <View style={{flex: 1, padding: 20, paddingVertical: 15}}>
            <View style={styles.left}>
              <Switch />
              <Text style={styles.heading}>UI Component</Text>
            </View>
          </View>
          <View style={{flex: 1, padding: 20, paddingVertical: 15}}>
            <View style={styles.left}>
              <Switch />
              <Text style={styles.heading}>UI Example</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loaded: true
      });
    }, 4000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./img/background.png')} style={styles.bg} resizeMode={'cover'} />
          <DrawerLayout
            ref={(leftDrawer) => this.leftDrawer = leftDrawer}
            onDrawerOpen={() => this.setState({activeDrawer: 'left'})}
            onDrawerClose={() => this.setState({activeDrawer: null})}
            drawerLockMode={(this.state.activeDrawer == 'left' || !this.state.activeDrawer) ? 'unlocked' : 'locked-closed'}
            drawerWidth={280}
            drawerPosition={DrawerLayout.positions.Left}
            renderNavigationView={() => this._renderLeftDrawer()}>

            <DrawerLayout
              ref={(rightDrawer) => this.rightDrawer = rightDrawer}
              onDrawerOpen={() => this.setState({activeDrawer: 'right'})}
              onDrawerClose={() => this.setState({activeDrawer: null})}
              drawerLockMode={(this.state.activeDrawer == 'right' || !this.state.activeDrawer) ? 'unlocked' : 'locked-closed'}
              drawerWidth={280}
              drawerPosition={DrawerLayout.positions.Right}
              renderNavigationView={() => this._renderRightDrawer()}>

              
              <View style={styles.toolbar}>
                <TouchableOpacity style={{flex: 2}} onPress={() => this.leftDrawer.openDrawer()}>
                  <View style={styles.left}>
                    <Icon name="star" size={20} color={'#fff'}/>
                    <Text style={styles.heading}>Most Popular</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1}} onPress={() => this.rightDrawer.openDrawer()}>
                  <View style={styles.right}>
                    <Icon name="filter-list" size={20} color={'#fff'}/>
                    <Text style={styles.heading}>Filter</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {this.state.loaded ?
                <View style={{flex: 1}}> 
                  <TabViewAnimated
                    style={[ styles.container, this.props.style ]}
                    navigationState={this.state}
                    renderScene={this._renderPage}
                    onRequestChangeTab={this._handleChangeTab}
                  />
                  <View style={styles.footer}>
                    <Text style={styles.footerText}>{this.state.index + 1}/{this.state.routes.length}</Text>
                  </View>
                </View>
                :
                <PulseLoader
                  style={{marginTop: -60}}
                  avatar={require('./img/awesome.png')}
                />}

            </DrawerLayout>

          </DrawerLayout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height
  },
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  album: {
    backgroundColor: '#000',
    width: 250,
    height: 160,
    elevation: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
    shadowOffset: {
      height: 8,
    },
  },
  card: {
    backgroundColor: '#323b66',
    width: 250,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    marginBottom: 60
  },
  cover: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: 250,
    height: 160,
  },
  title: {
    marginHorizontal: 16,
    marginTop: 20,
    color: '#fff',
    fontWeight: '900',
    textAlign: 'center'
  },
  subtitle: {
    color: 'rgba(255,255,255,.5)',
    marginHorizontal: 16,
    fontSize: 10,
    textAlign: 'center'
  },
  description: {
    marginHorizontal: 16,
    marginTop: 10,
    fontSize: 11,
    color: '#fff',
    textAlign: 'center'
  },
  action: {
    marginTop: 10,
    flexDirection: 'row'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: 'rgba(255,255,255,.3)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fc6e9c',
    fontSize: 11,
    marginLeft: 5
  },
  float: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    zIndex: 20,
  },
  roundButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f63b43',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    textAlign: 'center',
    color: '#fc6e9c',
    fontSize: 11
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 20
  },
  heading: {
    color: '#fff',
    fontWeight: '900',
    marginLeft: 5
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  right: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export default App;