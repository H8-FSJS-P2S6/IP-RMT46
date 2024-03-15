import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
    const error = useRouteError();
    console.log(error)
    return (
        <>
            <div
                id="error-page"
                className="tw-h-screen tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-bg-[#1A2238]"
            >
                <h1 className="tw-text-9xl tw-font-extrabold tw-text-white tw-tracking-widest">
                    404
                </h1>
                <div className="tw-bg-[#FF6A3D] tw-px-2 tw-text-sm tw-rounded tw-rotate-12 tw-absolute">
                    Page Not Found
                </div>
                <button className="tw-mt-5">
                    <Link to="/" className="tw-relative tw-inline-block tw-text-sm tw-font-medium tw-text-[#FF6A3D] tw-group tw-active:text-orange-500 tw-focus:outline-none tw-focus:ring">
                        <span className="tw-absolute tw-inset-0 tw-transition-transform tw-translate-x-0.5 tw-translate-y-0.5 tw-bg-[#FF6A3D] tw-group-hover:tw-translate-y-0 tw-group-hover:tw-translate-x-0" />
                        <span className="tw-relative tw-block tw-px-8 tw-py-3 tw-bg-[#1A2238] tw-border tw-border-current">
                            Go Home
                        </span>
                    </Link>
                </button>
            </div>

        </>
    )
}
