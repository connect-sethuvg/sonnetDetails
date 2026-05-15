import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { engines } from '../data'

function PerformanceCard({
  engine,
  index,
}: {
  engine: (typeof engines)[0]
  index: number
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const pct = Math.min(100, (engine.powerKw / 100) * 100)

  return (
    <Reveal delay={index * 0.1}>
      <motion.div
        ref={ref}
        whileHover={{ y: -4 }}
        className="relative rounded-2xl glass p-6 overflow-hidden group"
      >
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full border border-olive/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <p className="text-olive-glow text-xs font-bold tracking-widest uppercase">{engine.tagline}</p>
        <h3 className="font-display text-2xl font-bold mt-2">{engine.name}</h3>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-3xl font-display font-extrabold text-gradient">
              {inView ? <CountUp end={engine.powerKw} duration={1.5} /> : '0'}
              <span className="text-lg text-white/50"> kW</span>
            </p>
            <p className="text-xs text-white/40 mt-1">Power</p>
          </div>
          <div>
            <p className="text-3xl font-display font-extrabold text-gradient">
              {inView ? <CountUp end={engine.torqueNm} duration={1.5} delay={0.2} /> : '0'}
              <span className="text-lg text-white/50"> Nm</span>
            </p>
            <p className="text-xs text-white/40 mt-1">Torque</p>
          </div>
        </div>

        <div className="mt-6 h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-olive to-olive-glow rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: `${pct}%` } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </div>
      </motion.div>
    </Reveal>
  )
}

export function EngineSection() {
  return (
    <section id="performance" className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Performance"
        title="Raw power. Refined control."
        subtitle="Three Smartstream powertrains engineered for Kerala roads and wild instincts."
      />
      <div className="grid sm:grid-cols-3 gap-6">
        {engines.map((e, i) => (
          <PerformanceCard key={e.id} engine={e} index={i} />
        ))}
      </div>
    </section>
  )
}
