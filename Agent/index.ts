import express from 'express';
import bodyParser from 'body-parser';
import { uniswap } from "@goat-sdk/plugin-uniswap";
import { modespray } from "@goat-sdk/plugin-modespray";
import { pumpfun } from "@goat-sdk/plugin-pumpfun";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { opensea } from "@goat-sdk/plugin-opensea";
import { http } from "viem";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { modeTestnet } from "viem/chains";
import twilio from "twilio";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { MODE, USDC, erc20 } from "@goat-sdk/plugin-erc20";
import { kim } from "@goat-sdk/plugin-kim";
import { coingecko } from "@goat-sdk/plugin-coingecko";
import { sendETH } from "@goat-sdk/wallet-evm";
import { viem } from "@goat-sdk/wallet-viem";
import { modeGovernance } from "@goat-sdk/plugin-mode-governance";
import { allora } from "@goat-sdk/plugin-allora";


require("dotenv").config();
const app = express();
app.use(bodyParser.json()); // for parsing application/json

const account = privateKeyToAccount(process.env.KEY as `0x${string}`);

const walletClient = createWalletClient({
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: modeTestnet,
});

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


(async () => {
    const tools = await getOnChainTools({
        wallet: viem(walletClient),
        plugins: [
            sendETH(),
            erc20({ tokens: [USDC, MODE] }),
            kim(),
            modespray(),
            coingecko({ apiKey: "CG-omKTqVxpPKToZaXWYBb8bCJJ" }),
            opensea(process.env.OPENSEA_API_KEY as string),
           // pumpfun(),
           modeGovernance(),
           allora({apiKey: process.env.ALLORA_API_KEY}),
        ],
    });

    const app = express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());



    app.post("/api/send-whatsapp", async (req, res) => {
        console.log("Headers:", req.headers);
        console.log("Body:", req.body);  
        const from = req.body.From;  // The sender's phone number
        const body = req.body.Body;
        console.log("Received WhatsApp message from", from, "with body:", body);

        try {
            const result = await generateText({
                model: openai("gpt-4o-mini"),
                tools: tools,
                maxSteps: 10,
                prompt: body,
            });

            const message = await twilioClient.messages.create({
                to: `whatsapp:+918658663855`,
                from: `whatsapp:+14155238886`,
                body: result.text
            });
            res.json({ success: true, message: "WhatsApp message sent with AI response.", sid: message.sid });
        } catch (error) {
            console.error("Failed to send WhatsApp message with AI response:", error);
            res.status(500).json({ success: false, message: "Failed to send WhatsApp message." });
        }
    });

 

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})();
