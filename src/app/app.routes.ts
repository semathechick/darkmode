import { Routes } from '@angular/router';
import { HomepageComponent } from './shared/homepage/homepage.component';
import { BookListComponent } from './features/pages/admin/book/book-list/book-list.component';
import { AddBookComponent } from './features/pages/admin/book/add-book/add-book.component';
import { LoginComponent } from './core/login/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { CategoryListComponent } from './features/pages/admin/category/category-list/category-list.component';
import { PublisherListComponent } from './features/pages/admin/publisher/publisher-list/publisher-list.component';
import { BookUpdateComponent } from './features/pages/admin/book/book-update/book-update.component';
import { authGuard } from './core/guards/auth.guard';
import { AdminComponent } from './features/pages/admin/admin.component';
import { AddPublisherComponent } from './features/pages/admin/publisher/add-publisher/addpublisher.component';
import { publisherUpdateComponent } from './features/pages/admin/publisher/publisher-update/publisherupdate.component';
import { MemberListComponent } from './features/pages/admin/member/member-list/member-list.component';
import { ProfileComponent } from './features/pages/admin/member/profile/profile.component';
import { CategoryAddComponent } from './features/pages/admin/category/category-add/category-add.component';
import { CategoryUpdateComponent } from './features/pages/admin/category/category-update/category-update.component';
import { AddAuthorComponent } from './features/pages/admin/author/add-author/add-author.component';
import { EditAuthorComponent } from './features/pages/admin/author/edit-author/edit-author.component';
import { UpdateAuthorComponent } from './features/pages/admin/author/update-author/update-author.component';
import { UserAccountComponent } from './features/pages/user-account/user-account.component';
import { UserEditComponent } from './features/pages/user-account/user-edit/user-edit.component';
import { BookListForMembersComponent } from './features/pages/book/book-list-for-members/book-list-for-members.component';
import { BookListForAuthorsComponent } from './features/pages/book/book-list-for-authors/book-list-for-authors.component';
import { BookListForIsbnComponent } from './features/pages/book/book-list-for-isbn/book-list-for-isbn.component';
import { LoanComponent } from './features/pages/loanTransaction/loan/loan.component';
import { LoanHistoryComponent } from './features/pages/user-account/loan-history/loan-history.component';
import { AboutUsComponent } from './features/pages/about-us/about-us.component';
import { PenaltyComponent } from './penalty/penalty.component';


export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'members',component:MemberListComponent},
  {path:'homepage/:id/profile',component:ProfileComponent,canActivate:[authGuard]},
   {path:"books/category/:categoryId",component:BookListForMembersComponent},
  {path:"getBooksForMembers",component:BookListForMembersComponent},
  {path:"books/author/:authorId",component:BookListForAuthorsComponent},
  {path:"getBooksForIsbnFilter",component:BookListForIsbnComponent},
  {path:"penalty",component:PenaltyComponent},
  {path:'loanTransaction',component:LoanComponent},
  {
    path:'aboutus' ,component:AboutUsComponent
  },

  
  
  {path:"homepage/userprofile/:id",component:UserAccountComponent,
  children:[
    {path:"edituser",component:UserEditComponent},
    {path:'loanHistory',component:LoanHistoryComponent}
  ]
},

  
  {path:'admin',component:AdminComponent,canActivate:[authGuard],data:{requiredRoles:['Admin']},
  children:
  [
    ////BOOK//BOOK////BOOK//////BOOK////BOOK//////
    {path:'addBook',component:AddBookComponent},
    {path:'getBooks', component: BookListComponent},
    {path:'getBooks/book/:id/book-update',component:BookUpdateComponent},
    {path:'getBooks/book-update',component:BookUpdateComponent},
    
    /////CATEGORY/////CATEGORY////CATEGORY/////CATEGORY//CATEGORY/////CATEGORY///
    {path:'addcategory', component:CategoryAddComponent},
    {path:'editcategory', component:CategoryListComponent},
    {path:'editcategory/update/:id', component:CategoryUpdateComponent},
    
   


    ///PUBLISHER///PUBLISHER///PUBLISHER//PUBLISHER/////PUBLISHER////PUBLISHER/////PUBLISHER//
    {path:'getPublisher',component:PublisherListComponent},
    {path:'addPublisher',component:AddPublisherComponent},
    {path:'getPublisher/publisher/:id/publisherupdate',component:publisherUpdateComponent},

    ///MEMBER///MEMBER///MEMBER//MEMBER/////MEMBER////MEMBER/////MEMBER//
    {path:'getMembers',component:MemberListComponent},


    //Author
    {path:'addauthor', component:AddAuthorComponent},
    {path:'editauthor', component:EditAuthorComponent},
    {path:'editauthor/update/:id', component:UpdateAuthorComponent},

  ],
  

  }
];
