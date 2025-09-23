import { useEffect, useState } from 'react';
import NavDeck from '@/components/NavDeck/NavDeck';

export default function Landing() {
 
  const [bootDone, setBootDone] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  
  useEffect(() => {
    const skip = () => {
      sessionStorage.setItem('booted', '1');
      setBootDone(true);
    };
    if (sessionStorage.getItem('booted')) {
      setBootDone(true);
      return;
    }
    const hex = (n: number) => n.toString(16).padStart(4, '0');
    const devId = hex(Math.floor(Math.random() * 0xffff));
    const mac = Array.from({ length: 6 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':');
    const kb = 8192 + Math.floor(Math.random() * 8192);
    const sigilCount = 8 + Math.floor(Math.random() * 16);
    const msgs = [
      '> booting up...',
      '> bios v0.8 — raveneyex',
      `> device id: 0x${devId}`,
      '> checking memory...',
      `> memory: ${kb} kb ok`,
      '> probing buses: isa ok, pci ok',
      '> dma: enabled',
      `> net: disabled (mac ${mac})`,
      '> init video: crt/mono ok',
      '> init input: ps/2 ok',
      '> scanning modules...',
      '> setting up tattoo equipment...',
      '> sterilizing: autoclave cycle ok',
      '> needles: sterile packs verified',
      '> inks: black/grey set loaded',
      '> machine: coil calibration ok',
      '> power supply: stable 6.5v',
      '> stencil: transfer gel ready',
      '> loading magick systems...',
      '> grimoire: loaded',
      `> sigils: compiled (${sigilCount})`,
      '> circle: charged',
      '> intent: bound',
      '> wards: enabled',
      '> banishing: protocol armed',
      '> modules: ui, router, sigils, hud ok',
      '> filesystem: mounted / (ro)',
      '> entropy: seeded',
      '> ready',
      '> press any key to enter',
    ];
    let i = 0;
    const interval = setInterval(() => {
      setBootLines((prev) => [...prev, msgs[i]]);
      i += 1;
      if (i >= msgs.length) {
        clearInterval(interval);
        setTimeout(() => {
          sessionStorage.setItem('booted', '1');
          setBootDone(true);
        }, 500);
      }
    }, 300);
    const onKey = () => skip();
    const onClick = () => skip();
    window.addEventListener('keydown', onKey);
    window.addEventListener('click', onClick);
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('click', onClick);
    };
  }, []);

  
  if (!bootDone) {
    return (
      <section className="fixed inset-0 z-50 grid place-items-center bg-noir-900/98">
        <div className="font-mono text-[#00ffa3] text-sm sm:text-base leading-relaxed w-[min(90vw,40rem)] glass glass-border-cyan p-6">
          {bootLines.map((l, idx) => (
            <div key={idx} className="whitespace-pre">
              {l}
            </div>
          ))}
          {bootLines.length === 0 && <div>&gt; BOOTING...</div>}
        </div>
      </section>
    );
  }

  return <NavDeck />
}
