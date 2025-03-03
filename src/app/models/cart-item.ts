export interface CartItem {
    ProductID: number;
    Name: string;
    ImageUrl: string;
    Price: number;
    Discount: number; // phần trăm giảm giá, ví dụ: 10
    quantity: number;
  }
  