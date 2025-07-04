import Image from 'next/image';
import styles from './page.module.scss';
import Footer from '@/components/layout/footer';
import { VERSION, DEFAULT_METADATA } from '@/app.config';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/jackanory-logo.svg"
          alt="Jackanory logo"
          width={324}
          height={209}
          priority
        />

        <h1 className={styles.title}>
          Welcome to{' '}
          <span className={styles.highlight}>{DEFAULT_METADATA.title}</span>
        </h1>

        <p className={styles.description}>{DEFAULT_METADATA.description}</p>

        <div className={styles.gettingStarted}>
          <h2>Get Started</h2>
          <p>
            Start building your application by editing{' '}
            <code className={styles.code}>src/app/page.tsx</code>
          </p>
          <p>
            Explore the component library by running{' '}
            <code className={styles.code}>yarn storybook</code> in your terminal
          </p>
          <p>
            The page auto-updates as you edit the file, so you can see your
            changes in real-time.
          </p>
        </div>
      </main>

      <Footer version={VERSION} />
    </div>
  );
}
