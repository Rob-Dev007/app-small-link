const Button = ({key, type, children, handleClick, disabled, className=''})=>{

    return(
            <button key={key} className={className} onClick={ handleClick } disabled={disabled} type={type}>{children}</button>
    )

}

export default Button;