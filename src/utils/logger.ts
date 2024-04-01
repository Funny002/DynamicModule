type LoggerMessageType = 'log' | 'info' | 'warn' | 'error';

export class LoggerMessage {
  constructor(name?: string) {
    this.name = name || 'Logger Message';
  }

  sendMessage(type: LoggerMessageType, ...messages: any[]) {
    console[type]('[%s] %s', this.name, ...messages);
  }

  log(...messages: any[]) {
    this.sendMessage('log', ...messages);
  }

  info(...messages: any[]) {
    this.sendMessage('info', ...messages);
  }

  warn(...messages: any[]) {
    this.sendMessage('warn', ...messages);
  }

  error(...messages: any[]) {
    this.sendMessage('error', ...messages);
  }
}
