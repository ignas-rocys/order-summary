const Button = ({name, className}) => {
    return (
        <button className={`button ${className}`}>{name}</button>
    )
}

export default Button;