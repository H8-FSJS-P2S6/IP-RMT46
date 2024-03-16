
// eslint-disable-next-line react/prop-types
export default function Button ({name, onClick, buttonClass, buttonType}){
    return(
        <button
            onClick={onClick}
            className={buttonClass}
            type={buttonType}
        >
            {name}
        </button>
    )
}