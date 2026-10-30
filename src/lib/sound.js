// Tiny Web Audio synth so the page needs no audio files. Only ever called from a user gesture.
let ctx

function tone(freq, start, dur, type = 'sine', gain = 0.2) {
  try {
    ctx ??= new (window.AudioContext || window.webkitAudioContext)()
    if (ctx.state === 'suspended') ctx.resume()
    const t = ctx.currentTime + start
    const osc = ctx.createOscillator()
    const amp = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    amp.gain.setValueAtTime(0.0001, t)
    amp.gain.exponentialRampToValueAtTime(gain, t + 0.01)
    amp.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    osc.connect(amp).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + dur + 0.05)
  } catch {
    // audio is a nice-to-have
  }
}

export const ding = () => {
  tone(1318.5, 0, 1.3, 'sine', 0.22)
  tone(1975.5, 0.11, 1.5, 'sine', 0.16)
}

export const chime = () => [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.09, 0.9, 'triangle', 0.12))

export const bell = () => {
  tone(392, 0, 2.2, 'sine', 0.25)
  tone(784, 0, 1.6, 'sine', 0.1)
  tone(1176, 0, 1.1, 'sine', 0.05)
}

export const boop = () => tone(520 + Math.random() * 260, 0, 0.18, 'triangle', 0.14)

export const nope = () => {
  tone(240, 0, 0.16, 'triangle', 0.16)
  tone(190, 0.14, 0.26, 'triangle', 0.16)
}
