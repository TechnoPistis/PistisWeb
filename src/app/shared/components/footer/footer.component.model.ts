import { DomSanitizer } from '@angular/platform-browser';
import { Menu } from '../front-end/menus/menu';
import { CommonService } from '../../services/common.service';

export class FooterComponentModel {
    ipAddress: any;
    searchValue: string;
    Url: string;
    productId: any=0;
    constructor(private sanitizer: DomSanitizer) {
      this.ipAddress=""
      this.searchValue=""
      this.Url=""
      this.productId=0
    }
    public clone(): FooterComponentModel {
        let clonedModel: FooterComponentModel = new FooterComponentModel(this.sanitizer);
        clonedModel.ipAddress=""
        clonedModel.searchValue=""
        clonedModel.Url=""
        clonedModel.productId=""
        return clonedModel
    }
}