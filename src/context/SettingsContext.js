import React, { createContext, useContext, useEffect, useState } from "react";

import { getTextScaleMultiplier } from "../theme/theme";
import { STORAGE_KEYS, readJson, writeJson } from "../services/storage";

const defaultSettings = {
  themeMode: "light",
  textScale: "medium",
  soundEnabled: true,
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      const storedSettings = await readJson(STORAGE_KEYS.settings, defaultSettings);

      if (isMounted) {
        setSettings({ ...defaultSettings, ...storedSettings });
        setIsReady(true);
      }
    }

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  async function updateSettings(nextSettings) {
    setSettings(nextSettings);
    await writeJson(STORAGE_KEYS.settings, nextSettings);
  }

  function scaleText(baseSize) {
    const multiplier = getTextScaleMultiplier(settings.textScale);
    return Math.max(13, Math.round(baseSize * multiplier));
  }

  async function setThemeMode(themeMode) {
    await updateSettings({ ...settings, themeMode });
  }

  async function setTextScale(textScale) {
    await updateSettings({ ...settings, textScale });
  }

  async function setSoundEnabled(soundEnabled) {
    await updateSettings({ ...settings, soundEnabled });
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        isReady,
        scaleText,
        setThemeMode,
        setTextScale,
        setSoundEnabled,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const value = useContext(SettingsContext);

  if (!value) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }

  return value;
}
