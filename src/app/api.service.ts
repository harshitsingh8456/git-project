import { getRepos } from './../../data-type';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }



  // getAllRepo(data:getRepos): Observable<any> {
  //   console.log(data.owner);

  //   this.http.get(`https://api.github.com/users/${data.owner}/repos`)
  // //  {observe:'response'}).subscribe(async (result)=>{
  // //    let repo = result.body
  // //    console.log("repo", repo)
  // //   // for await(let val of repo){
  // //   //   console.log(val)
  // //   // }
  // //  })
  // }


  getAllRepo(data:getRepos): Observable<any>{
    return this.http.get(`https://api.github.com/users/${data.owner}/repos`)
      // .map((result: Response) => result.json())
      // .catch(this.getError);
  }
  getAllBranches(ele:any): Observable<any>{
    return this.http.get(`https://api.github.com/repos/${ele}/branches`)
    // return this.http.get(`https://api.github.com/repos/${ele}/branches`)
      // .map((result: Response) => result.json())
      // .catch(this.getError);
  }
  getAllIssue(ele:any): Observable<any>{
    return this.http.get(`https://api.github.com/repos/${ele}/issues`)
      // .map((result: Response) => result.json())
      // .catch(this.getError);
  }
  getAllCommit(arr:any): Observable<any>{
    return this.http.get(`https://api.github.com/repos/${arr}/commits`)
      // .map((result: Response) => result.json())
      // .catch(this.getError);
  }
  getBranchDate(url:any): Observable<any>{
    return this.http.get(`${url}`)
      // .map((result: Response) => result.json())
      // .catch(this.getError);
  }
}
