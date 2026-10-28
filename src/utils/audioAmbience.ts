// Subtle procedural cinematic ambient drone generator using Web Audio API
// Generates a soft, warm, atmospheric fantasy drone (no external mp3 files needed)

class AmbientAudioController {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isPlaying: boolean = false;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      console.warn('Web Audio API not supported in this browser.');
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.stop(); // Clear any existing

    const now = this.ctx.currentTime;
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, now);
    // Smooth fade in over 2 seconds
    this.masterGain.gain.exponentialRampToValueAtTime(0.12, now + 2);

    // Warm Low Pass Filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(240, now);
    filter.Q.setValueAtTime(1.5, now);

    // Subtle LFO for breathing movement
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.12, now); // slow breathing
    lfoGain.gain.setValueAtTime(60, now);
    lfo.connect(filter.frequency);
    lfo.start();
    this.oscillators.push(lfo);

    // Fundamental D2 note (approx 73.42 Hz) & harmonics for cinematic fantasy depth
    const freqs = [73.42, 110.0, 146.83, 220.0];
    const detunes = [-4, 3, -2, 5];

    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime(detunes[idx], now);

      oscGain.gain.setValueAtTime(0.18 / (idx + 1), now);

      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
      this.oscillators.push(osc);
    });

    filter.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);
    this.isPlaying = true;
  }

  public stop() {
    if (!this.ctx || !this.masterGain) {
      this.isPlaying = false;
      return;
    }

    const now = this.ctx.currentTime;
    try {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      setTimeout(() => {
        this.oscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        });
        this.oscillators = [];
        this.isPlaying = false;
      }, 1250);
    } catch {
      this.isPlaying = false;
    }
  }
}

export const ambientSound = new AmbientAudioController();
