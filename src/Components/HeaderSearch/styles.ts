import { styled } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${RFValue(20)}px ${RFValue(15)}px;
  background-color: ${Theme.colors.background_color};
  margin-top: ${RFValue(20)}px;
`;

export const ContentInputSearch = styled.View``;

export const ContentIcons = styled.View`
  flex-direction: row;
  gap: ${RFValue(15)}px;
`;

export const InputSearch = styled.TextInput`
  width: ${RFValue(240)}px;
  border: ${RFValue(1)}px solid ${Theme.colors.gray_dark};
  border-radius: ${RFValue(5)}px;
  padding: ${RFValue(8)}px;
  padding-left: ${RFValue(35)}px;
`;

export const ContentSearch = styled.View`
  position: absolute;
  left: ${RFValue(5)}px;
  margin: ${RFValue(13)}px ${RFValue(5)}px;
`;

export const ButtonIcon = styled.TouchableOpacity``;
