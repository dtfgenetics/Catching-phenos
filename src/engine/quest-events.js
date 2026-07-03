const QUEST_EVENT_MAP = {
  starter_chosen: {
    activeQuest: 'choose_your_echo',
    nextQuest: 'first_field_test',
    flag: 'starter_chosen'
  },
  first_battle_won: {
    activeQuest: 'first_field_test',
    nextQuest: 'stolen_vault_tag',
    flag: 'tutorial_battle_complete'
  },
  first_material_earned: {
    activeQuest: 'first_material',
    nextQuest: 'root_first_unit',
    flag: 'first_material_earned'
  },
  first_result_claimed: {
    activeQuest: 'root_first_unit',
    nextQuest: 'nova_challenge',
    flag: 'first_result_claimed'
  },
  signal_clamp_cleared: {
    activeQuest: 'signal_clamp',
    nextQuest: 'aroma_trial',
    flag: 'signal_clamp_cleared'
  },
  aroma_trial_complete: {
    activeQuest: 'aroma_trial',
    nextQuest: 'demo_complete',
    flag: 'aroma_trial_complete'
  }
};

export function applyQuestEvent(saveData, eventId) {
  const event = QUEST_EVENT_MAP[eventId];
  if (!event) return saveData;

  const completed = new Set(saveData.quests.completed ?? []);
  if (saveData.quests.activeQuest === event.activeQuest) {
    completed.add(event.activeQuest);
  }

  return {
    ...saveData,
    quests: {
      ...saveData.quests,
      activeQuest: saveData.quests.activeQuest === event.activeQuest ? event.nextQuest : saveData.quests.activeQuest,
      completed: Array.from(completed),
      flags: {
        ...saveData.quests.flags,
        [event.flag]: true
      }
    }
  };
}

export function getQuestEventIds() {
  return Object.keys(QUEST_EVENT_MAP);
}
