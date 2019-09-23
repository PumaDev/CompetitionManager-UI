import {Routes} from '@angular/router';
import {MailTemplatesPageSmartComponent} from './components/mail-templates-page/mail-templates-page.smart.component';
import {AdminAndDeveloperCanActivate} from '../../auth/can-activate/admin-and-developer.can-activate';

export const mailTemplatesRoutes: Routes = [{
  path: 'mail-templates',
  component: MailTemplatesPageSmartComponent,
  canActivate: [AdminAndDeveloperCanActivate]
}];
