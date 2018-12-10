import React from 'react';
import { Spin } from 'antd';

const Loading = () => (
  <div className="justify-content-center" style={{ minHeight: 300 }}>
    <Spin tip="Đang cập nhật dữ liệu..." />
  </div>
);

export default Loading;
