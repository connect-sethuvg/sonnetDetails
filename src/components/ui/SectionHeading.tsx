import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : ''

  return (
    <Reveal className={`mb-12 max-w-3xl ${alignClass}`}>
      <p className="text-olive-glow text-xs font-semibold tracking-[0.35em] uppercase mb-3 font-accent">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gradient">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-white/60 text-base sm:text-lg leading-relaxed">{subtitle}</p>
      )}
    </Reveal>
  )
}
