export interface RecentItem {
  id: string;
  title: string;
  subtitle?: string;
  timestamp?: number;
}

const MAX_ITEMS = 6;

function getStorageKey(category: 'ifsc' | 'pincode' | 'hsn'): string {
  return `multisheets_recent_${category}`;
}

export function saveRecentSearch(
  category: 'ifsc' | 'pincode' | 'hsn',
  item: { id: string; title: string; subtitle?: string; timestamp?: number }
): void {
  if (typeof window === 'undefined' || !window.localStorage) return;

  try {
    const key = getStorageKey(category);
    const existingRaw = localStorage.getItem(key);
    let items: RecentItem[] = existingRaw ? JSON.parse(existingRaw) : [];

    // Remove duplicate if exists by id
    items = items.filter((i) => i.id !== item.id);

    // Add new item at the beginning
    items.unshift({
      ...item,
      timestamp: item.timestamp || Date.now(),
    });

    // Trim to MAX_ITEMS (FIFO)
    if (items.length > MAX_ITEMS) {
      items = items.slice(0, MAX_ITEMS);
    }

    localStorage.setItem(key, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save recent search", e);
  }
}

export function getRecentSearches(
  category: 'ifsc' | 'pincode' | 'hsn',
  limit: number = MAX_ITEMS
): RecentItem[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];

  try {
    const key = getStorageKey(category);
    const existingRaw = localStorage.getItem(key);
    if (!existingRaw) return [];

    const items: RecentItem[] = JSON.parse(existingRaw);
    return items.slice(0, limit);
  } catch (e) {
    console.error("Failed to get recent searches", e);
    return [];
  }
}

export function clearRecentSearches(category: 'ifsc' | 'pincode' | 'hsn'): void {
  if (typeof window === 'undefined' || !window.localStorage) return;

  try {
    localStorage.removeItem(getStorageKey(category));
  } catch (e) {
    console.error("Failed to clear recent searches", e);
  }
}
