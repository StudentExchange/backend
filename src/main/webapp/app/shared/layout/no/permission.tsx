import React from 'react';
import { Alert } from 'antd';

const Permission = () => (
  <Alert style={{ marginTop: 50, marginBottom: 70 }} message="Bạn không được phép xem tin này" type="error" showIcon />
);

export default Permission;
