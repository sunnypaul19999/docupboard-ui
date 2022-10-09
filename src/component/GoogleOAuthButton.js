import googlelogo from '../assets/image/googlelogo.webp';

export function getGoogleOAuthURL() {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    const googleOAuthQueryParams = {
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URI,
        response_type: 'code',
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ].join(' ')
    };

    const googleOAuthEncodedQueryParams = new URLSearchParams(googleOAuthQueryParams);

    return oauth2Endpoint.concat('?').concat(googleOAuthEncodedQueryParams.toString());
}

async function googleOAuth(event) {
    event.preventDefault();
    event.stopPropagation();

    const googleOAuthURL = getGoogleOAuthURL();
    console.log({ googleOAuthURL });

    const googleOAuthLinkElement = document.createElement('a');
    googleOAuthLinkElement.href = googleOAuthURL;
    //calling gooogle's oauth api
    //google will redirect to server's endpoint that we configured
    //in 'google oauth credential' website and set the same in .env file
    //http://localhost:7000/api/v1/user/login/oauth/2/google/redirect
    googleOAuthLinkElement.click();
}


export default function GoogleOAuthButton() {

    return (
        <div className="google-login" onClick={googleOAuth}>
            <a className="btn btn-outline-dark" role="button" style={{ textTransform: "none" }}>
                <img width="20px" style={{ marginBottom: "3px", marginRight: "5px", borderRadius: "1px" }} alt="Google sign-in"
                    src={googlelogo} />
                Login with Google
            </a>
        </div>
    );
}