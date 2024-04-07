const CustomerData = [
  {
    customer_id: "ICICI",
    customer_name: "ICICI Financial Services",
    ica: "ICA-1",
    is_benchmarks_enabled: true,
    sow_start_date: "2023-01-01",
    sow_end_date: "2024-12-31",
    customer_client_mapping: ["ICICI_Lombard", "ICICI_Prudential"],
    customer_billing_details: [
      {
        metrics_type: "RSA",
        metrics_fee: 5.0,
      },
      {
        metrics_type: "RSB",
        metrics_fee: 10.0,
      },
    ],
  },
  {
    customer_id: "HDFC",
    customer_name: "HDFC Financial Services",
    ica: "ICA-2",
    is_benchmarks_enabled: true,
    sow_start_date: "2024-01-01",
    sow_end_date: "2025-12-31",
    customer_client_mapping: ["HDFC_Ergo", "HDFC_Assets"],
    customer_billing_details: [
      {
        metrics_type: "RSA",
        metrics_fee: 15.0,
      },
      {
        metrics_type: "RSB",
        metrics_fee: 30.0,
      },
    ],
  },
];

export default CustomerData;
