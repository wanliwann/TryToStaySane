import './Button.css'

function Button({ children, variant = 'primary', onClick, style }) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  )
}

export default Button
