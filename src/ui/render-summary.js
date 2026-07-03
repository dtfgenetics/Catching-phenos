export function summarizeMvpData(data) {
  const starters = data.starters?.length ?? 0;
  const extraUnits = data.extraUnits?.length ?? 0;
  const expressions = data.expressions?.length ?? 0;
  const quests = data.quests?.length ?? 0;
  const encounters = data.encounters?.encounters?.length ?? 0;
  const maps = data.maps?.length ?? 0;
  const dialogue = data.dialogue?.length ?? 0;
  const starterSlots = data.starterSlots?.length ?? 0;
  const items = data.items?.length ?? 0;
  const abilities = data.abilities?.length ?? 0;

  return [
    `Loaded starters: ${starters}`,
    `Loaded extra units: ${extraUnits}`,
    `Loaded expression states: ${expressions}`,
    `Loaded quests: ${quests}`,
    `Loaded Terp Fields encounters: ${encounters}`,
    `Loaded maps: ${maps}`,
    `Loaded dialogue records: ${dialogue}`,
    `Loaded starter slots: ${starterSlots}`,
    `Loaded items: ${items}`,
    `Loaded abilities: ${abilities}`
  ].join('\n');
}

export function showPanel({ panel, titleEl, copyEl, debugEl, title, copy, debug = '' }) {
  panel?.classList.remove('hidden');
  if (titleEl) titleEl.textContent = title;
  if (copyEl) copyEl.textContent = copy;
  if (debugEl) debugEl.textContent = debug;
}
