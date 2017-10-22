import { NgModule } from '@angular/core';
import { UserFromIdPipe } from './user-from-id/user-from-id';
@NgModule({
	declarations: [UserFromIdPipe],
	imports: [],
	exports: [UserFromIdPipe]
})
export class PipesModule {}
