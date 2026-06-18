import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, Text, TextInput, useTheme } from "react-native-paper";

import { EmptyState } from "../components/EmptyState";
import { ScreenContainer } from "../components/ScreenContainer";
import { StatusBanner } from "../components/StatusBanner";
import { useEvents } from "../context/EventsContext";
import { useSettings } from "../context/SettingsContext";

function isValidEmail(value) {
  return /\S+@\S+\.\S+/.test(value);
}

export function RegisterScreen({ navigation, route }) {
  const theme = useTheme();
  const { scaleText, settings } = useSettings();
  const { getEventById, hasRegistrationForEvent, registerForEvent } = useEvents();

  const event = getEventById(route.params?.eventId);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState("info");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!event) {
    return (
      <ScreenContainer scrollable>
        <EmptyState
          title="Registration unavailable"
          body="The event details could not be found. Please go back and try again."
          actionLabel="Back to events"
          onActionPress={() => navigation.navigate("EventsList")}
        />
      </ScreenContainer>
    );
  }

  const alreadyRegistered = hasRegistrationForEvent(event.id);

  async function handleSubmit() {
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setMessageTone("error");
      setMessage("Please enter your full name.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setMessageTone("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    const result = await registerForEvent(event.id, {
      fullName: trimmedName,
      email: trimmedEmail,
    });
    setIsSubmitting(false);
    setMessageTone(result.ok ? "success" : "error");
    setMessage(result.message);

    if (result.ok && settings.soundEnabled) {
      setMessage(`${result.message} Sound cues are turned on in settings.`);
    }
  }

  return (
    <ScreenContainer scrollable>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <Card mode="contained" style={styles.card}>
          <Card.Content style={styles.content}>
            <Text variant="headlineSmall" style={{ fontSize: scaleText(26), fontWeight: "800" }}>
              Register for {event.title}
            </Text>
            <Text style={{ fontSize: scaleText(15), color: theme.colors.onSurfaceVariant }}>
              Enter your details below to book a place at this event.
            </Text>

            <StatusBanner tone={messageTone} message={message} />

            {alreadyRegistered ? (
              <StatusBanner
                tone="success"
                message="You are already registered for this event."
              />
            ) : null}

            <TextInput
              mode="outlined"
              label="Full name"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
            <TextInput
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View style={styles.actions}>
              <Button
                mode="contained"
                onPress={handleSubmit}
                disabled={alreadyRegistered || isSubmitting || event.spotsRemaining <= 0}
                loading={isSubmitting}
                style={styles.submitButton}
              >
                Confirm registration
              </Button>
              <Button mode="outlined" onPress={() => navigation.goBack()}>
                Back to event
              </Button>
            </View>
          </Card.Content>
        </Card>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  content: {
    gap: 14,
  },
  actions: {
    gap: 12,
  },
  submitButton: {
    minHeight: 44,
  },
});
