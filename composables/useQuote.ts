export function useQuote() {

  const calculateQuote = (
    items: any[],
    laborHours: number,
    laborCost: number,
    fixedOverheads: number,
    targetMargin: number
  ) => {
    const totalCost = items.reduce((acc, item) => acc + item.cost * item.quantity, 0);
    const totalSell = items.reduce((acc, item) => acc + item.sell * item.quantity, 0);
    const laborTotal = laborHours * laborCost;
    const grossProfit = totalSell - totalCost - laborTotal - fixedOverheads;
    const margin = totalSell > 0 ? (grossProfit / totalSell) * 100 : 0;

    let health = "Red";
    if (margin >= targetMargin) health = "Green";
    else if (margin >= targetMargin * 0.75) health = "Amber";

    const healthClass = {
      Green: "text-green-600",
      Amber: "text-yellow-500",
      Red: "text-red-600",
    }[health];

    return { grossProfit, margin, health, healthClass };
  };

  return { calculateQuote };
}
