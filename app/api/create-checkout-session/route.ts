import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Robust Stripe initialization with environment variable check
const isStripeConfigured = () => {
  return process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.trim() !== '';
};

const getStripe = () => {
  if (!isStripeConfigured()) return null;
  try {
    return new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-06-30.basil",
    });
  } catch (error) {
    console.error("Failed to initialize Stripe:", error);
    return null;
  }
};

export async function POST(request: NextRequest) {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: "Payment processing is currently unavailable. Please contact support.", code: "STRIPE_NOT_CONFIGURED" },
        { status: 503 }
      );
    }
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: "Payment processing is currently unavailable. Please try again later.", code: "STRIPE_INITIALIZATION_FAILED" },
        { status: 503 }
      );
    }
    const { email, name } = await request.json();

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Conmates - Lease Analysis",
              description: "AI-powered lease document analysis and breakdown",
              images: ["https://conmates.com/logo.png"], // Use the real logo
            },
            unit_amount: 999, // $9.99 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/payment?canceled=true`,
      customer_email: email,
      metadata: {
        customer_name: name,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}