import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";

export default class Boiler extends Component {
  constructor() {
    super();
    this.state = {
      status: "idle",
      number: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Call Feature Placeholder</Text>
        <Text style={styles.info}>Call features are not available in Expo Go.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    color: "#888",
  },
});

var glyphMap = {
  speaker: "\uE600",
  "mic-mute": "\uE601",
  keypad: "\uE602",
  "snd-mute": "\uE603",
  phone: "\uE604",
  hangup: "\uE605",
  "flip-camera": "\uE606"
};

if (Platform.OS == "ios") {
  var Icon = createIconSet(glyphMap, "icomoon");
} else {
  Icon = createIconSet(glyphMap, "Custom");
}

var currentCallId,
  uaInstance,
  number = "",
  settings_p2p = false,
  settings_video = false,
  micMuted = false,
  loudSpeaker = false,
  sendVideo = true,
  camera = "front";

 DeviceEventEmitter.addListener (removed for Expo compatibility)("CallRinging", callId => {
  console.log("Call ringing");
});

 DeviceEventEmitter.addListener (removed for Expo compatibility)("CallConnected", callId => {
  console.log("Call connected");
  uaInstance.callConnected(callId);
});

 DeviceEventEmitter.addListener (removed for Expo compatibility)("CallFailed", (callId, code, reason) => {
  console.log("Call failed. Code " + code + " Reason " + reason);
  uaInstance.setModalText("Call failed", "idle");
});

 DeviceEventEmitter.addListener (removed for Expo compatibility)("CallDisconnected", callId => {
  console.log("Call disconnected");
  uaInstance.callDisconnected(callId);
});

 DeviceEventEmitter.addListener (removed for Expo compatibility)("IncomingCall", incomingCall => {
  console.log("Inbound call");
  currentCallId = incomingCall.callId;
  uaInstance.setModalText(
    "Inbound call from " + incomingCall.from,
    "inboundcall"
  );
});

export default class Boiler extends Component {
  constructor() {
    super();
    this.state = {
      modalText: "",
      isModalOpen: false,
      status: "idle"
    };
     VoxImplant.SDK (removed for Expo compatibility).switchToCamera(camera);
  }

  componentDidMount() {
    uaInstance = this;
    this._thisNumber.focus();
  }

  updateNumber(text) {
    number = text;
    this._thisNumber.setNativeProps({ text: text });
  }

  onSubmit(event) {
    this.makeCall();
  }

  makeCall(event) {
    console.log("calling " + number);
      VoxImplant.SDK (removed for Expo compatibility).createCall(  Disabled for Expo Go
      number,
      settings_video,
      null,
      function(callId) {
        currentCallId = callId;
        if (settings_p2p)
           VoxImplant.SDK (removed for Expo compatibility).startCall(callId, { "X-DirectCall": "true" });
        else  VoxImplant.SDK (removed for Expo compatibility).startCall(callId);
        this.setState(
          update(this.state, {
            $merge: {
              status: "calling"
            }
          })
        );
      }.bind(this)
    );
  }

  cancelCall(event) {
    console.log("Cancel call");
     VoxImplant.SDK (removed for Expo compatibility).disconnectCall(currentCallId);
  }

  answerCall() {
     VoxImplant.SDK (removed for Expo compatibility).answerCall(currentCallId);
    this.closeModal(true);
  }

  rejectCall() {
     VoxImplant.SDK (removed for Expo compatibility).declineCall(currentCallId);
    this.closeModal(true);
  }

  callConnected(callId) {
    this.setState(
      update(this.state, {
        $merge: {
          status: "connected"
        }
      })
    );
  }

  callDisconnected(callId) {
    number = "";
    loudSpeaker = false;
    micMuted = false;
    sendVideo = true;
     VoxImplant.SDK (removed for Expo compatibility).setUseLoudspeaker(loudSpeaker);
     VoxImplant.SDK (removed for Expo compatibility).setMute(micMuted);
     VoxImplant.SDK (removed for Expo compatibility).sendVideo(sendVideo);
    this.setState(
      update(this.state, {
        $merge: {
          status: "idle"
        }
      })
    );
    this.closeModal(true);
  }

  setModalText(text, status) {
    this.setState(
      update(this.state, {
        $merge: {
          modalText: text,
          status: typeof status != "undefined" ? status : this.state.status,
          isModalOpen: true
        }
      })
    );
  }

  onPressBackdrop() {
    if (this.state.status != "inboundcall") this.closeModal();
  }

  switchKeypad() {
    if (this.state.status == "connected") {
      this.setState(
        update(this.state, {
          $merge: {
            status: "connected_keypad"
          }
        })
      );
    } else {
      this.setState(
        update(this.state, {
          $merge: {
            status: "connected"
          }
        })
      );
    }
  }

  switchSpeaker() {
    if (!loudSpeaker) loudSpeaker = true;
    else loudSpeaker = false;
     VoxImplant.SDK (removed for Expo compatibility).setUseLoudspeaker(loudSpeaker);
  }

