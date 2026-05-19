import { DashboardService } from './dashboard.service';

export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  getDashboardSnapshot() {
    return this.dashboardService.getSummary();
  }
}
