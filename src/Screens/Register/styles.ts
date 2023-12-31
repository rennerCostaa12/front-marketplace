import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

export const Container = styled.ScrollView`
  flex: 1;
  padding: ${RFValue(20)}px ${RFValue(20)}px;
  background-color: ${Theme.colors.background_color};
`;

export const ContainerInputs = styled.View`
  width: 100%;
`;

export const ContentInput = styled.View`
  width: 100%;
  margin: ${RFValue(10)}px 0;
`;

export const ContentButton = styled.View`
  width: 100%;
  margin: ${RFValue(40)}px 0;
`;
