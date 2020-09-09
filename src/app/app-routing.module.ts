import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionOneComponent } from './components/section-one/section-one.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SectionTwoComponent } from './components/section-two/section-two.component';

const routes: Routes = [
  {path:'section-one',component:SectionOneComponent},
  {path:'section-two',component:SectionTwoComponent},
  {path:'',component:SectionOneComponent},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
