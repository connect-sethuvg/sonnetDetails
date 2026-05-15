import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown, Download, GitCompare, Layers } from 'lucide-react'

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero"
      aria-label="Hero"
    >
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(90vw,800px)] aspect-[16/9] rounded-3xl opacity-40"
          style={{
            background:
              'linear-gradient(135deg, rgba(107,124,58,0.3), transparent 50%), radial-gradient(circle at 30% 70%, rgba(156,184,106,0.2), transparent)',
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute bottom-0 inset-x-0 h-1/2"
          style={{
            background:
              'linear-gradient(to top, #0a0a0a 0%, transparent 100%)',
          }}
        />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-olive-glow text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase mb-4 font-accent"
        >
          KIA SONET 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95]"
        >
          <span className="text-gradient">The Wild.</span>
          <br />
          <span className="text-white">Reborn.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-white/50 text-base sm:text-lg max-w-xl mx-auto"
        >
          A premium digital SUV showroom — explore every variant, compare with precision,
          and configure your wild.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <a
            href="#variants"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-olive to-olive-glow text-matte font-semibold text-sm hover:shadow-lg hover:shadow-olive/30 transition-shadow"
          >
            <Layers size={18} />
            Explore Variants
          </a>
          <a
            href="#compare"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            <GitCompare size={18} />
            Compare Models
          </a>
          <a
            href="https://www.kia.com/in/vehicles/sonet.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-sm font-semibold hover:border-olive-glow/50 transition-colors"
          >
            <Download size={18} />
            Download Brochure
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#variants"
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-olive-glow transition-colors"
        aria-label="Scroll to variants"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} />
      </motion.a>
    </section>
  )
}
