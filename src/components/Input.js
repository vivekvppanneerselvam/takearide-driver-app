import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const Input = (props) => {
  return (
    <View style={{ height: wp("20%"), marginBottom: 8 }}>
      <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>
        {props.label}
      </Text>

      <TouchableOpacity
        style={[{ flex: 1, paddingBottom: 5, justifyContent: "flex-end" },
        props.label == undefined
          ? {
            justifyContent: "flex-end"
          }
          : null
        ]}
      >
        <TextInput style={[{
          height: wp("11%"), fontSize: 18, fontWeight: "500", paddingVertical: 10,
          paddingLeft: 20, borderColor: "gray", borderWidth: 1, borderRadius: 4
        },
        props.widthHalf
          ? {
            width: wp("43%")
          }
          : null
        ]}
          onChangeText={text => props.onChangeText(text)}
          editable={props.editable}
          value={props.value}
          placeholder={props.placeholder}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Input;
