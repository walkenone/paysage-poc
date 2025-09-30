module 0x1::payment_router {

    use sui::object::{Self, UID};
    use sui::tx_context::TxContext;

    struct PaymentReceipt has store {
        id: UID,
        merchant: address,
        amount: u64,
        currency: vector<u8>,
        payer: address,
    }

    public fun create_payment(
        merchant: address,
        amount: u64,
        currency: vector<u8>,
        ctx: &mut TxContext
    ): PaymentReceipt {
        let payer = tx_context::sender(ctx);
        PaymentReceipt {
            id: object::new(ctx),
            merchant,
            amount,
            currency,
            payer,
        }
    }
}