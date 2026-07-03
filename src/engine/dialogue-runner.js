export function getDialogueRecord(dialogueRecords, dialogueId) {
  return dialogueRecords.find((record) => record.id === dialogueId) ?? null;
}

export function canStartDialogue(record, saveData) {
  if (!record) return false;
  if (record.requiresQuest && saveData.quests?.activeQuest !== record.requiresQuest) return false;
  if (record.requiresFlag && saveData.quests?.flags?.[record.requiresFlag] !== true) return false;
  return true;
}

export function createDialogueSession(dialogueRecords, dialogueId, saveData) {
  const record = getDialogueRecord(dialogueRecords, dialogueId);

  if (!canStartDialogue(record, saveData)) {
    return {
      active: false,
      reason: record ? 'requirements_not_met' : 'missing_dialogue',
      record: null,
      lineIndex: 0
    };
  }

  return {
    active: true,
    reason: 'started',
    record,
    lineIndex: 0
  };
}

export function getCurrentDialogueLine(session) {
  if (!session?.active || !session.record) return null;
  return session.record.lines?.[session.lineIndex] ?? null;
}

export function advanceDialogueSession(session, dialogueRecords) {
  if (!session?.active || !session.record) return session;

  const nextLineIndex = session.lineIndex + 1;
  const hasNextLine = nextLineIndex < (session.record.lines?.length ?? 0);

  if (hasNextLine) {
    return {
      ...session,
      lineIndex: nextLineIndex
    };
  }

  if (session.record.next) {
    const nextRecord = getDialogueRecord(dialogueRecords, session.record.next);
    return {
      active: Boolean(nextRecord),
      reason: nextRecord ? 'advanced_to_next_record' : 'missing_next_dialogue',
      record: nextRecord,
      lineIndex: 0
    };
  }

  return {
    ...session,
    active: false,
    reason: 'complete'
  };
}

export function applyDialogueEffects(saveData, record) {
  if (!record) return saveData;

  const flags = { ...(saveData.quests?.flags ?? {}) };
  if (record.setsFlag) flags[record.setsFlag] = true;

  return {
    ...saveData,
    quests: {
      ...saveData.quests,
      flags
    }
  };
}
