import styles from './container.module.css';

export function Container(children: string) {
  return `
    <div class="${styles.container}">${children}</div>
  `;
}