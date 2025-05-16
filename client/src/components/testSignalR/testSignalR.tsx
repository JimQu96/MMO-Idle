import React, { useEffect } from 'react';
import { useSignalRContext } from '../../context/signalRContext';

const TestSignalR: React.FC = () => {
  const { connection, on, send, start } = useSignalRContext();

  useEffect(() => {
    start("0196d7dd-d664-7253-becb-7db0f2732498");
    // 注册消息接收事件
    const unsubscribe = on('ReceiveMessage', (user, message) => {
      console.log('Received message from', user, ':', message);
    });

    // 组件卸载时取消注册
    return () => {
      unsubscribe();
    };
  }, [on]);

  const handleSendMessage = async () => {
    if (connection) {
      try {
        await send('StartAction',
        {
          actionType : "1",
          hasMaxCount: true,
          maxCount: 58,
          shouldClearQueue: true
        });
        console.log('Message sent successfully');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <h1>Test SignalR Component</h1>
      <button onClick={handleSendMessage}>Start action</button>
    </div>
  );
};

export default TestSignalR;