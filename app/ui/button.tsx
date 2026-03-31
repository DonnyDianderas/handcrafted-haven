import Link from 'next/link';
import styles from './button.module.css';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  type?: 'button' | 'submit' | 'reset'; 
  onClick?: () => void;
}

export default function Button({ 
  href, 
  children, 
  variant = 'primary', 
  type = 'button' 
}: ButtonProps) {
  const className = variant === 'primary' ? styles.primary : styles.outline;

  // If it has an href, it behaves like a link
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  // If it doesn’t have an href, it behaves like a form button
  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
}