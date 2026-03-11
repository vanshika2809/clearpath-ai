export function speak(text, { rate = 1, pitch = 1 } = {}) {
  if (!("speechSynthesis" in window)) return false;

  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = rate;
  utter.pitch = pitch;
  window.speechSynthesis.speak(utter);
  return true;
}

export function stopSpeaking() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}
