export type CpuTime = {
  user: number;
  nice: number;
  sys: number;
  idle: number;
  irq: number;
};

export type Cpu = {
  model: string;
  speed: number;
  times: CpuTime;
};

export type Ram = {
  totalMemory: number;
  freeMemory: number;
};

export type SystemInfo = {
  hostname: string;
  platform: string;
  arch: string;
  cpu: Cpu[];
  totalMemory: number;
  freeMemory: number;
  uptime: number;
};
