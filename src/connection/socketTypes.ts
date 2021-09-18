export interface Options {
    host: string;
    token: string;
  }

export interface Socket {
  on: (event: string, callback: (data: any) => void) => void;
  off: (event: string, callback: (data: any) => void) => void;
  emit: (event: string, ...args: any) => boolean;
}
