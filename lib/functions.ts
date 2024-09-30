export function formatPrice(price: number): string {
  let pounds = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return pounds
    .format(price)
    .replace(/^(\D+)/, "$1 ")
    .replace(/\s+/, " ");
}

export function formatDate(data: Date): string {
  return data.toLocaleDateString("en-gb", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function generateInvoiceId(length: number): string {
  const letters = "QWERTYUIOPASDFGHJKLZXCVBNM";
  let id = "";
  for (let i = 0; i < length; i++) {
    if (i < 2) {
      id += letters[Math.floor(Math.random() * letters.length)];
    } else {
      id += Math.floor(Math.random() * 10);
    }
  }
  return id;
}

export function formatCurrentDate(date: string): Date {
  return new Date(Date.parse(date));
}

export function setNewDate(currentDate: Date, days: number): Date {
  return new Date(currentDate.setDate(currentDate.getDate() + Number(days)));
}

export function calculateTotal(arr: Array<any>): number {
  return arr.reduce((acc, item) => acc + item.total, 0);
}
