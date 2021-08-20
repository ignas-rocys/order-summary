const Input = (props) => {
    return (
        <input onChange={(e) => props.onChange(e)} type={props.type} placeholder={props.placeholder} />
    )
}

export default Input;