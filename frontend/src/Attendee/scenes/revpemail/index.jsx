import React, { useEffect, useState } from "react";
import { IpAddress, SendEmail } from "./API";
import InlineError from "./InlineError";
import Loading from "./Loading";
import { validateEmail, validateFullName, validateMessage } from "./Validation";
import { toast } from "react-toastify";
import Toast from "./Toast";
import Box from "@mui/material/Box";

const InputClass =
    "w-full py-4 placeholder:text-gray px-6 text-main border-2 mt-2 border-border rounded-md";

function RSVPEMAIL() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");
    const [fullNameError, setFullNameError] = useState();
    const [emailError, setEmailError] = useState();

    const [messageError, setMessageError] = useState();
    const [loading, setLoading] = useState(true);
    const [ipData, setIpData] = useState();

    const [buttonLoading, setButtonLoading] = useState(false);
    const [send, setSend] = useState();

    useEffect(() => {
        if (!ipData) {
            IpAddress({ setLoading, setIpData });
        }
        // *********** VALIDATION **********
        validateFullName({ fullName, setFullNameError });
        validateEmail({ email, setEmailError });

        validateMessage({ message, setMessageError });

        // ***********
        if (send) {
            toast.success(send.msg);
            setFullName("");
            setEmail("");
            setMessage("");
            setSend();
        }
    }, [fullName, email, message, send, ipData]);

    const submitHandler = (e) => {
        e.preventDefault();
        setButtonLoading(true);
        if (!fullNameError & !emailError & !messageError) {
            SendEmail({ fullName, email, message, setSend }).then(() => {
                setButtonLoading(false);
            });
        }
    };

    return (
        <>
            <Box m="1.0rem -18.5rem 3.5rem 3.5rem">
                <Toast />
                <div className="container flex-colo py-12 mx-auto min-h-screen sm:py-2 px-4 ">
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="main-box lg:w-3/4 w-full flex box-shadow rounded-lg overflow-hidden ">
                            <div className="box-1 border-main bg-blue-400 flex-colo py-6 pl-14 sm:py-32 w-full">
                                <img
                                    src="https://res.cloudinary.com/wizardxd/image/upload/v1678798022/New/grunge-paint-background_1_kizt7r.jpg"
                                    className="w-72 h-72 pl-12 object-cover"
                                    alt="logo"
                                />
                                <h1 className="my-4 text-xl pl-12">
                                    EventX-Emailer
                                </h1>
                                <p className="itaic text-sm pl-12">
                                    We are detecting Attendees Attendence <br />
                                    {/* <span className="font-bold">({ipData && ipData})</span> */}
                                </p>
                            </div>
                            <form
                                onSubmit={submitHandler}
                                className="box-2 bg-white pt-12 pb-6 sm:px-12 px-6 w-screen"
                            >
                                <h2 className="sm:text-2xl text-xl text-center mb-12 font-semibold">
                                    Administrator Emailer
                                </h2>
                                {/* fullName */}
                                <div className="my-6">
                                    <label>FullName</label>
                                    <input
                                        value={fullName}
                                        onChange={(e) =>
                                            setFullName(e.target.value)
                                        }
                                        required
                                        type="text"
                                        placeholder="Attendee Full Name"
                                        className={InputClass}
                                    />
                                    {fullNameError && (
                                        <InlineError error={fullNameError} />
                                    )}
                                </div>
                                {/* email */}
                                <div className="my-6">
                                    <label>Email</label>
                                    <input
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        type="email"
                                        placeholder="attendee@gmail.com"
                                        className={InputClass}
                                    />
                                    {emailError && (
                                        <InlineError error={emailError} />
                                    )}
                                </div>
                                {/* phone */}

                                {/* message */}
                                <div className="my-6">
                                    <label>Message</label>
                                    <textarea
                                        required
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        placeholder="Relevent Details about the Event"
                                        rows={3}
                                        className="mt-2 w-full border-2 border-border py-4 placeholder:text-gray px-6 text-main rounded-md"
                                    />
                                    {messageError && (
                                        <InlineError error={messageError} />
                                    )}
                                </div>
                                {/* submit */}
                                <button
                                    type="submit"
                                    disabled={buttonLoading && true}
                                    className="w-full border-2 border-main hover:bg-white trans bg-blue-400 mt-6 rounded-md tracking-widest py-4 font-subMain font-bold"
                                >
                                    {buttonLoading ? "Loading.." : "SUBMIT"}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </Box>
        </>
    );
}

export default RSVPEMAIL;
