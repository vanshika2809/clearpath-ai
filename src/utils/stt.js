export function startListening({ onText, onError } = {}) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError?.("Speech Recognition not supported in this browser.");
    return null;
  }

  const recog = new SpeechRecognition();
  recog.lang = "en-US";
  recog.interimResults = false;
  recog.maxAlternatives = 1;

  recog.onresult = (event) => {
    const txt = event.results?.[0]?.[0]?.transcript || "";
    onText?.(txt);
  };

  recog.onerror = () => {
    onError?.("Could not recognize speech. Try again.");
  };

  recog.start();
  return recog;
}
