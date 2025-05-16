import { useState, useEffect, useCallback, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

// 定义回调函数类型
type EventCallback = (...args: any[]) => void;

// 定义连接状态类型
type ConnectionStatus = 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

// 定义自定义Hook返回类型
export interface SignalRHookResult {
  connection: signalR.HubConnection | null;
  status: ConnectionStatus;
  error: Error | null;
  on: (eventName: string, callback: EventCallback) => () => void;
  send: <T extends any[]>(methodName: string, ...args: T) => Promise<void>;
  start: (characterId: string) => Promise<void>;
  stop: () => Promise<void>;
}

const useSignalR = (hubUrl: string): SignalRHookResult => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [error, setError] = useState<Error | null>(null);
  
  // 使用useRef存储事件回调，避免重复注册       
  const eventCallbacks = useRef<Map<string, EventCallback[]>>(new Map());

  // 创建连接
  const createConnection = useCallback(() => {
    if (connection) return connection;
    
    try {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl, {
          withCredentials: true // 与后端CORS配置匹配
        })
        .withAutomaticReconnect([0, 2000, 5000, 10000]) // 自定义重连策略
        .configureLogging(signalR.LogLevel.Information)
        .build();
      
      // 设置连接事件处理
      newConnection.onreconnecting((err) => {
        setStatus('reconnecting');
        setError(err || new Error('Reconnecting...'));
      });
      
      newConnection.onreconnected(() => {
        setStatus('connected');
        setError(null);
        console.log('SignalR reconnected');
        
        // 重新注册所有事件
        eventCallbacks.current.forEach((callbacks, eventName) => {
          callbacks.forEach(callback => {
            newConnection.on(eventName, callback);
          });
        });
      });
      
      newConnection.onclose((err) => {
        setStatus('disconnected');
        setError(err || new Error('Connection closed'));
        console.log('SignalR connection closed');
      });
      
      setConnection(newConnection);
      return newConnection;
    } catch (err) {
      setError(err as Error);
      console.error('Error creating SignalR connection:', err);
      throw err;
    }
  }, [hubUrl, connection]);

  // 启动连接
  const start = useCallback(async (characterId?: string) => {
    if (status === 'connected' || status === 'connecting') return;
    hubUrl = characterId && !hubUrl.includes("characterId") ? `${hubUrl}?characterId=${characterId}` : hubUrl;
    try {
      setStatus('connecting');
      const conn = createConnection();
      await conn.start();
      setStatus('connected');
      console.log('SignalR connection established');
    } catch (err) {
      setStatus('disconnected');
      setError(err as Error);
      console.error('Error starting SignalR connection:', err);
      throw err;
    }
  }, [createConnection]);

  // 停止连接
  const stop = useCallback(async () => {
    if (!connection || status === 'disconnected') return;
    
    try {
      await connection.stop();
      setStatus('disconnected');
      console.log('SignalR connection stopped');
    } catch (err) {
      setError(err as Error);
      console.error('Error stopping SignalR connection:', err);
      throw err;
    }
  }, [connection]);

  // 注册事件处理函数
  const on = useCallback((eventName: string, callback: EventCallback) => {
    if (!connection) {
      console.warn('Cannot register event handler: connection not established');
      return () => {};
    }
    
    // 存储回调
    if (!eventCallbacks.current.has(eventName)) {
      eventCallbacks.current.set(eventName, []);
    }
    eventCallbacks.current.get(eventName)?.push(callback);
    
    // 注册事件
    connection.on(eventName, callback);
    
    // 返回取消注册函数
    return () => {
      if (connection) {
        connection.off(eventName, callback);
        
        // 更新存储的回调
        const callbacks = eventCallbacks.current.get(eventName);
        if (callbacks) {
          const index = callbacks.indexOf(callback);
          if (index !== -1) {
            callbacks.splice(index, 1);
          }
          if (callbacks.length === 0) {
            eventCallbacks.current.delete(eventName);
          }
        }
      }
    };
  }, [connection]);

  // 发送消息
  const send = useCallback(async <T extends any[]>(methodName: string, ...args: T) => {
    if (!connection || status !== 'connected') {
      throw new Error('SignalR connection not established or not active');
    }
    
    try {
      await connection.invoke(methodName, ...args);
    } catch (err) {
      setError(err as Error);
      console.error(`Error sending message to ${methodName}:`, err);
      throw err;
    }
  }, [connection, status]);

  // 生命周期管理
  useEffect(() => {
    
    // 清理函数
    return () => {
      stop();
    };
  }, [start, stop]);

  return { connection, status, error, on, send, start, stop };
};

export default useSignalR;  