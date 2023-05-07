export interface Dataset {
  labels: string[];
  data: number[];
}

export interface ToastNotification {
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}
