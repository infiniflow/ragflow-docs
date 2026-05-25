const useVConsole = () => {
  const VCONSOLE_ENABLED = process.env.NODE_ENV !== 'production';

  const initVConsole = async () => {
    if (!VCONSOLE_ENABLED) return;
    if (typeof window === 'undefined') return;

    try {
      const VConsole = (await import('vconsole')).default;
      new VConsole({
        theme: 'dark',
        defaultPlugins: ['system', 'element', 'network', 'storage'],
        maxLogNumber: 1000,
      });
      console.log('[vConsole] 已初始化');
    } catch (e) {
      console.warn('[vConsole] 初始化失败:', e);
    }
  };

  return { initVConsole };
};
export { useVConsole };
