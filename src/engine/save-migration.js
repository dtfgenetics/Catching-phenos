import { createDefaultSave } from './save.js';

export function mergeDeep(defaultValue, savedValue) {
  if (Array.isArray(defaultValue)) {
    return Array.isArray(savedValue) ? savedValue : defaultValue;
  }

  if (defaultValue && typeof defaultValue === 'object') {
    const output = { ...defaultValue };
    const savedObject = savedValue && typeof savedValue === 'object' ? savedValue : {};

    for (const key of Object.keys(savedObject)) {
      output[key] = key in defaultValue ? mergeDeep(defaultValue[key], savedObject[key]) : savedObject[key];
    }

    return output;
  }

  return savedValue ?? defaultValue;
}

export function migrateSave(rawSave) {
  const defaults = createDefaultSave();
  const repaired = mergeDeep(defaults, rawSave ?? {});

  return {
    ...repaired,
    version: defaults.version
  };
}

export function repairSave(rawSave) {
  return migrateSave(rawSave);
}

export function isSaveUsable(saveData) {
  return Boolean(
    saveData &&
    saveData.player &&
    saveData.world &&
    saveData.quests &&
    saveData.inventory &&
    saveData.vaultGarden
  );
}
