import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.reducers';
import {MailTemplatesActions} from '../../actions';
import {Observable} from 'rxjs';
import {IMailTemplate} from '../../mail-templates.model';
import {getLoadMailTemplatesActionStateSelector, getMailTemplatesSelector} from '../../reducers/mail-templates.selectors';
import {ActionState} from '../../../../shared/general/general.models';
import {UserRole} from '../../../../shared/permissions/models/permission.models';

@Component({
  selector: 'app-mail-templates-page-smart',
  templateUrl: './mail-templates-page.smart.component.html',
  styleUrls: ['./mail-templates-page.component.css']
})
export class MailTemplatesPageSmartComponent implements OnInit {

  mailTemplates$: Observable<IMailTemplate[]> = this.store.pipe(select(getMailTemplatesSelector));
  loadMailTemplatesActionState$: Observable<ActionState> = this.store.pipe(select(getLoadMailTemplatesActionStateSelector));
  canDeleteAndCreateMailTemplates = false;
  userRole: UserRole;

  constructor(private store: Store<State>,
              private mailTemplatesActions: MailTemplatesActions) {
  }

  ngOnInit() {
    this.store.dispatch(this.mailTemplatesActions.loadMailTemplates());

    this.userRole = JSON.parse(localStorage.getItem('user')).userRole;
    this.canDeleteAndCreateMailTemplates = this.userRole === UserRole.DEVELOPER;
  }

  deleteMailTemplate(mailTemplate: IMailTemplate): void {
    this.store.dispatch(this.mailTemplatesActions.deleteMailTemplate(mailTemplate.id));
  }
}
