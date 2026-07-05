export const LONDON_TZ = "Europe/London";

const clockFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: LONDON_TZ,
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const shortFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: LONDON_TZ,
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function nowInLondon() {
  return clockFormatter.format(new Date());
}

export function formatLondon(dateInput) {
  return shortFormatter.format(new Date(dateInput));
}

export function getDeviceTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";
  } catch {
    return "Unknown";
  }
}
