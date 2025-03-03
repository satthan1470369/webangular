export interface Product {
    ProductID: number;
    Name: string;
    TypeId: number;
    Importday: string;   // Nếu bạn muốn parse sang Date, bạn có thể để string rồi parse sau
    ImageUrl: string;
    // Các trường mới
    Price: number;     // Giá gốc
    Discount: number;  // Giảm giá (%)
    HotTrend: boolean; // Sản phẩm hot trend
  }
  