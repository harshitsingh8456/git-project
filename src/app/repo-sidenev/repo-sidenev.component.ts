import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { getRepos } from 'data-type';
import { ToastrService } from 'ngx-toastr';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { filter,map } from 'rxjs/operators';
import { style } from '@angular/animations';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-repo-sidenev',
  templateUrl: './repo-sidenev.component.html',
  styleUrls: ['./repo-sidenev.component.css']
})
export class RepoSidenevComponent implements OnInit {
  openIssueNotAavail: boolean = false;
  openIssueAavail:boolean = true;
  constructor(private api : ApiService,
    private toastr: ToastrService,) { }

  getEvent: string | undefined;
  branch:boolean = false;
  nonBranch:boolean = true;

  data: any[] = [];
  keyword:any;
  owner: any;
  getEevent:any;
  arrList:any=[];
  allBranch: any[] = [];
  BranchName = []
  commitBranches:boolean=false
  closeBranch: boolean = true;
  issueRepo:boolean = false
  allIssueApi:any[] = []
  avatar:any[] = []
  allCommit:any[] = []
  repoName:any
  repoNameGet:any[] = []
  dateTime:any[] = []
  dateTimeAuthorName:any[] = []
  repoNameuser:any[]=[]
  users:Array<any>=[{
    name:this.BranchName,
  }
]
left_side:boolean=true
open:boolean = true
close:boolean = false
closeHeader: boolean = true;
giveError:any[] = []
value:any


  ngOnInit(): void {
    this.value = JSON.parse(localStorage.getItem('repo')!)
    if(this.value) {
      this.repoNameGet = this.value
    }
  }

  openBranch(val:any){
    this.issueRepo = false
    this.branch = true ;
    this.nonBranch = false;
    console.log(val)
    this.BranchName = val
    this.repoNameuser = val
    console.log(this.BranchName)
    this.api.getAllBranches(val).subscribe((response)=>{
      console.log(response)
        this.allBranch = response
        console.log(this.allBranch)


        //date and time api
        for (let date of this.allBranch) {
          console.log(date.commit.url);
          this.dateTime = date.commit.url
          console.log(this.dateTime);
        }
        this.api.getBranchDate(this.dateTime).subscribe((res)=>{
          console.log(res)
          this.dateTimeAuthorName = res
          console.log(this.dateTimeAuthorName)
        })


    })

    this.commitBranches = false
    // this.left_side = false
    // this.closeHeader = false
  }

   repo(data:getRepos){
    this.owner = data.owner;
    // if(!this.giveError){
    //   console.log('error');
    //   this.toastr.error('XYZ')
    // }
      this.api.getAllRepo(data).subscribe((result: any) => {
        this.giveError = result
        // if(result){
        //   console.log(result);
        // }
        // else if(!result){
        //   console.log(result);
        //   this.toastr.error('XYZ');
        // }
      console.log(this.avatar)
      this.avatar = result.owner.avatar_url
      let repo = result;
      console.log("repo", repo);
      var arr:any = [];
      for (let val of repo) {
        console.log(val.owner.avatar_url);
        arr.push(val.full_name);
        // console.log(typeof arr)
        // localStorage.setItem('full_name', arr);
      }
    })
    }


  selectEvent(item:any){
     this.getEevent = item;
     console.log(this.getEevent)

  }


  onChangeSearch(data: string){
    const obj = {
      owner: this.owner,
      repo: data
    }
     this.api.getAllRepo(obj).subscribe((result:any) => {
      for (let val of result) {
      if (val.full_name) {
         this.keyword = 'val.full_name';
          console.log(val.full_name);
          this.data = val.full_name;
          console.log("data autosuggest:", val.full_name);
        }
      }
    })
  }


  clearData() {
    this.data = [];
  }

  onFocused(focus:any){
    console.log(focus)
    const obj = {
      owner: this.owner,
      repo: ''
    };
    this.api.getAllRepo(obj).subscribe((result:any) => {
      // result = result.filter((ele: any)=>{
      //   ele['full_name'];
      // });
      this.data = result.map((ele: any)=> ele.full_name);
      console.log(this.data);
      // for (let val of result) {
      // if (val.full_name) {
      //    this.keyword = 'val.full_name';
      //     console.log(val.full_name);
      //     this.data = val.full_name;
      //     console.log("data autosuggest:", val.full_name);
      //   }
      // }
    })
  }

  clickedRepo(){
  console.log('function called')
  console.log(this.getEevent)
  this.arrList.push(this.getEevent);
  console.log("rrrrrrrrr",this.arrList);


  this.value = this.arrList
  localStorage.setItem('repo',JSON.stringify(this.value))
  //  this.repoName = window.localStorage.getItem('repo')
    console.log(this.repoNameGet)
    // localStorage.setItem('repo',JSON.stringify(this.repoNameGet))
   this.value = JSON.parse(localStorage.getItem('repo')!)
    if(this.value) {
      this.repoNameGet = this.value
    }
    // this.deleteRepo();

  }


  openBranchCommit(){
    this.commitBranches = true
    this.closeBranch = false
    this.issueRepo = false
    this.api.getAllCommit(this.BranchName).subscribe((response)=>{
      this.allCommit = response
      console.log(this.allCommit)
    })
  }

  openIssue(){
    // this.closeSidebar()
    this.issueRepo = true;
    this.closeBranch = false
    this.commitBranches = false
    this.api.getAllIssue(this.BranchName).subscribe((result)=>{
      console.log(result)
      // if(result == []!){
      //   console.log(result)
      //   // this.openIssueNotAavail = true;
      //   // this.openIssueAavail = false
      // }
      this.allIssueApi = result
    })

  }
  openBranchUi(){
    // this.closeSidebar()
    this.issueRepo = false;
    this.closeBranch = true
    this.commitBranches = false
  }

  active(){
  // document.getElementsByClassName("activeclass").style.backgroundColor = "lightgreen";
  }

  deleteRepo(){
    localStorage.removeItem('repo')
    window.location.reload()
  }

  openSideBar(){
    this.left_side = !this.left_side
    this.open = false
    this.close = true
  }
  closeSidebar(){
    this.left_side = !this.left_side
    this.open = true
    this.close = false

  }
}
