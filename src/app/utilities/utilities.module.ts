import { ConvertToSpacesPipe } from './convert-to-spaces-pipe';
import { StarComponent } from './star.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ConvertToSpacesPipe,
    StarComponent
  ],
  exports: [
    ConvertToSpacesPipe,
    StarComponent,
    CommonModule,
    FormsModule
  ]
})
export class UtilitiesModule { }
