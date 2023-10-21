import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  position: relative;
`;

export const ContentIcon = styled.View`
  position: absolute;
  left: ${RFValue(5)}px;
  margin: ${RFValue(10)}px ${RFValue(5)}px;
`;

export const Input = styled.TextInput`
  width: ${RFValue(200)}px;
  border: ${RFValue(1)}px solid #8a8a8a;
  border-radius: ${RFValue(5)}px;
  padding: ${RFValue(5)}px;
  padding-left: ${RFValue(35)}px;
`;
