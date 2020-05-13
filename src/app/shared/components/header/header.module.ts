import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule ,
    NgMaterialMultilevelMenuModule,
    TranslateModule,
    FormsModule,
    AutocompleteLibModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    
  ],
  exports:[HeaderComponent]
})
export class HeaderModule { }
