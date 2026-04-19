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
    return res.status(400).json({ message: "Error en el pagament" });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout processing webhook")), 25000)
      );
      await Promise.race([checkoutService.createOrderFromSession(session), timeoutPromise]);
      console.log("Order created from webhook:", session.id);
    } catch (error) {
      console.error("Error creating order from webhook:", error.message);
      return res.status(500).json({ message: "Error en el pagament" });
    }
  }

  res.json({ received: true });
};

const createSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Els items són obligatoris" });
    }

    for (const item of items) {
      if (!item.book || !item.quantity || item.quantity < 1) {
        return res.status(400).json({ message: "Cada item ha de tenir book i quantity" });
      }
    }

    const result = await checkoutService.createCheckoutSession(items, userId);
    res.json({ status: "success", data: result });
  } catch (error) {
    const message = error.message || "Error en el pagament";
    if (message.includes("no trobat") || message.includes("Stock insuficient") || message.includes("preu invàlid")) {
      return res.status(400).json({ message });
    }
    res.status(400).json({ message: "Error en el pagament" });
  }
};

const verifySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await checkoutService.retrieveSession(sessionId);

    if (!session) {
      return res.status(400).json({ message: "Sessió no trobada" });
    }

    if (session.payment_status === "unpaid" || session.status === "expired") {
      return res.status(400).json({ message: "La sessió ha expirat" });
    }

    if (session.status === "open" && !session.payment_intent) {
      return res.status(400).json({ message: "Pagament cancel·lat" });
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
    if (error.type === "StripeAuthenticationError" || error.code === "resource_missing") {
      return res.status(400).json({ message: "Error en el pagament" });
    }
    res.status(400).json({ message: "Error en el pagament" });
  }
};

module.exports = { createSession, verifySession, webhook };
