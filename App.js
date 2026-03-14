import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

export default function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("http://10.12.62.216:3545/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer || JSON.stringify(data));
    } catch (error) {
      setAnswer("⚠️ Connection error");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Chat</Text>

     
      <View style={styles.topSection}>
        <TextInput
          style={styles.input}
          placeholder="Ask something..."
          placeholderTextColor="#6b7280"
          value={question}
          onChangeText={setQuestion}
        />

        <TouchableOpacity style={styles.button} onPress={askAI}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>

      
      <ScrollView style={styles.chatArea}>
        {question ? <Text style={styles.question}>{question}</Text> : null}

        {loading ? (
          <ActivityIndicator size="small" color="#facc15" />
        ) : answer ? (
          <Text style={styles.answer}>{answer}</Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    padding: 16,
    paddingTop: 50,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#facc15",
    marginBottom: 12,
  },

  topSection: {
    marginBottom: 15,
  },

  input: {
    backgroundColor: "#1f2937",
    color: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  button: {
    backgroundColor: "#facc15",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#111827",
    fontWeight: "600",
  },

  chatArea: {
    flex: 1,
  },

  question: {
    color: "#facc15",
    fontSize: 15,
    marginBottom: 8,
  },

  answer: {
    color: "#e5e7eb",
    fontSize: 15,
    lineHeight: 22,
  },
});