  switchMute() {
    if (!micMuted) micMuted = true;
    else micMuted = false;
     VoxImplant.SDK (removed for Expo compatibility).setMute(micMuted);
  }

  _keypadPressed(value) {
    console.log("Send DTMF " + value + " for call id " + currentCallId);
     VoxImplant.SDK (removed for Expo compatibility).sendDTMF(currentCallId, value);
  }

  videoSwitch(value) {
    settings_video = value;
    setTimeout(() => {
      this.forceUpdate();
    }, 200);
  }

  toggleVideo() {
    if (!sendVideo) sendVideo = true;
    else sendVideo = false;
     VoxImplant.SDK (removed for Expo compatibility).sendVideo(sendVideo);
  }

  switchCamera() {
    if (camera == "front") {
       VoxImplant.SDK (removed for Expo compatibility).switchToCamera("back");
      camera = "back";
    } else {
       VoxImplant.SDK (removed for Expo compatibility).switchToCamera("front");
      camera = "front";
    }
  }

  closeModal(force) {
    if (Platform.OS === 'android') {
      Portal.closeModal(tag);
    }
    if (this.state.status != "inboundcall" || force === true) {
      this.setState(
        update(this.state, {
          $merge: {
            isModalOpen: false,
            status: force === true ? this.state.status : "idle"
          }
        })
      );
    }
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    },
    headerLeft: null
  };

  render() {
    var button,
      modalButtons = <View style={styles.modalButtons} />,
      settingsTable,
      keypad,
      videoPanel,
      callingText,
      numberInput,
      flipButton;

    if (settings_video && this.state.status != "connected_keypad")
      videoPanel = (
        <View style={styles.videopanel}>
          < VoxImplant.RemoteView  Disabled for Expo Go style={styles.remotevideo} />
          < VoxImplant.Preview  Disabled for Expo Go style={styles.selfview} />
        </View>
      );

    if (settings_video)
      flipButton = (
        <View style={{ width: 70, height: 70, marginLeft: 10 }}>
          <Icon.Button
            name="flip-camera"
            style={[styles.icon, styles.keypad_icon, { alignSelf: "center" }]}
            size={13}
            color="#2B2B2B"
            backgroundColor="transparent"
            onPress={() => this.switchCamera()}
            iconStyle={{ marginLeft: 9 }}
          />
        </View>
      );

    if (this.state.status == "idle") {
      numberInput = (
        <TextInput
          style={[styles.forminput, styles.numberinput]}
          onChangeText={e => this.updateNumber(e)}
          placeholder="User to call"
          initialValue={number}
          onSubmitEditing={e => this.onSubmit(e)}
          ref={component => (this._thisNumber = component)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      );

      settingsTable = (
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={styles.settings_table}>
            <View style={styles.settings_switch}>
              <Text style={styles.settings_label}>Peer-to-peer</Text>
              <ColorSwitch
                defaultValue={settings_p2p}
                valueUpdate={value => {
                  settings_p2p = value;
                }}
              />
            </View>
            <View style={styles.settings_switch}>
              <Text style={styles.settings_label}>Video</Text>
              <ColorSwitch
                defaultValue={settings_video}
                valueUpdate={e => this.videoSwitch(e)}
              />
            </View>
          </View>
        </View>
      );

      button = (
        <View style={{ width: 70, height: 70, alignSelf: "center" }}>
          <Icon.Button
            name="phone"
            style={[styles.icon, styles.phone_icon]}
            size={20}
            backgroundColor="transparent"
            onPress={e => this.makeCall(e)}
            iconStyle={{ marginLeft: 7 }}
          />
        </View>
      );
    } else if (
      this.state.status == "calling" ||
      this.state.status == "connected"
    ) {
      if (this.state.status == "calling")
        callingText = (
          <Text style={styles.callingLabel}>Calling {number}...</Text>
        );
      else callingText = <Text style={styles.callingLabel}>Connected</Text>;

      button = (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginBottom: 20
            }}
          >
            <ToggleButton
              onPress={() => this.switchMute()}
              name="mic-mute"
              style={[styles.icon, styles.keypad_icon]}
              size={15}
              color="#2B2B2B"
              pressed={micMuted}
            />
            <View style={{ width: 70, height: 70, marginHorizontal: 10 }}>
              <Icon.Button
                name="keypad"
                style={[
                  styles.icon,
                  styles.keypad_icon,
                  { alignSelf: "center" }
                ]}
                size={15}
                color="#2B2B2B"
                backgroundColor="transparent"
                onPress={() => this.switchKeypad()}
                iconStyle={{ marginLeft: 9 }}
              />
            </View>

            <ToggleButton
              onPress={() => this.switchSpeaker()}
              name="speaker"
              style={[styles.icon, styles.keypad_icon]}
              size={20}
              color="#2B2B2B"
              pressed={loudSpeaker}
            />
            {flipButton}
          </View>
          <View style={{ flexDirection: "column", alignSelf: "center" }}>
            <View style={{ width: 70, height: 70 }}>
              <Icon.Button
                name="hangup"
                style={[styles.icon, styles.cancel_icon]}
                size={5}
                color="#FFFFFF"
                backgroundColor="transparent"
                onPress={e => this.cancelCall(e)}
                iconStyle={{ marginLeft: 8 }}
              />
            </View>
          </View>
        </View>
      );
    } else if (this.state.status == "connected_keypad") {
      button = (
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center"
          }}
        >
          <View style={{ width: 70, height: 70 }}>
            <Icon.Button
              name="hangup"
              style={[styles.icon, styles.cancel_icon]}
              size={5}
              color="#FFFFFF"
              backgroundColor="transparent"
              onPress={e => this.cancelCall(e)}
              iconStyle={{ marginLeft: 8 }}
            />
          </View>
        </View>
      );

      settingsTable = (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Text style={{ flex: 1, alignSelf: "flex-start" }} />
          <Text onPress={() => this.switchKeypad()} style={styles.hidekeypad}>
            Hide
          </Text>
        </View>
      );

      if (this.state.status == "connected_keypad")
        keypad = <Keypad keyPressed={e => this._keypadPressed(e)} />;
    } else if (this.state.status == "inboundcall") {
      modalButtons = (
        <View style={styles.modalButtons}>
          <Button onPress={e => this.answerCall(e)} style={styles.callbutton}>
            Answer
          </Button>
          <Button onPress={e => this.rejectCall(e)} style={styles.cancelbutton}>
            Reject
          </Button>
        </View>
      );
    }

    return (
      <View style={styles.useragent}>
        <View
          style={{
            backgroundColor: "#16a085",
            height: 64,
            justifyContent: "flex-end"
          }}
        >
          <Text
            style={{ color: "#FFFFFF", alignSelf: "center", marginBottom: 10 }}
          >
            Logged in
          </Text>
        </View>
        {videoPanel}
        {callingText}
        {numberInput}
        {keypad}
        {button}
        {settingsTable}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalOpen}
          onRequestClose={() => {}}
        >
          <TouchableHighlight
            onPress={() => this.closeModal()}
            style={styles.container}
          >
            <View style={[styles.container, styles.modalBackground]}>
              <View
                style={[
                  styles.innerContainer,
                  styles.innerContainerTransparent
                ]}
              >
                <Text>{this.state.modalText}</Text>
                {modalButtons}
              </View>
            </View>
          </TouchableHighlight>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch"
  },
  modalBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20
  },
  innerContainer: {
    borderRadius: 10
  },
  innerContainerTransparent: {
    backgroundColor: "#fff",
    padding: 20
  },
  forminput: {
    borderRadius: 4,
    padding: 5,
    marginBottom: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5
  },
  button: {
    margin: 15
  },
  buttonText: {
    color: "#007aff",
    fontFamily: ".HelveticaNeueInterface-MediumP4",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center"
  },
  useragent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexDirection: "column"
  },
  selfview: {
    position: "relative",
    marginTop: -80,
    left: 140,
    width: 80,
    height: 60,
    borderColor: "#007AFF",
    borderWidth: 1,
    alignSelf: "center",
    backgroundColor: "#000000"
  },
  remotevideo: {
    width: 400,
    height: 430,
    borderColor: "#FF1300",
    borderWidth: 1,
    alignSelf: "center",
    backgroundColor: "#000000"
  },
  videopanel: {
    marginBottom: 15
  },
  numberinput: {
    margin: 10
  },
  callingLabel: {
    alignSelf: "center",
    fontSize: 18,
    marginVertical: 20
  },
  callbutton: {
    alignSelf: "center",
    borderColor: "#4CD964",
    borderWidth: 1,
    color: "#4CD964",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  cancelbutton: {
    alignSelf: "center",
    borderColor: "#FF3B30",
    borderWidth: 1,
    color: "#FF3B30",
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 2
  },
  modalButtons: {
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  settings_switch: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
  },
  settings_label: {
    margin: 5
  },
  settings_table: {
    borderTopWidth: 0.5,
    borderColor: "#000000",
    marginTop: 15,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  icon: {
    width: 55,
    height: 50,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 20
  },
  phone_icon: {
    width: 55,
    height: 55,
    alignSelf: "center",
    borderColor: "#4CD964",
    backgroundColor: "#4CD964",
    marginHorizontal: 10
  },
  keypad_icon: {
    borderColor: "#2B2B2B",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 10,
    borderWidth: 0.5
  },
  cancel_icon: {
    width: 55,
    height: 55,
    alignSelf: "center",
    borderColor: "#FF3B30",
    backgroundColor: "#FF3B30"
  },
  hidekeypad: {
    flex: 1,
    paddingVertical: 15,
    justifyContent: "center",
    color: "#007aff",
    fontFamily: ".HelveticaNeueInterface-MediumP4",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center"
  }
});

 AppRegistry.registerComponent (removed for Expo compatibility)("Boiler", () => Boiler);
