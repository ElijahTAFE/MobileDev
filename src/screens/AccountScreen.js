import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, Text, TextInput, useTheme } from "react-native-paper";

import { ScreenContainer } from "../components/ScreenContainer";
import { StatusBanner } from "../components/StatusBanner";
import { useSettings } from "../context/SettingsContext";

function isValidEmail(value) {
  return /\S+@\S+\.\S+/.test(value);
}

export function AccountScreen({ navigation }) {
  const theme = useTheme();
  const { scaleText } = useSettings();
  const [mode, setMode] = useState("signUp");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState("info");

  function resetMessage() {
    setMessage("");
    setMessageTone("info");
  }

  function handleModeChange(nextMode) {
    setMode(nextMode);
    resetMessage();
  }

  function handleContinue() {
    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim();

    if (mode === "signUp" && !trimmedFullName) {
      setMessageTone("error");
      setMessage("Please enter your full name.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setMessageTone("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.trim().length < 6) {
      setMessageTone("error");
      setMessage("Please enter a password with at least 6 characters.");
      return;
    }

    if (mode === "signUp" && password !== confirmPassword) {
      setMessageTone("error");
      setMessage("Your passwords do not match yet.");
      return;
    }

    setMessageTone("success");
    setMessage(
      mode === "signUp"
        ? "Account setup demo complete. This shows where account creation can be added later."
        : "Sign-in demo complete. This shows where returning users can log in later.",
    );
  }

  function handleGmailPlaceholder() {
    setMessageTone("info");
    setMessage(
      "Google sign-in is shown here as a planned option. It is not connected to live authentication yet.",
    );
  }

  return (
    <ScreenContainer scrollable>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <Card mode="contained" style={styles.heroCard}>
          <Card.Content style={styles.heroContent}>
            <Text variant="labelLarge" style={{ color: theme.colors.primary, fontWeight: "800" }}>
              ACCOUNT ACCESS
            </Text>
            <Text variant="headlineSmall" style={{ fontSize: scaleText(28), fontWeight: "800" }}>
              Sign in or create an account
            </Text>
            <Text style={{ fontSize: scaleText(15), color: theme.colors.onSurfaceVariant }}>
              The events area stays available to every visitor. Use this page for the
              account experience, while keeping guest browsing open.
            </Text>
            <View
              style={[
                styles.guestNotice,
                {
                  backgroundColor: theme.colors.surfaceVariant,
                  borderColor: theme.colors.outline,
                },
              ]}
            >
              <View style={styles.guestCopy}>
                <Text style={{ fontSize: scaleText(16), fontWeight: "700" }}>
                  Continue as guest
                </Text>
                <Text
                  style={{ fontSize: scaleText(14), color: theme.colors.onSurfaceVariant }}
                >
                  You can still browse the Events page without logging in.
                </Text>
              </View>
              <Button
                mode="text"
                onPress={() => navigation.navigate("EventsList")}
                contentStyle={styles.guestButtonContent}
              >
                Browse events
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Card mode="contained" style={styles.card}>
          <Card.Content style={styles.content}>
            <View
              style={[
                styles.modeToggle,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              <Button
                mode={mode === "signUp" ? "contained" : "text"}
                onPress={() => handleModeChange("signUp")}
                style={styles.modeButton}
                contentStyle={styles.modeButtonContent}
              >
                Sign up
              </Button>
              <Button
                mode={mode === "signIn" ? "contained" : "text"}
                onPress={() => handleModeChange("signIn")}
                style={styles.modeButton}
                contentStyle={styles.modeButtonContent}
              >
                Sign in
              </Button>
            </View>

            <Text style={{ fontSize: scaleText(15), color: theme.colors.onSurfaceVariant }}>
              {mode === "signUp"
                ? "Create a future account profile for saved details and faster access."
                : "Welcome back. Sign in to continue with your saved account later."}
            </Text>

            <StatusBanner tone={messageTone} message={message} />

            {mode === "signUp" ? (
              <TextInput
                mode="outlined"
                label="Full name"
                value={fullName}
                onChangeText={(value) => {
                  setFullName(value);
                  resetMessage();
                }}
                autoCapitalize="words"
              />
            ) : null}

            <TextInput
              mode="outlined"
              label="Email address"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                resetMessage();
              }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                resetMessage();
              }}
              secureTextEntry
            />

            {mode === "signUp" ? (
              <TextInput
                mode="outlined"
                label="Confirm password"
                value={confirmPassword}
                onChangeText={(value) => {
                  setConfirmPassword(value);
                  resetMessage();
                }}
                secureTextEntry
              />
            ) : null}

            <View
              style={[
                styles.googleBox,
                { backgroundColor: theme.colors.background, borderColor: theme.colors.outline },
              ]}
            >
              <Text style={{ fontSize: scaleText(16), fontWeight: "700" }}>
                Google sign-in
              </Text>
              <Text style={{ fontSize: scaleText(14), color: theme.colors.onSurfaceVariant }}>
                This is a placeholder for a future Google or Gmail login option. It is
                not connected to real authentication yet.
              </Text>
              <Button
                mode="outlined"
                icon="google"
                onPress={handleGmailPlaceholder}
                style={styles.googleButton}
                contentStyle={styles.googleButtonContent}
                labelStyle={styles.googleButtonLabel}
              >
                Continue with Gmail
              </Button>
            </View>

            <View style={styles.actions}>
              <Button mode="contained" onPress={handleContinue} style={styles.primaryAction}>
                {mode === "signUp" ? "Create account" : "Sign in"}
              </Button>
              <Button mode="text" onPress={() => navigation.goBack()}>
                Back
              </Button>
            </View>
          </Card.Content>
        </Card>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    marginBottom: 16,
  },
  heroContent: {
    gap: 12,
  },
  guestNotice: {
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: 16,
  },
  guestCopy: {
    flex: 1,
    gap: 4,
  },
  guestButtonContent: {
    minHeight: 40,
  },
  card: {
    marginBottom: 24,
  },
  content: {
    gap: 14,
  },
  modeToggle: {
    flexDirection: "row",
    borderRadius: 18,
    padding: 4,
  },
  modeButton: {
    flex: 1,
    borderRadius: 14,
  },
  modeButtonContent: {
    minHeight: 44,
  },
  googleBox: {
    borderWidth: 1,
    borderRadius: 18,
    gap: 8,
    padding: 16,
  },
  googleButton: {
    marginTop: 8,
  },
  googleButtonContent: {
    minHeight: 46,
  },
  googleButtonLabel: {
    fontWeight: "700",
  },
  actions: {
    gap: 12,
  },
  primaryAction: {
    minHeight: 44,
  },
});
