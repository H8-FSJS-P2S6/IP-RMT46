import { LoginSocialFacebook } from "reactjs-social-login"
import { FacebookLoginButton } from "react-social-login-buttons"
import { FacebookSignIn } from "social-login-react"

export default function FacebookLogin() {

    return (
        <>
            <LoginSocialFacebook
                appId="1124056648948355"
                onResolve={(response) => {
                    console.log(response)
                }}
                onReject={(error) => {
                    console.log(error)
                }}
            >
                <FacebookLoginButton />
            </LoginSocialFacebook>
        </>
    )
}