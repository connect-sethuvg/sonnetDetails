import { motion } from 'framer-motion'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { features } from '../data'

type CategoryKey = 'exterior' | 'interior' | 'safety' | 'connected'

const SECTIONS: { key: CategoryKey; eyebrow: string; title: string; id: string }[] = [
  { key: 'exterior', eyebrow: 'Exterior', title: 'Command the road', id: 'features' },
  { key: 'interior', eyebrow: 'Interior', title: 'Cabin of the wild', id: 'interior' },
  { key: 'safety', eyebrow: 'Safety', title: 'Protected instinct', id: 'safety' },
  { key: 'connected', eyebrow: 'Connected', title: 'Always in command', id: 'connected' },
]

export function FeatureSection() {
  return (
    <>
      {SECTIONS.map((section, si) => (
        <section
          key={section.key}
          id={section.id}
          className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto"
        >
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.title}
            subtitle={
              section.key === 'exterior'
                ? 'Sculpted aggression meets signature Kia design DNA.'
                : undefined
            }
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {features[section.key].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`group rounded-2xl overflow-hidden glass p-6 ${
                    i % 2 === 1 && si % 2 === 0 ? 'sm:translate-y-8' : ''
                  }`}
                >
                  <div
                    className="h-32 -mx-6 -mt-6 mb-5 bg-gradient-to-br from-olive/20 via-graphite-light to-matte relative"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(156,184,106,0.2),transparent)]" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2 group-hover:text-olive-glow transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed">{item.description}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
