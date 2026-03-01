const express = require('express');
const app = express()
const port = 3000;

const apiKey = '9e78171cd593813aed6f081b';

app.use(express.json());

app.get('/convert/:from/:to/:amount', async (req, res) => {
    const { from, to, amount } = req.params;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === "success") {
            res.json({
                from: from.toUpperCase(),
                to: to.toUpperCase(),
                amount: amount,
                convertedValue: data.conversion_result,
                rate: data.conversion_rate,
                lastUpdate: data.time_last_update_utc
            });
        } else {
            res.status(400).json({ 
                error: "API Error", 
                message: data['error-type'] || "Something went wrong" 
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/convert/:from/:to/', async (req, res) => {
    const { from, to } = req.params;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === "success") {
            res.json({
                from: from.toUpperCase(),
                to: to.toUpperCase(),
                convertedValue: data.conversion_result,
                rate: data.conversion_rate,
                lastUpdate: data.time_last_update_utc
            });
        } else {
            res.status(400).json({ 
                error: "API Error", 
                message: data['error-type'] || "Something went wrong" 
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log("Сервер. запущен")
})