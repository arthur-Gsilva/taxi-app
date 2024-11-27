export interface DriverBot {
    nome: string;
    mensagemSistema: string;
  }
  
  export interface DriversBot {
    [key: number]: DriverBot;
  }