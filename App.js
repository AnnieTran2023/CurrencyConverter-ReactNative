import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";

export default function App() {
  const [currency, setCurrency] = useState("");
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState();
  const [result, setResult] = useState();

  const myHeaders = new Headers();
  myHeaders.append("apikey", "xvm0qQZDZPVYgrFGAcdiU8ik1N8daqsT");

  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("https://api.apilayer.com/exchangerates_data/latest", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong " + response.status);
        }
        return response.json();
      })
      .then((responseData) => setRates(responseData.rates))
      .catch((error) => console.error("error", error));
  };

  const handleConvert = () => {
    const rate = rates[currency];
    console.log((amount / rate).toFixed(4));
    setResult((amount / rate).toFixed(1));
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>
        Currency Converter €
      </Text>
      <TextInput
        placeholder="Enter amount"
        onChangeText={(text) => setAmount(text)}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleConvert} style={styles.button}>
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity>
      {!isNaN(result) && (
        <Text style={{ margin: 15, fontSize: 18 }}>{result} €</Text>
      )}

      <Picker
        selectedValue={currency}
        onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}
        style={{ height: 50, width: 150 }}
      >
        {Object.keys(rates).map((currency) => (
          <Picker.Item label={currency} value={currency} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 180,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
    marginTop: 15,
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: "#00a8e8",
    height: 35,
    width: 90,
    borderRadius: 5,
    marginTop: 15,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
