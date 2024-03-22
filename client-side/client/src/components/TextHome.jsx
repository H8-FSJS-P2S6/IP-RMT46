import { Link } from "react-router-dom";


export default function TextHome() {

    return (
        <>
            <h2><strong>Welcome!</strong> / <i>مرحبًا</i> </h2>
            <p className="fs-7 text-body-tertiary" >
                Islam is a religion based on the Qor'an and Hadith. Therefore, good Islamic education comes from both. And Hadith is what comes from the prophet Muhammad. So we provide a collection of hadiths that can be used as references and reminders
            </p>
            <p style={{fontSize: '9'}}>
                <Link className="btn" to='/pub'>
                    <i><u>Enter the web »</u></i>
                </Link>
            </p>
        </>
    )
}