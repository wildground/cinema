1. 初始化某场电影的数据，调用接口 /initalData
2. 简便期间，seat 表示某场电影的票
3. 因mongodb不支持事物，并发检测借用写入订单时检查座位id的unique。