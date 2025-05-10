import React, { createContext, useContext, useMemo } from 'react';
import useSignalR, { SignalRHookResult } from '../hooks/useSignalr';

// 创建带泛型的上下文
const SignalRContext = createContext<SignalRHookResult | null>(null);

// 定义提供者组件的props类型
interface SignalRProviderProps {
  children: React.ReactNode;
  hubUrl: string;
}

// 提供者组件
export const SignalRProvider = ({ children, hubUrl }: SignalRProviderProps) => {
  const signalR = useSignalR(hubUrl);
  
  // 使用useMemo防止不必要的重渲染
  const value = useMemo(() => signalR, [signalR]);

  return (
    <SignalRContext.Provider value={value}>
      {children}
    </SignalRContext.Provider>
  );
};

// 自定义hook用于获取上下文
export const useSignalRContext = (): SignalRHookResult => {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error('useSignalRContext must be used within a SignalRProvider');
  }
  return context;
};  