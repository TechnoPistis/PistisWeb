import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialListComponent } from './testimonial-list/testimonial-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
@NgModule({
  declarations: [TestimonialListComponent],
  imports: [
    CommonModule,FormsModule,
    TranslateModule,
    RouterModule.forChild([
      {path:'', component: TestimonialListComponent}
    ])
  ]
})
export class TestimonialModule { }
