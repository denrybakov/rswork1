import styles from './Button.module.css'


export const Button = ({ text, className, onClick }) => {
  const zero = text === '0' ? styles.zero : ''
  return (
    <button
      className={`${styles.btn + ' ' + className + ' ' + zero}`}
      onClick={(e) => onClick(e, e.target.textContent)}
    >
      {text}
    </button>
  )
}
