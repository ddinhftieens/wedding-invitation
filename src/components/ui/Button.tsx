import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'outline';

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps   = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>  & { href: string };

type Props = ButtonProps | LinkProps;

export function Button({ variant = 'primary', children, className = '', fullWidth, ...rest }: Props) {
  const cls = [
    styles.btn,
    styles[variant],
    fullWidth ? styles.full : '',
    className,
  ].filter(Boolean).join(' ');

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as LinkProps;
    return (
      <a href={href} className={cls} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
