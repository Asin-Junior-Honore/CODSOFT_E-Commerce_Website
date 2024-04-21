import https from "https";
import dotenv from "dotenv";

dotenv.config();

const payStack = {
  acceptPayment: async (req, res) => {
    try {
      const email = req.body.email;
      const amount = req.body.amount;
      const params = JSON.stringify({
        email: email,
        amount: amount * 100,
      });
      const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction/initialize",
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PUBLIC_KEY}`,
          "Content-Type": "application/json",
        },
      };
      // client request to paystack API
      const clientReq = https
        .request(options, (apiRes) => {
          let data = "";
          apiRes.on("data", (chunk) => {
            data += chunk;
          });
          apiRes.on("end", () => {
            // console.log(JSON.parse(data));
            return res.status(200).json(JSON.parse(data));
          });
        })
        .on("error", (error) => {
          console.error(error);
          res.status(500).json({ error: "An error occurred" });
        });
      clientReq.write(params);
      clientReq.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  },
};

const initializePayment = payStack;
export default initializePayment;
