import { SectionTitle } from '../ui/SectionTitle';
import { STORY_EVENTS } from '../../constants/wedding';
import { getCardBgImage } from '../../utils/helpers';
import type { StoryEvent } from '../../types';
import styles from './Story.module.css';

function StoryItem({ event, index }: { event: StoryEvent; index: number }) {
  const isRight = index % 2 !== 0;
  const bgUrl = getCardBgImage(`story_${index}_${event.year}`);
  const bgStyle = {
    backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.86) 0%, rgba(9, 13, 22, 0.93) 100%), url(${bgUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      className={`${styles.item} ${isRight ? styles.itemRight : styles.itemLeft} reveal`}
      id={`story-${index + 1}`}
    >
      <div className={styles.dot} aria-hidden="true" />
      <div className={styles.card}>
        <div className={styles.bgImage} style={bgStyle} />
        <div className={styles.cardContent}>
          <span className={styles.year}>{event.year}</span>
          <h3 className={styles.title}>{event.title}</h3>
          <p className={styles.text}>{event.text}</p>
        </div>
      </div>
    </div>
  );
}

export function Story() {
  return (
    <section id="story">
      <div className="section-wrapper section-wrapper--wide">
        <SectionTitle>Câu chuyện của chúng tôi</SectionTitle>
        <div className={styles.timeline} aria-label="Timeline tình yêu">
          {STORY_EVENTS.map((event, i) => (
            <StoryItem key={i} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
