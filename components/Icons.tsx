import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export function IconShield({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25 6 2.25v4.7z" />
    </svg>
  );
}

export function IconInbox({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M20 3H4c-1.103 0-2 .897-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5c0-1.103-.897-2-2-2zM4 19V7h16v12H4zm14-8h-3a3 3 0 0 1-6 0H6v-2h3.142A4.982 4.982 0 0 0 12 11c1.297 0 2.458-.496 3.332-1.312L15.474 9H18v2z" />
    </svg>
  );
}

export function IconStore({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M21.9 8.24 20.3 3.44A2 2 0 0 0 18.4 2H5.6a2 2 0 0 0-1.9 1.44L2.1 8.24A3 3 0 0 0 2 9.2V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9.2a3 3 0 0 0-.1-.96zM5.6 4h12.8l1.33 4H4.27l1.33-4zM20 20H4V10h16v10zm-9-8h2v6h-2z" />
    </svg>
  );
}

export function IconUser({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
    </svg>
  );
}

export function IconLock({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm9 13H6v-8h12v8zm-6-5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
    </svg>
  );
}

export function IconSun({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm0-10V1h-2v4h2zm0 18v-4h-2v4h2zm9-11h-4v2h4v-2zM5 11H1v2h4v-2zm12.364-7.778 2.828 2.828-1.414 1.414-2.828-2.828 1.414-1.414zM4.222 17.364l2.828 2.828 1.414-1.414-2.828-2.828-1.414 1.414zm14.142 2.828 1.414-1.414-2.828-2.828-1.414 1.414 2.828 2.828zM7.05 5.636 5.636 4.222 4.222 5.636l1.414 1.414 1.414-1.414z" />
    </svg>
  );
}

export function IconMoon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12.3 2a10 10 0 0 0-1.9 19.8 10 10 0 0 0 11.6-11.6A10.1 10.1 0 0 1 12.3 2zm-1.8 17.8a8 8 0 1 1 7.4-11 8 8 0 0 0-7.4 11z" />
    </svg>
  );
}

export function IconCheckCircle({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm4.293-10.707-5.293 5.293-2.293-2.293-1.414 1.414 3.707 3.707 6.707-6.707-1.414-1.414z" />
    </svg>
  );
}

export function IconCheck({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
    </svg>
  );
}

export function IconBolt({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M11 2 4 13h6l-1 9 9-12h-6l2-8h-3z" />
    </svg>
  );
}

export function IconPackage({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="m12 1.5-9 5v11l9 5 9-5v-11l-9-5zm0 2.24 6.75 3.75-2.75 1.53L9.25 5.27 12 3.74zM5 8.02l6 3.33v7.38l-6-3.33V8.02zm8 10.71v-7.38l6-3.33v7.38l-6 3.33z" />
    </svg>
  );
}

export function IconFile({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
    </svg>
  );
}

export function IconScale({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M11 4.07V2H9v2.07A8.006 8.006 0 0 0 4.07 9H2v2h2.07A8.006 8.006 0 0 0 9 15.93V22h2v-6.07A8.006 8.006 0 0 0 15.93 11H22V9h-2.07A8.006 8.006 0 0 0 15 4.07zm-1 9.86A6.008 6.008 0 0 1 6.07 10h7.86A6.008 6.008 0 0 1 10 13.93zM10 6.07A6.008 6.008 0 0 1 13.93 10H6.07A6.008 6.008 0 0 1 10 6.07z" />
    </svg>
  );
}

export function IconEdit({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="m18.988 2.012 3 3L19.7 7.3l-3-3 2.288-2.288zm-3.7 3.7-10 10V18.7h2.988l10-10-2.988-2.988zM4 20h16v2H4z" />
    </svg>
  );
}

export function IconSearch({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.395 1.414-1.414-4.395-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
    </svg>
  );
}

export function IconUpload({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M11 15h2V7.414l3.293 3.293 1.414-1.414L12 3.586l-5.707 5.707 1.414 1.414L11 7.414zM4 19h16v2H4z" />
    </svg>
  );
}

