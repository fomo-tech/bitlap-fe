declare global {
  interface Window {
    $crisp: any; // Hoặc có thể thay `any` bằng kiểu rõ ràng hơn nếu cần
    CRISP_WEBSITE_ID: string;
  }
}

export {};
