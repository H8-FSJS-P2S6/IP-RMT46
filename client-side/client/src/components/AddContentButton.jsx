import { Link } from "react-router-dom"

export default function AddContentButton() {

    return (
        <>
            <div className="container">
                <Link to={'/addContent'}><button className="btn btn-primary">
                    Add Content
                </button></Link>
            </div>
        </>
    )
}