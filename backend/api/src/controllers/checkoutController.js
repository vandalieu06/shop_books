const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const checkoutService = require("../services/checkoutService");

const webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    if (endpointSecret && sig) {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } else {
      event = req.body;
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    try {
      await checkoutService.createOrderFromSession(session);
      console.log("Order created from webhook:", session.id);
    } catch (error) {
      console.error("Error creating order from webhook:", error.message);
      return res.status(500).json({ status: "error", message: error.message });
    }
  }

  res.json({ received: true });
};

const createSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Items are required",
      });
    }

    for (const item of items) {
      if (!item.book || !item.quantity || item.quantity < 1) {
        return res.status(400).json({
          status: "error",
          message: "Each item must have book and quantity",
        });
      }
    }

    const result = await checkoutService.createCheckoutSession(items, userId);
    res.json({ status: "success", data: result });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const verifySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await checkoutService.retrieveSession(sessionId);

    if (!session) {
      return res.status(404).json({
        status: "error",
        message: "Session not found",
      });
    }

    res.json({
      status: "success",
      data: {
        paymentStatus: session.payment_status,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = { createSession, verifySession, webhook };
