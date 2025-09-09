import {Earth, Edit3, Layers, Zap} from 'lucide-react'
import {AnimatedTitle} from '@/components/animated-title'
import {FeatureItem} from './FeatureItem'

export default function Features() {
    return (
        <section className="mb-40 space-y-28 px-1 pb-1 z-30">
            <AnimatedTitle>
                <h2 className="heading-section">
                    The <span className="text-highlight">power</span> of{' '}
                    <span
                        className="relative inline-block before:absolute before:-bottom-0 before:-right-[0.6em] before:-z-1 before:size-[1.375em] before:rounded-full before:bg-primary-light/60">
            notes
          </span>
                </h2>
            </AnimatedTitle>
            <ul className="space-y-1 text-2xl sm:text-3xl md:text-4xl">
                <li>
                    <FeatureItem
                        className="text-primary-dark bg-primary/80 hover:bg-primary/65 dark:hover:bg-primary"
                        reason="Rich Notion-style editor for seamless note-taking"
                    >
                        <Edit3/>
                    </FeatureItem>
                </li>
                <li>
                    <FeatureItem
                        className="bg-secondary/60 text-secondary-depth hover:bg-secondary/40 dark:bg-secondary/85 dark:hover:bg-secondary"
                        reason="Infinite nested documents for hierarchical organization"
                        delay={0.2}
                    >
                        <Layers/>
                    </FeatureItem>
                </li>
                <li>
                    <FeatureItem
                        reason="Real-time database for instant updates across devices"
                        className="bg-highlight/50 text-highlight-depth hover:bg-highlight/40 dark:bg-highlight/85 dark:hover:bg-highlight"
                        delay={0.3}
                    >
                        <Zap/>
                    </FeatureItem>
                </li>
                <li>
                    <FeatureItem
                        reason="Publish notes to the web and share instantly"
                        className="bg-primary-light/60 text-primary-depth hover:bg-primary-light/40 dark:hover:bg-primary-light"
                        delay={0.4}
                    >
                        <Earth/>
                    </FeatureItem>
                </li>
            </ul>
        </section>
    )
}
