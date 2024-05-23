import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setFone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const auth = getAuth();
  const navigation = useNavigation();
  

  const handleSignUp = () => {
    if (name && cpf && telefone && email && password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Registro bem-sucedido, você pode lidar com o usuário registrado aqui
          const user = userCredential.user;
          console.log("Usuário registrado com sucesso:", user);
          setSnackbarVisible(true);

          //Aqui você adiciona a lógica para redirecionar o usuário para o Login
          navigation.navigate("Login");
        })
        .catch((error) => {
          // Se ocorrer um erro durante o registro, manipule-o aqui
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Erro ao registrar usuário:", errorMessage);
          setSnackbarVisible(false);
        });
    } else {
      console.error("Por favor, preencha todos os campos corretamente.");
      setSnackbarVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contIpt}>
        <TextInput
          label="Nome"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.contPF}>
        <TextInput
          label="CPF"
          value={cpf}
          onChangeText={setCpf}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.contFone}>
        <TextInput
          label="Telefone"
          value={telefone}
          onChangeText={setFone}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.contMail}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.contPass}>
        <TextInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
      </View>

      <View style={styles.contCfPas}>
        <TextInput
          label="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleSignUp} style={styles.button}>
          Próximo
        </Button>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        Usuário cadastrado com sucesso!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginBottom: 10,
    width: "90%",
  },
  button: {
    backgroundColor: "blue",
    width: "80%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  contIpt: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contPF: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contFone: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contMail: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contPass: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contCfPas: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignUpScreen;