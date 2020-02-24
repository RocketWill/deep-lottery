import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  View,
  Vibration,
  TouchableHighlight,
  SafeAreaView
} from "react-native";
import { Layout, Text, Card, ApplicationProvider } from "@ui-kitten/components";
import * as Haptics from "expo-haptics";
import {
  mapping,
  light as lightTheme,
  dark as darkTheme
} from "@eva-design/eva";

const daletouImage = require("../assets/gamesIcon/daletou.png");
const weilicai = require("../assets/gamesIcon/weilicai.png");
const jincai539 = require("../assets/gamesIcon/jincai539.png");
const bingobingo = require("../assets/gamesIcon/bingobingo.png");
const sanxingcai = require("../assets/gamesIcon/sanxingcai.png");
const sixingcai = require("../assets/gamesIcon/sixingcai.png");

export default class GameSelect extends Component {
  getHeader = image => <Image style={styles.headerImage} source={image} />;
  handleCardClick = () => {
    Haptics.selectionAsync();
    this.props.navigation.navigate('大樂透', { name: 'Jane' })
  };
  render() {
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        
          <View style={{ flex: 1, backgroundColor:"#fff" }}>
            {/* <View style={styles.header}>
              <StatusBar hidden={false} />
              <Text style={styles.headerText}>請選擇遊戲</Text>
            </View> */}
            <ScrollView>
              <Layout style={styles.container}>
                <Layout
                  style={{ ...styles.layout, marginLeft: 20, marginRight: 10 }}
                  level="1"
                >
                  <Card
                    style={styles.card}
                    header={() => this.getHeader(daletouImage)}
                    onPress={() => this.handleCardClick()}
                  >
                    <Text style={styles.cardText}>大樂透</Text>
                  </Card>

                  <Card
                    style={styles.card}
                    header={() => this.getHeader(jincai539)}
                    onPress={() => this.handleCardClick()}
                  >
                    <Text style={styles.cardText}>今彩 539</Text>
                  </Card>

                  <Card
                    style={styles.card}
                    header={() => this.getHeader(sanxingcai)}
                    onPress={() => this.handleCardClick()}
                  >
                    <Text style={styles.cardText}>三星彩</Text>
                  </Card>
                </Layout>

                <Layout
                  style={{ ...styles.layout, marginRight: 20, marginLeft: 10 }}
                  level="2"
                >
                  <Card
                    style={styles.card}
                    header={() => this.getHeader(weilicai)}
                    onPress={() => this.handleCardClick()}
                  >
                    <Text style={styles.cardText}>威力彩</Text>
                  </Card>
                  <Card
                    style={styles.card}
                    header={() => this.getHeader(bingobingo)}
                    onPress={() => this.handleCardClick()}
                  >
                    <Text style={styles.cardText}>賓果賓果</Text>
                  </Card>
                  <Card
                    style={styles.card}
                    header={() => this.getHeader(sixingcai)}
                    onPress={() => this.handleCardClick()}
                  >
                    <Text style={styles.cardText}>四星彩</Text>
                  </Card>
                </Layout>
              </Layout>
            </ScrollView>
          </View>
        
      </ApplicationProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginTop: 10
  },
  layout: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#ffffff"
  },
  card: {
    padding: 5,
    margin: 10,
    width: "100%"
  },
  cardText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16
  },
  headerImage: {
    flex: 0,
    height: 150,
    width: "100%",
    // maxWidth: 175,
    padding: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    height: 80,
    backgroundColor: "rgba(0,0,0,0)",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700"
  },
  ourContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  safeArea: {
    flex: 1
  }
});
