import { CompetitionCategoriesService } from './categories.service';
import { CompetitionsService } from './competitions.service';
import { SportsmenService } from './sportsmen.service';
import { SectionsService } from './sections.service';
import {AttachmentsService} from './attachments.service';

export {
  CompetitionCategoriesService,
  CompetitionsService,
  SportsmenService,
  SectionsService,
  AttachmentsService
};

export const competitionServices = [
  CompetitionCategoriesService,
  CompetitionsService,
  SportsmenService,
  SectionsService,
  AttachmentsService
];
