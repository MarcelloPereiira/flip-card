import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Image
} from "react-native";

export default class App extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"]
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"]
    });
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    });
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }

  render() {
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.flipCard()}>
          <View>
            <Animated.View
              style={[
                styles.flipCard,
                frontAnimatedStyle,
                { opacity: this.frontOpacity }
              ]}
            >
              <Image
                source={require("./assets/back.png")}
                style={styles.image}
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.flipCard,
                styles.flipCardBack,
                backAnimatedStyle,
                { opacity: this.backOpacity }
              ]}
            >
              <Image
                source={require("./assets/front.png")}
                style={styles.image}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  flipCard: {
    backfaceVisibility: "hidden"
  },
  flipCardBack: {
    position: "absolute",
    top: 0
  },
  flipText: {
    color: "#ccc"
  },
  image: {
    width: 306,
    height: 434
  }
});