export function IconTime({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.42z" />
    </svg>
  );
}

export function IconTrendingUp({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
    </svg>
  );
}

export function IconDollar({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-14h-2v1.07C9.336 7.42 8 8.87 8 10.5c0 2.05 1.56 3.1 3.5 3.7 1.48.46 2.5.89 2.5 1.8 0 .83-.79 1.5-2 1.5-1.39 0-2.31-.69-2.58-1.5H7.34c.3 1.7 1.62 3.03 3.66 3.43V21h2v-1.07c1.78-.36 3-1.85 3-3.43 0-2.31-1.74-3.23-3.6-3.8-1.37-.42-2.4-.82-2.4-1.7 0-.74.67-1.5 2-1.5 1.15 0 2 .59 2.28 1.5h2.08c-.31-1.63-1.5-2.88-3.36-3.43V6z" />
    </svg>
  );
}

export function IconCog({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="m19.9 12.66.4-1.33-1.63-1-1.12.83a7.46 7.46 0 0 0-1.55-.89V9h-1.92v1.27a7.46 7.46 0 0 0-1.55.89l-1.12-.83-1.63 1 .4 1.33c-.22.48-.37.99-.44 1.52H8v1.82h1.87c.07.53.22 1.04.44 1.52l-.4 1.33 1.63 1 1.12-.83c.48.36 1 .66 1.55.89V21h1.92v-1.27c.55-.23 1.07-.53 1.55-.89l1.12.83 1.63-1-.4-1.33c.22-.48.37-.99.44-1.52H22v-1.82h-1.87c-.07-.53-.22-1.04-.44-1.52zM15 17a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
  );
}

export function IconChevronRight({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M10.296 7.704 14.592 12l-4.296 4.296 1.414 1.414L17.42 12l-5.71-5.71z" />
    </svg>
  );
}

export function IconArrowRight({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="m15.293 5.293-1.414 1.414L17.586 10H3v2h14.586l-3.707 3.293 1.414 1.414L21.414 11z" />
    </svg>
  );
}

export function IconKey({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M7 14A5 5 0 0 0 12 9a5 5 0 0 0-9.9 0A5 5 0 0 0 7 14zm0-8a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm15 3h-8.15a6.97 6.97 0 0 1-1.85 4.85L17 19v3h4v-3h2v-4h-1z" />
    </svg>
  );
}

export function IconLogOut({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="m16 13 4-4-4-4v3H9v2h7v3zM4 19h10v2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10v2H4v14z" />
    </svg>
  );
}

export function IconPlug({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M21 11.11V7a2 2 0 0 0-2-2h-4V2h-2v3h-2V2H9v3H5a2 2 0 0 0-2 2v4.11a5.952 5.952 0 0 0 5 5.83V20h2v2h4v-2h2v-3.06c2.86-.68 5-3.25 5-5.83zM5 7h14v4.11A4 4 0 0 1 15 15.1V18h-6v-2.9A4 4 0 0 1 5 11.11V7z" />
    </svg>
  );
}

export function IconFolder({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M20 5h-8.586L9.707 3.293A.997.997 0 0 0 9 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z" />
    </svg>
  );
}

export function IconEye({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  );
}

export function IconAlertCircle({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v6h2V7zm0 8h-2v2h2v-2z" />
    </svg>
  );
}

export function IconAward({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M16.938 15.5 12 18l-4.938-2.5 1.15-5.59-4.212-3.71 5.66-.49L12 1l2.34 4.71 5.66.49-4.212 3.71 1.15 5.59zM12 3.66 10.378 6.92l-3.928.34 2.923 2.57-.8 3.88L12 11.88l3.427 1.83-.8-3.88 2.923-2.57-3.928-.34L12 3.66z" />
    </svg>
  );
}

export function IconHistory({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-14h-2v7l5.25 3.15.75-1.23-4-2.42V6z" />
    </svg>
  );
}
