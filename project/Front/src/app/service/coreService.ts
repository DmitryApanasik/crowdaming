export abstract class CoreService {
  private static  portBack = 'http://localhost:8080/';
  protected webService: string;
  constructor() {
    this.webService = CoreService.portBack;
  }
}
