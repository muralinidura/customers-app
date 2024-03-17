const CustomerData = [
  {
    customer_id: "1",
    customer_name: "Customer 1",
    ica: "ICA-1",
    is_benchmarks_enabled: true,
    sow_start_date: "2023-01-01",
    sow_end_date: "2024-12-31",
    customer_client_mapping: ["Customer 1 Client1", "Customer 1 Client2"],
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
    customer_id: "2",
    customer_name: "Customer 2",
    ica: "ICA-2",
    is_benchmarks_enabled: true,
    sow_start_date: "2024-01-01",
    sow_end_date: "2025-12-31",
    customer_client_mapping: ["Customer 2 Client1", "Customer 2 Client2"],
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
