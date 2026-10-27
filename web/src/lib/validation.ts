export const MIN_PASSWORD_LENGTH = 8;

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

const strengthLabels = ["Trop court", "Faible", "Moyen", "Bon", "Excellent"] as const;

/** 0 (too short) to 4: length, then one point each for digits, mixed case and symbols. */
export function passwordStrength(password: string) {
  if (password.length < MIN_PASSWORD_LENGTH) return { score: 0, label: strengthLabels[0] };
  let score = 1;
  if (/\d/.test(password)) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return { score, label: strengthLabels[score] };
}
