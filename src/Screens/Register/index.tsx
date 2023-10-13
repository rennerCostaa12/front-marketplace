import {
  Container,
  ContentInput,
  ContentButton,
  ContainerInputs,
} from "./styles";

import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Camera as CameraExpo } from "expo-camera";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { RFValue } from "react-native-responsive-fontsize";

import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";

import { Button } from "../../Components/Button";
import { ButtonPhoto } from "../../Components/ButtonPhoto";
import { ModalSelectPhoto } from "../../Components/ModalSelectPhoto";
import { Input } from "../../Components/Input";
import { Camera } from "../../Components/Camera";
import { Loading } from "../../Components/Loading";

import { Api } from "../../Configs/Api";

import { DatasRegisterUser } from "./types";

const SchemaRegister = yup.object({
  username: yup.string().required("Campo nome de usuário é obrigatório"),
  email: yup
    .string()
    .email("Email inválido")
    .required("Campo email é obrigatório"),
  password: yup.string().required("Campo senha é obrigatório"),
  password_confirm: yup
    .string()
    .required("Campo confirmação de senha é obrigatório"),
  address: yup.string().required("Campo endereço é obrigatório"),
});

export const Register = () => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(SchemaRegister),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [startCamera, setStartCamera] = useState<boolean>(false);

  const [imgUser, setImgUser] = useState<string | null>(null);

  const [permission] = CameraExpo.useCameraPermissions();

  const { goBack } = useNavigation();

  const handleGetPermissionsCamera = async () => {
    try {
      if (!permission.granted) {
        let { status } = await CameraExpo.requestCameraPermissionsAsync();

        if (status !== "granted") {
          alert("Não tem permissão");
        }
      } else {
        setStartCamera(true);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImgUser(result.assets[0].uri);
      setShowModal(false);
    }
  };

  const handleRegisterUser = async (data: DatasRegisterUser) => {
    const { address, email, password, username, password_confirm } = data;

    if (!imgUser) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Escolha uma foto",
      });

      return;
    }

    if (password !== password_confirm) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "As senhas não são iguais!",
      });

      return;
    }

    try {
      setLoading(true);
      const responseRegisterUser = await Api.post("clients", {
        username,
        email,
        password,
        profile_img: imgUser,
        address,
      });

      if (responseRegisterUser.status) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Cadastra realizado com sucesso!",
          autoClose: 2000,
        });
        setTimeout(() => {
          goBack();
        }, 2000);
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: error.response.data.message,
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {startCamera ? (
        <Camera setImg={setImgUser} setVisibleCamera={setStartCamera} />
      ) : (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={RFValue(-200)}
          style={{
            flex: 1,
          }}
        >
          <Container>
            <Loading visible={loading} />
            <ContainerInputs>
              <ContentInput
                style={{
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <ButtonPhoto
                  urlImg={imgUser}
                  background="#FF1493"
                  enableIcon={true}
                  onPress={() => setShowModal(true)}
                />
              </ContentInput>

              <Input
                type="default"
                labelText="Nome de usuário"
                onChangeText={(value) => setValue("username", value)}
                error={errors.address?.message}
              />

              <Input
                type="default"
                labelText="Email"
                onChangeText={(value) => setValue("email", value)}
                error={errors.email?.message}
              />

              <Input
                type="password"
                labelText="Senha"
                onChangeText={(value) => setValue("password", value)}
                error={errors.password?.message}
              />

              <Input
                type="password"
                labelText="Confirmação de senha"
                onChangeText={(value) => setValue("password_confirm", value)}
                error={errors.password_confirm?.message}
              />

              <Input
                type="default"
                labelText="Endereço"
                onChangeText={(value) => setValue("address", value)}
                error={errors.address?.message}
              />
            </ContainerInputs>

            <ContentButton>
              <Button
                onPress={handleSubmit(handleRegisterUser)}
                color="#FF1493"
                textColor="#ffffff"
                textButton="Cadastrar"
              />
            </ContentButton>

            <ModalSelectPhoto
              handleGetPermissionsCamera={handleGetPermissionsCamera}
              handleOpenGallery={handleOpenGallery}
              title="Seleção de imagem"
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </Container>
        </KeyboardAvoidingView>
      )}
    </>
  );
};