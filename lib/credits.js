export function getCredits() {
  return Number(localStorage.getItem("credits") || 3);
}

export function useCredit() {
  let credits = getCredits();
  if (credits <= 0) return false;

  localStorage.setItem("credits", credits - 1);
  return true;
}

export function addCredits(amount) {
  let credits = getCredits();
  localStorage.setItem("credits", credits + amount);
}