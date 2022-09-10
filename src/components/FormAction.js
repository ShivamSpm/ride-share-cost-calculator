export default function FormAction({
    handleSubmit,
    action='submit',
    text
}){
    return(
        <>
            <button
                type={action}
                onSubmit={handleSubmit}
            >
                {text}
            </button>
        </>
    )
}