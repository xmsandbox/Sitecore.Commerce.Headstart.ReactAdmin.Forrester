import {HStack, Text} from "@chakra-ui/react"
import {ICreditCard} from "types/ordercloud/ICreditCard"
import {IPayment} from "types/ordercloud/IPayment"
import {priceHelper} from "utils"
import {CreditCardIcon} from "./CreditCardIcon"

interface OrderPaymentItemProps {
  payment: IPayment
}
export function OrderPayment({payment}: OrderPaymentItemProps) {
  const displayCardType = (cardType: ICreditCard["CardType"]) => {
    if (cardType === "AmericanExpress") {
      return "American Express"
    }
    return cardType
  }
  if (payment.Type === "CreditCard" && payment.xp?.CreditCard) {
    return (
      <HStack>
        <CreditCardIcon fontSize="3xl" cardType={payment?.xp.CreditCard.CardType} />
        <Text>
          {displayCardType(payment.xp.CreditCard.CardType)} ending in {payment.xp.CreditCard.PartialAccountNumber}
        </Text>
        <Text fontWeight="bold">-{priceHelper.formatPrice(payment.Amount)}</Text>
      </HStack>
    )
  } else if (payment.Type === "SpendingAccount" && payment.SpendingAccount) {
    return (
      <HStack>
        <Text>{payment.SpendingAccount?.Name}</Text>
        <Text fontWeight="bold">{priceHelper.formatPrice(payment.Amount)}</Text>
      </HStack>
    )
  } else {
    return (
      <HStack>
        <Text fontWeight="bold">{priceHelper.formatPrice(payment.Amount)}</Text>
      </HStack>
    )
  }
}
