import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActiveStatus, IUser } from '../../models/users.model';
import { ActionState } from '../../../../shared/general/general.models';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Input() users: IUser[];
  @Input() actionState: ActionState;
  @Input() errorCode: number;

  @Output() onUpdateActiveStatus = new EventEmitter<IUser>();

  constructor() {
  }

  ngOnInit() {
  }

  userIsBlocked(user: IUser): boolean {
    return user.activateStatus === ActiveStatus.BLOCKED;
  }

  userIsBanned(user: IUser): boolean {
    return user.activateStatus === ActiveStatus.BANNED;
  }

  userIsWaitingApprove(user: IUser): boolean {
    return user.activateStatus === ActiveStatus.WAITING_APPROVE;
  }

  userIsActive(user: IUser): boolean {
    return user.activateStatus === ActiveStatus.ACTIVE;
  }

  activateUser(user){
    this.updateStatusTo(user.id, ActiveStatus.ACTIVE);
  }

  banUser(user) {
    this.updateStatusTo(user.id, ActiveStatus.BANNED);
  }

  blockUser(user) {
    this.updateStatusTo(user.id, ActiveStatus.BLOCKED);
  }

  private updateStatusTo(userId: number, newStatus: ActiveStatus) {
    this.onUpdateActiveStatus.emit(<IUser>{
      id: userId,
      activateStatus: newStatus
    });
  }
}
