import Link from 'next/link';
import styles from './button.module.css';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
}

export default function Button({ href, children, variant = 'primary' }: ButtonProps) {
  const className = variant === 'primary' ? styles.primary : styles.outline;
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}