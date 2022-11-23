import { getProviders, signIn, getCsrfToken } from "next-auth/react"
import Link from "next/link";
import styles from '../styles/signin.module.css'


const bgcolor = {
    background:"rgba(248, 248, 248, 0.9)",
}

export default function SignIn({ csrfToken, providers }) {
    return (
        <div className={styles.content}>
            <div className='col-md-8 col-lg-6 col-xxl-4 px-5 mx-auto' style={bgcolor}>
                <h1 className="text-center mt-5">
                    WELLCOME BACK
                </h1>
                <h5 className="text-center">Wellcome back! Please enter your details</h5>
                <form className="d-flex flex-column justify-content-center mt-5 mx-auto" method="post" action="/api/auth/callback/credentials">
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <label className="mb-2">
                        E-mail
                    </label>
                    <input className={styles.inputbox} name="username" type="text" placeholder="Enter your email" />
                    <label className="mb-2 mt-4">
                        Password
                    </label>
                    <input className={styles.inputbox} name="password" type="password" placeholder="**********" />
                    <button className={styles.signin} type="submit">Sign in</button>
                </form>
                {Object.values(providers).map((provider) => {
                    if (provider.name === "Credentials") {
                        return null;
                    }
                    return (
                        <div key={provider.name}>
                            <button className={styles.providers} onClick={() => signIn(provider.id)}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    );  
                })}
                <p className="mt-2 text-center mb-5">Don’t have an account? <Link href="/register">Sign up fo free!
                </Link></p>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: {
            csrfToken: await getCsrfToken(context),
            providers
        },
    }
}