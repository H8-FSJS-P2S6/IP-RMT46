import { useState } from "react";
import TopUp from "../component/topUp";
import showToast from "../utils/toast";
import axios from '../utils/axios'

function TopUpPage() {
    const [coinsToPurchase, setCoinsToPurchase] = useState(0);

    const handleTopUp = async (event) => {
        event.preventDefault();
        try {
            const response = await axios({
                url: "/generate-midtrans-token",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                data: { coinsToPurchase },
            });
            const { token } = response.data;
            window.snap.pay(token, {
                onSuccess: async () => {
                    const response = await axios({
                        url: "/top-up",
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`
                        },
                        data: { coinsToPurchase },
                    })
                    showToast(response.data.message)
                },
            })
        } catch (error) {
            showToast(error.response?.data?.message || error.message, "error");
        }
    };

    const handleRadioChange = (event) => {
        setCoinsToPurchase(parseInt(event.target.value));
    };

    return (
        <>
            <TopUp handleRadioChange={handleRadioChange} coinsToPurchase={handleTopUp} />
        </>
    )
}

export default TopUpPage;
