const HAS_VOTED_KEY = "hasVoted"

export function getHasVoted(): boolean {
  return localStorage.getItem(HAS_VOTED_KEY) === "true"
}

export function setHasVoted(): void {
  localStorage.setItem(HAS_VOTED_KEY, "true")
}
