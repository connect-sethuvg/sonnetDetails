import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { pricing } from '../data'

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Pricing"
        title="Transparent on-road breakdown"
        subtitle="Kerala pricing from Incheon Motors — every component disclosed."
      />

      <Reveal>
        <div className="glass rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="grid sm:grid-cols-3 gap-4 text-center sm:text-left">
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider">Region</p>
              <p className="font-display font-bold text-lg">{pricing.region}</p>
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider">Dealer</p>
              <p className="font-display font-bold text-lg">{pricing.dealer}</p>
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider">Effective</p>
              <p className="font-display font-bold text-lg">{pricing.effectiveDate}</p>
            </div>
          </div>

          <ul className="space-y-2 pt-4 border-t border-white/10">
            {pricing.notes.map((note) => (
              <li key={note} className="text-sm text-white/55 flex gap-2">
                <span className="text-olive-glow">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
