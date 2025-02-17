const express = require("express");
const twilio = require("twilio");
const dotenv = require("dotenv");
const {sendWhatsAppMessage} = require("../config/twilio.js");
const router = express.Router();
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const verify_service_id_thr_whatsapp=process.env.TWILIO_VERIFY_SERVICE_SID;


// API to send OTP via WhatsApp (fallback to SMS)
router.post("/otp/send", async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone || typeof phone !== "string" || phone.length < 10) {
            return res.status(400).json({ error: "Invalid phone number" });
        }

        let verification;
        try {
            verification = await client.verify.v2
                .services(verify_service_id_thr_whatsapp)
                .verificationChecks.create({
                    channel: 'whatsapp',
                    to: phone,
                });

            // console.log("OTP Sent via WhatsApp:", verification.status);
            return res.json({ message: "OTP sent via WhatsApp", verification: verification });

        } catch (whatsappError) {
            console.error("WhatsApp OTP failed, falling back to SMS:", whatsappError.message);
            
            verification = await client.verify.v2
                .services(verify_service_id_thr_whatsapp)
                .verifications.create({
                    channel: 'sms',
                    to: phone,
                });
            // console.log("OTP Sent via SMS:", verification.status);
            return res.json({ message: "OTP sent via SMS", verification: verification });
        }
    } catch (error) {
        console.error("OTP sending failed:", error.message);
        return res.status(500).json({ error: error.message });
    }
});


// API to verify OTP
router.post("/otp/verify", async (req, res) => {
    try {
        const { phone, code } = req.body;

        if (!phone || phone.length < 10) {
            return res.status(400).json({ error: "Invalid phone number" });
        }
        if (!code || code.length < 6) {
            return res.status(400).json({ error: "Invalid OTP code" });
        }

        const verificationCheck = await client.verify.v2
            .services(verify_service_id_thr_whatsapp)
            .verificationChecks.create({
                to: `whatsapp:${phone}`,
                code,
            });
        
        // console.log("Verification Status:", verificationCheck.status);

        if (verificationCheck.status === "approved") {
            return res.json({ 
                message: "OTP Verified Successfully",
                verificationCheck
            });
        } else {
            return res.status(400).json({ 
                message: "Invalid OTP", 
                error: true ,
                verificationCheck
            });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error.message);
        return res.status(500).json({ error: error.message });
    }
});

// API to send a WhatsApp message
router.post("/send-whatsapp-message", async (req, res) => {
    try {
        const { bookingData } = req.body;

        if ( !bookingData) {
            return res.status(400).json({ error: "Booking data are required." });
        }

        const response = await sendWhatsAppMessage(bookingData);
        res.status(200).json({ message: "WhatsApp message sent successfully.",response });
    } catch (error) {
        console.error("Error sending WhatsApp message:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;

