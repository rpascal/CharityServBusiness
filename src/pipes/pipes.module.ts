import { NgModule } from '@angular/core';
import { UserFromIdPipe } from './user-from-id/user-from-id';
import { ServiceFromIdPipe } from './service-from-id/service-from-id';
import { DateTimeFormatPipe } from './date-time-format/date-time-format';
@NgModule({
	declarations: [UserFromIdPipe,
    ServiceFromIdPipe,
    DateTimeFormatPipe],
	imports: [],
	exports: [UserFromIdPipe,
    ServiceFromIdPipe,
    DateTimeFormatPipe]
})
export class PipesModule {}
