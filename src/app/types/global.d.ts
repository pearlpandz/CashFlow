export {};

declare global {
  interface Number {
    toINRCurrency(): string;
  }
}