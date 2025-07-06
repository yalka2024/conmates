import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(request: NextRequest) {
  try {
    const { tier, analysisId } = await request.json();

    // Define pricing based on tier
    let priceId: string;
    let amount: number;
    let description: string;

    if (tier === "premium") {
      priceId = "price_premium_analysis"; // You'll need to create this in Stripe
      amount = 1999; // $19.99 in cents
      description = "Premium Lease Analysis - Comprehensive legal review with risk assessment";
    } else {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Premium Lease Analysis",
              description: description,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/summary?session_id={CHECKOUT_SESSION_ID}&analysis_id=${analysisId}`,
      cancel_url: `${request.headers.get("origin")}/upload`,
      metadata: {
        tier: tier,
        analysisId: analysisId,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}