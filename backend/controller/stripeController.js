const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const { amount, customerId } = req.body;

    const customer = await stripe.customers.retrieve(customerId);
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });

    // Update the payment methods for the customer
    if (paymentMethods.data.length > 0) {
      const defaultPaymentMethodId =
        paymentMethods.data[paymentMethods.data.length - 1].id;
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: defaultPaymentMethodId,
        },
      });
    }

    // Get customer Name and Email
    const customerName = customer.name;
    const customerEmail = customer.email;

    const myPayment = await stripe.paymentIntents.create({
      amount: amount,
      customer: customerId,
      description: `Purchase by ${customerName}`,
      currency: "idr",
      metadata: {
        company: "Rabi",
      },
      receipt_email: customerEmail, // Set the customer's email for the invoice
    });

    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
      customerId: customerId,
    });
  })
);
router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
    console.log(`Your stripe API key is ${process.env.STRIPE_API_KEY}`);
  })
);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

// endpointSecret =  "whsec_18ea9b2985373a256ff0d6051364ad8482bf25d239cf98281aead39fda82a5df";
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  catchAsyncErrors(async (request, response, next) => {
    const sig = request.headers["stripe-signature"];
    let data;
    let eventType;

    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          sig,
          endpointSecret
        );
        console.log("Webhook verified");
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "customer.created") {
      // Logic to handle customer created event
      console.log("New customer created:", data);
    }

    if (eventType === "payment_intent.succeeded") {
      // Logic to handle payment intent succeeded event
      console.log("Payment intent succeeded:", data);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  })
);

module.exports = router;
