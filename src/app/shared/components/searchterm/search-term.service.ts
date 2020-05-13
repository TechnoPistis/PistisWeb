import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class SearchTermService {

 constructor(private http:HttpClient) { }
readonly baseuri=new CommonService().getUri();

addSearchTerm (model){
return this.http.post(this.baseuri+'searchTerm/save',model);

}
getAll(page,size){
  return this.http.get(this.baseuri + 'searchTerm/getAll?page=' + page + '&size=' + size);
  // + '&search=' + name
}
getbById(id)
{
  return this.http.get(this.baseuri+'searchTerm/getbById?id='+id);

}
update(model){
return this.http.post(this.baseuri+'searchTerm/update',model)
}
}
