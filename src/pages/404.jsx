import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 px-4 py-16 text-center">
            <p className="text-[clamp(5rem,18vw,10rem)] font-black leading-none text-accent/25" aria-hidden>
                404
            </p>
            <div className="-mt-8 max-w-md space-y-3">
                <h1 className="text-2xl font-bold text-text sm:text-3xl">Page not found</h1>
                <p className="text-lg text-muted">This page doesn&apos;t exist — let&apos;s get you back to the action.</p>
            </div>
            <Link
                to="/"
                className="zog-btn-primary rounded-2xl px-10 py-3.5 text-base font-semibold shadow-glow"
            >
                Back to home
            </Link>
        </div>
    );
};

export default ErrorPage;
