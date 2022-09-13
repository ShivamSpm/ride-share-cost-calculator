export default function FormAction({
    action="submit",
    text
}){
    return(
        <>
            <button
                type={action}
            >
                {text}
            </button>
        </>
    )
}