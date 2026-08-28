export function addItem(inventory, itemId, quantity = 1) {
  const items = inventory.items ?? [];
  const existing = items.find((entry) => entry.itemId === itemId);

  return {
    ...inventory,
    items: existing
      ? items.map((entry) => entry.itemId === itemId ? { ...entry, quantity: entry.quantity + quantity } : entry)
      : [...items, { itemId, quantity }]
  };
}

export function removeItem(inventory, itemId, quantity = 1) {
  const items = (inventory.items ?? [])
    .map((entry) => entry.itemId === itemId ? { ...entry, quantity: entry.quantity - quantity } : entry)
    .filter((entry) => entry.quantity > 0);

  return { ...inventory, items };
}

export function getItemQuantity(inventory, itemId) {
  return inventory.items?.find((entry) => entry.itemId === itemId)?.quantity ?? 0;
}

export function addMaterial(inventory, speciesId, quantity = 1, tags = []) {
  const materials = inventory.materials ?? [];
  const existing = materials.find((entry) => entry.speciesId === speciesId);

  return {
    ...inventory,
    materials: existing
      ? materials.map((entry) => entry.speciesId === speciesId
        ? {
            ...entry,
            quantity: entry.quantity + quantity,
            tags: Array.from(new Set([...(entry.tags ?? []), ...tags]))
          }
        : entry)
      : [...materials, { speciesId, quantity, tags: [...tags] }]
  };
}

export function removeMaterial(inventory, speciesId, quantity = 1) {
  const materials = (inventory.materials ?? [])
    .map((entry) => entry.speciesId === speciesId ? { ...entry, quantity: entry.quantity - quantity } : entry)
    .filter((entry) => entry.quantity > 0);

  return { ...inventory, materials };
}

export function getMaterialQuantity(inventory, speciesId) {
  return inventory.materials?.find((entry) => entry.speciesId === speciesId)?.quantity ?? 0;
}
