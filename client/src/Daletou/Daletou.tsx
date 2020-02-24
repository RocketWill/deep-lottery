import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  View,
  Vibration,
  TouchableHighlight,
  Alert
} from "react-native";
import {
  Layout,
  Text,
  Card,
  ApplicationProvider,
  Button,
  Select
} from "@ui-kitten/components";
import {
  mapping,
  light as lightTheme,
  dark as darkTheme
} from "@eva-design/eva";
import RNPickerSelect from 'react-native-picker-select';


const axios = require("axios");

export default class Daletou extends Component {
  state = {
    numberSelection: [],
    drawnData: [],
    drawnNumber: []
  };

  componentDidMount() {
    axios
      .get("http://127.0.0.1:5000/drawn/list-all")
      // .then(data => JSON.parse(data))
      //.then(data => this.setState({drawnData: data}))
      .then(data => data["data"])
      .then(data => this.setState({ drawnData: data }))
      .catch(err => console.error(err));
  }
  getNumbers = (num: number) => {
    const numberList = [];
    const numberSelection = [...this.state.numberSelection];
    for (let i = 0; i < num; i++) {
      const text = (i + 1).toString();
      let appearance = "outline";
      if (numberSelection.includes(i + 1) && numberSelection.length < 7) {
        appearance = "filled";
      }
      numberList.push(
        <Button
          key={i}
          style={styles.button}
          size="tiny"
          appearance={appearance}
          onPress={() => this.numberPress(i + 1)}
        >
          {text}
        </Button>
      );
    }
    return numberList;
  };

  numberPress = (num: number) => {
    let numberSelection: number[] = [...this.state.numberSelection];
    if (numberSelection.includes(num)) {
      numberSelection = numberSelection.filter((e: number) => e !== num);
    } else if (numberSelection.length < 6 && !numberSelection.includes(num)) {
      numberSelection.push(num);
    }
    this.setState({ numberSelection });
  };

  getDrawnDateArr = (drawnData: any[]) => {
    if (drawnData.length === 0) return;
    const dateInfo = [];
    drawnData.map(data => {
      dateInfo.push({ label: data["drawn_date"], value: data["drawn_date"] });
    });
    return (
      <RNPickerSelect
            onValueChange={(value) => this.onValueChange(value)}
            items={dateInfo}
            placeholder={{
              label: '選擇開獎日期',
              value: null,
            }}
        />
    );
  };

  onValueChange = (value) => {
    if (value) {
      const selectedDrawData = this.state.drawnData.filter(data => data['drawn_date'] === value)[0];
      this.setState({drawnNumber: [...selectedDrawData['reg_num'], selectedDrawData['spe_num']]})
    }
  }

  startDrawn = () => {
    const {numberSelection, drawnNumber} = this.state;
    console.log(numberSelection.length);
    if (numberSelection.length < 6) {
      Alert.alert(
        '請選擇6個號碼',
        '',
        { cancelable: false }
      )
    }
    else if (drawnNumber.length < 1) {
      // Toast.show('請選擇欲對獎日期')
      Alert.alert(
        '請選擇欲對獎日期',
        '',
        { cancelable: false }
      )
    }
    else {
      let count = 0;
      numberSelection.map(num => {
        if (drawnNumber.includes(num)) {
          count+=1;
        }
      })
      if (count > 2) {
        Alert.alert(
          '中獎！',
          '',
          { cancelable: false }
        )
      }
      else {
        Alert.alert(
          '沒中',
          '',
          { cancelable: false }
        )
      }
    }
  }

  render() {

    console.log(this.state.drawnNumber)
    
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <ScrollView style={{ padding: 10 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20
            }}
          >
            <View style={styles.selector}>{this.getDrawnDateArr(this.state.drawnData)}</View>
            <View style={styles.container}>{this.getNumbers(49)}</View>
            <View style={{ marginTop: 30 }}>
              <Button onPress={()=> this.startDrawn()}>開始對獎</Button>
            </View>
            {this.state.drawnNumber.length>0 && <View><Text>{this.state.drawnNumber}</Text></View>}
            
          </View>
        </ScrollView>
      </ApplicationProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  button: {
    margin: 5,
    width: 46,
    height: 46,
    borderRadius: 30,
    padding: 0,
    fontSize: 1
  },
  selector: {
    width: 200,
    // height: 50,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#3366ff',
    borderRadius: 4,
    color: 'black',
    marginBottom: 20
  }
});
