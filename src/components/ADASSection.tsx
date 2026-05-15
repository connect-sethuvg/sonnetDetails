import { motion } from 'framer-motion'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { features } from '../data'

export function ADASSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(107,124,58,0.08),transparent_70%)]" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          eyebrow="ADAS Level 1"
          title="Futuristic safety intelligence"
          subtitle="10 autonomous safety features on GTX+ and X-Line — holographic-grade protection."
          align="center"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {features.adas.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <motion.div
                className="relative rounded-2xl p-5 border border-olive/20 bg-graphite/80 backdrop-blur-md overflow-hidden group"
                whileHover={{ borderColor: 'rgba(156,184,106,0.5)' }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-olive-glow to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: i * 0.2 }}
                />
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-olive/30 flex items-center justify-center text-[10px] text-olive-glow font-mono">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display font-bold pr-10">{item.title}</h3>
                <p className="text-sm text-white/50 mt-2 leading-relaxed">{item.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
