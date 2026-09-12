function findNpcAt(map, x, y) {
  return (map.npcs ?? []).find((npc) => npc.x === x && npc.y === y) ?? null;
}

function findObjectAt(map, x, y) {
  return (map.objects ?? []).find((object) => object.x === x && object.y === y) ?? null;
}

export function getCenteredScrollLeft({ itemCenter, viewportWidth, contentWidth }) {
  const safeViewport = Math.max(0, Number(viewportWidth) || 0);
  const safeContent = Math.max(safeViewport, Number(contentWidth) || 0);
  const maxScroll = Math.max(0, safeContent - safeViewport);
  const centered = (Number(itemCenter) || 0) - safeViewport / 2;
  return Math.min(maxScroll, Math.max(0, centered));
}

export function shouldRecenterPlayer({ itemCenterInViewport, viewportWidth }) {
  const width = Math.max(0, Number(viewportWidth) || 0);
  if (!width) return false;
  const center = Number(itemCenterInViewport) || 0;
  return center < width * 0.28 || center > width * 0.72;
}

function keepPlayerVisible(grid) {
  const playerTile = grid.querySelector('.player-tile');
  if (!playerTile) return;

  const recenter = () => {
    if (grid.scrollWidth <= grid.clientWidth + 1) return;

    const gridRect = grid.getBoundingClientRect();
    const tileRect = playerTile.getBoundingClientRect();
    const itemCenterInViewport = tileRect.left - gridRect.left + tileRect.width / 2;
    if (!shouldRecenterPlayer({ itemCenterInViewport, viewportWidth: grid.clientWidth })) return;

    const itemCenter = grid.scrollLeft + itemCenterInViewport;
    const left = getCenteredScrollLeft({
      itemCenter,
      viewportWidth: grid.clientWidth,
      contentWidth: grid.scrollWidth
    });
    const reducedMotion = Boolean(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

    if (typeof grid.scrollTo === 'function') {
      grid.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' });
    } else {
      grid.scrollLeft = left;
    }
  };

  if (typeof globalThis.requestAnimationFrame === 'function') globalThis.requestAnimationFrame(recenter);
  else recenter();
}

export function renderMapGrid({ container, map, player }) {
  if (!container || !map) return;

  container.innerHTML = '';

  const grid = document.createElement('div');
  grid.className = 'map-grid';
  grid.style.setProperty('--map-width', map.width);

  for (let y = 0; y < map.height; y += 1) {
    for (let x = 0; x < map.width; x += 1) {
      const tile = document.createElement('div');
      tile.className = 'map-tile';
      tile.dataset.x = x;
      tile.dataset.y = y;

      const npc = findNpcAt(map, x, y);
      const object = findObjectAt(map, x, y);

      if (npc) {
        tile.classList.add('npc-tile');
        tile.title = npc.id;
        tile.textContent = '●';
      }

      if (object) {
        tile.classList.add('object-tile');
        tile.title = object.id;
        tile.textContent = '■';
      }

      if (player?.position?.x === x && player?.position?.y === y) {
        tile.classList.add('player-tile');
        tile.textContent = '◆';
      }

      if (map.blocked?.some((blocked) => blocked.x === x && blocked.y === y)) {
        tile.classList.add('blocked-tile');
      }

      grid.appendChild(tile);
    }
  }

  container.appendChild(grid);
  keepPlayerVisible(grid);
}

export function renderMapLabel({ container, map, player }) {
  if (!container || !map) return;
  const facing = player.facing ? ` Facing:${player.facing}` : '';
  container.textContent = `${map.displayName} — X:${player.position.x} Y:${player.position.y}${facing}`;
}
