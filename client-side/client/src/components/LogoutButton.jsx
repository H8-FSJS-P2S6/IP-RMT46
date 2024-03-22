import { useNavigate } from "react-router"


export default function LogoutButton(){
    const navigate = useNavigate()

    return(
        <>
        <div className="d-flex align-items-end flex-column mr-5">
            <button className="btn btn-danger" onClick={(e) => {
                localStorage.removeItem('access_token')

                navigate('/')
            }}>
               ❌ Logout 
            </button>
        </div>
        </>
    )
}