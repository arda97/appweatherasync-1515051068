import React, { Component } from 'react';
import { AppRegistry, TextInput, View, Text, StyleSheet, Button, Alert } from 'react-native';
import Loader from './Loader';

export default class MainCuaca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      loading: false,
      forecast: {
        main: '-',
        description: '-',
        temp: 0,
        sunrise: 0,
        sunset: 0,
        pressure: 0,
        humidity: 0,
        sea_level: 0,
        grnd_level: 0,
        speed: 0,
      }
    };
  }

  getWeather=() => {
    this.setState({
      loading: true
    });
  const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.state.city + '&appid=fc8c704c9223ca9d5dd77f343bb18ebb&units=metric';
  fetch(url)
  .then((response) => response.json())
  .then((responseJson) => {
    if (responseJson.cod === 200) {
      this.setState({
            forecast: {
              main: responseJson.weather[0].main,
              description: responseJson.weather[0].description,
              temp: responseJson.main.temp,
              sunrise: this.timestampToTime(responseJson.sys.sunrise),
              sunset: this.timestampToTime(responseJson.sys.sunset),
              pressure: responseJson.main.pressure,
              humidity: responseJson.main.humidity,
              sea_level: responseJson.main.sea_level,
              grnd_level: responseJson.main.grnd_level,
              speed: responseJson.wind.speed
            },
            loading: false
        });
    } else {
      const warning = 'Maaf API Kota ' + this.state.city + ' Tidak Tersedia';
      Alert.alert(warning);
      this.setState({
            forecast: {
              main: '-',
              description: '-',
              temp: 0,
              sunrise: '-',
              sunset: '-',
              pressure: '-',
              humidity: '-',
              sea_level: '-',
              grnd_level: '-',
              speed: '-'
            },
            loading: false
        });
    }
    });
  }

  timestampToTime=(timestamp) => {
    var date = new Date(timestamp*1000);
    var hours = date.getHours();
    var minutes = '0' + date.getMinutes();
    var seconds = '0' + date.getSeconds();

    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
  }

  render() {
    return (
        <View style={styles.container}>
        <Loader
          loading={this.state.loading}
        />
        <View style={styles.headInput}>
        <Text style={styles.title}>Masukkan Nama Kota Dibawah</Text>
          <TextInput
            onChangeText={(city) => this.setState({ city })}
          />
          <Button
              onPress={() => this.getWeather()}
              title="Tampilkan Cuaca"
              color="#01579B"
          />
        </View>

          <View style={styles.result}>
          <View style={styles.boxUp}>

            <View style={styles.button}>
            <View style={styles.iconUp}>
              <Text> T </Text>
           </View>
              <Text> Wind Speed : { this.state.forecast.speed} </Text>
            </View>


        <View style={styles.button}>
        <View style={styles.iconUp}>
          <Text> T </Text>
       </View>
          <Text> Temp : { this.state.forecast.temp} </Text>
        </View>
      </View>
      <View style={styles.boxUp}>
        <View style={styles.button}>
        <View style={styles.iconUp}>
          <Text> T </Text>
       </View>
          <Text> Main : { this.state.forecast.main} </Text>
        </View>
        <View style={styles.button}>
        <View style={styles.iconUp}>
          <Text> T </Text>
       </View>
          <Text> Main Desc : { this.state.forecast.description} </Text>
        </View>
      </View>
      <View style={styles.boxUp}>
        <View style={styles.button}>
        <View style={styles.iconUp}>
          <Text> T </Text>
       </View>
          <Text> Sunrise : { this.state.forecast.sunrise} </Text>
        </View>
        <View style={styles.button}>
        <View style={styles.iconUp}>
          <Text> T </Text>
       </View>
          <Text> Sunset : { this.state.forecast.sunset} </Text>
        </View>
      </View>
      <View style={styles.boxUp}>
        <View style={styles.button}>
        <View style={styles.iconUp}>
          <Text> T </Text>
       </View>
          <Text> Pressure : { this.state.forecast.pressure} </Text>
        </View>
        <View style={styles.button}>
        <View style={styles.iconUp}>
          <Text> T </Text>
       </View>
          <Text> Humidity : { this.state.forecast.humidity} </Text>
        </View>
      </View>
      <View style={styles.boxUp}>
        <View style={styles.button}>
        <View style={styles.iconUp}>
          <Text> T </Text>
       </View>
          <Text> Sea Level : { this.state.forecast.sea_level} </Text>
        </View>
        <View style={styles.button}>
        <View style={styles.iconUp}>
          <Text> T </Text>
       </View>
          <Text> Ground Level : { this.state.forecast.grnd_level} </Text>
        </View>
      </View>
      </View>
</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    marginLeft: 20,
    marginRight: 20
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    marginBottom: 20,
    marginRight: 20
  },
  boxUp: {
    flex: 0.4,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    marginRight: 10,
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  iconUp: {
    alignItems: 'center',
    backgroundColor: '#feb401',
    borderColor: '#feaf12',
    borderWidth: 1,
    justifyContent: 'center',
    height: 40,
    width: 30,
  },
  result: {
    marginTop: 30,
  },
  headInput: {
    backgroundColor: '#81D4FA',
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20
  },
  icon: {
    tintColor: '#fff',
    height: 20,
    width: 20,
  }
});
AppRegistry.registerComponent('AppForm2', () => MainCuaca);
